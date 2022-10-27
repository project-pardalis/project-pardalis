from datetime import datetime
import pymysql.cursors

connection = pymysql.connect(host='localhost',
                             user='aluno',
                             password='sptech',
                             database='PARDALIS',
                             cursorclass=pymysql.cursors.DictCursor)

cursor = connection.cursor()

def run_sql_command(command: str, fetchall: bool = False):
    cursor.execute(command)
    if command.lower().index("select") != -1 and fetchall:
        return cursor.fetchall()
    elif command.lower().index("select") != -1 and not fetchall:
        return cursor.fetchone()
    elif command.lower().index("insert") != -1 or command.lower().index("update") != -1:
        connection.commit()
    return True

def get_computer_hash(hash: str):
    command = f"SELECT * FROM Maquina WHERE hashMaquina = '{hash.replace(':', '').upper()}';"
    return run_sql_command(command, False)

def get_computer_with_hash(hash: str):
    command = f"SELECT count(*) as qtdServidores FROM Maquina WHERE hashMaquina = '{hash.replace(':', '').upper()}' LIMIT 1;"
    return run_sql_command(command, False)

def get_componentes_computer(hash: str):
    command = f"SELECT * FROM Componente JOIN Maquina on idMaquina = fkMaquina where hashMaquina = '{hash.replace(':', '').upper()}';"
    return run_sql_command(command, True)

def get_metricas():
    command = f"SELECT * FROM Metrica;"
    return run_sql_command(command, True)

def get_metricas_connection(id_component: str, fk_maquina: int, fk_empresa: int):
    command = f"SELECT * FROM Metrica JOIN Componente_has_Metrica on idMetrica = fkMetrica WHERE fkComponente = {id_component} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa};"
    return run_sql_command(command, True)

def create_components(fk_maquina: int, fk_empresa: int, components: dict):
    for key in components:
        component_state = components[key]
        command = f"INSERT INTO Componente (nomeComponente, isComponenteValido fkMaquina, fkEmpresa) VALUES ('{key}', {component_state},  {fk_maquina}, {fk_empresa});"
        run_sql_command(command)
        create_component_connection_with_metrica(key, fk_maquina, fk_empresa)

def create_component_connection_with_metrica(component_name : str, fk_maquina: int, fk_empresa: int):
    metricas = get_metricas()
    for metrica in metricas:
        if metrica.index(component_name) != -1:
            command = (f"INSERT INTO Componente_has_Metrica SELECT idComponente, {metrica['idMetrica']}, {fk_maquina}, {fk_empresa}" +
            f"FROM Componente WHERE nomeComponente = '{component_name}' AND Componente.fkMaquina = {fk_maquina} AND Componente.fkEmpresa = {fk_empresa};")
            run_sql_command(command)

def append_information(fk_component: int, fk_maquina: int, fk_empresa: int, fk_metrica: int, value: float):
    data = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    command = f"INSERT INTO Leitura VALUES (null, {fk_component}, {fk_metrica}, {fk_maquina}, {fk_empresa}, {data}, {value});"
    run_sql_command(command)