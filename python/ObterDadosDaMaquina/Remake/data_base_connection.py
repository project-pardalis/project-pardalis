from datetime import datetime
import pymysql.cursors, json, pyodbc

#0 = DESENVOLVIMENTO
#1 = PRODUCAO

AMBIENTE = 0

connection = pymysql.connect(host='localhost',
                             user='aluno',
                             password='sptech',
                             database='PARDALIS',
                             cursorclass=pymysql.cursors.DictCursor)

connServer = pyodbc.connect('DRIVER='+'{ODBC Driver 17 for SQL Server}'+
    ';SERVER=tcp:'+'svr-pardalis.database.windows.net'+
    ';PORT=1433'+
    ';DATABASE='+'pardalis'+
    ';UID='+'Pardalis'+
    ';PWD='+'{#urubu100}') 

if AMBIENTE == 0:        
    cursor = connection.cursor()
elif AMBIENTE == 1:
    cursor = connServer.cursor()

def rename_hash(hash: str):
    return hash.replace(':', '').upper()

def string_index(text: str, string: str):
    try:
        text.index(string)
        return True
    except:
        return False

def run_sql_command(command: str, fetchall: bool = False):
    cursor.execute(command)
    if string_index(command.lower(), "select") and fetchall:
        return cursor.fetchall()
    elif string_index(command.lower(), "select") and not fetchall:
        return cursor.fetchone()
    elif string_index(command.lower(), "insert") or string_index(command.lower(), "update"):
        if AMBIENTE == 0:
            connection.commit()
        elif AMBIENTE == 1:
            connServer.commit()

    return False

def get_computer_hash(hash: str):
    if AMBIENTE == 0:
        command = f"SELECT * FROM Maquina WHERE hashMaquina = '{rename_hash(hash)}';" 
    elif AMBIENTE == 1:
        command = f"SELECT * FROM [PARDALIS].[dbo].[Maquina] where (hashMaquina = '{rename_hash(hash)}');"
    return run_sql_command(command, False)

def get_computer_with_hash(hash: str):
    if AMBIENTE == 0:
        command = f"SELECT count(*) as qtdServidores FROM Maquina WHERE hashMaquina = '{rename_hash(hash)}' LIMIT 1;" 
    elif AMBIENTE == 1:
        command = f"SELECT count(*) as qtdServidores FROM [PARDALIS].[dbo].[Maquina] where (hashMaquina = '{rename_hash(hash)}' LIMIT 1);"

    return run_sql_command(command, False)

def get_componentes_computer(hash: str):
    if AMBIENTE == 0:
        command = f"SELECT * FROM Componente JOIN Maquina on idMaquina = fkMaquina where hashMaquina = '{rename_hash(hash)}';" 
    elif AMBIENTE == 1:
        command = f"SELECT * FROM [PARDALIS].[dbo].[Componente] JOIN Maquina ON Maquina.idMaquina = fkMaquina where (hashMaquina = '{rename_hash(hash)}');"

    return run_sql_command(command, True)

def get_metricas(component_name : str = None):

    if AMBIENTE == 0:
        command = f"SELECT * FROM Metrica" 

        if component_name != None: 

            command += f" WHERE nomeMetrica LIKE '%{component_name}%'" 

    elif AMBIENTE == 1:
        command = f"SELECT * FROM [PARDALIS].[dbo].[Metrica]"
        if component_name != None:
            command += f" WHERE (nomeMetrica LIKE '%{component_name}%')"

    return run_sql_command(command, True)

def get_metricas_connection(id_component: str, fk_maquina: int, fk_empresa: int, is_estatico : int = 0):

    if AMBIENTE == 0:
        command = f"SELECT * FROM Metrica JOIN Componente_has_Metrica on idMetrica = fkMetrica WHERE fkComponente = {id_component} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa} AND Metrica.isEstatico = {is_estatico};"

    elif AMBIENTE == 1:
        command = f"SELECT * FROM [PARDALIS].[dbo].[Metrica] JOIN Componente_has_Metrica on idMetrica = fkMetrica WHERE Leitura.fkComponente = {id_component} AND Leitura.fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa} AND Metrica.isEstatico = {is_estatico};"

    return run_sql_command(command, True)

def get_leituras(fk_component : int, fk_maquina : int, fk_empresa : int, fk_metrica : int, limit: int = 1):
    if AMBIENTE == 0:
        command = f"SELECT * FROM Metrica JOIN Componente_has_Metrica on idMetrica = fkMetrica WHERE fkComponente = {id_component} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa} AND Metrica.isEstatico = {is_estatico};" 
    if AMBIENTE == 1:
        command = f"SELECT * FROM [PARDALIS].[dbo].[Leitura] WHERE fkComponente = {fk_component} AND Leitura.fkMetrica = {fk_metrica} AND Leitura.fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa} LIMIT {limit};"
    return run_sql_command(command, True)

def update_static_metrica(value: float, fk_component: int, fk_maquina: int, fk_empresa: int, fk_metrica: int):
    data = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if AMBIENTE == 0:
        command = f"UPDATE Leitura SET valorLeitura = {value}, dataColeta = '{data}' WHERE fkComponente = {fk_component} AND fkMetrica = {fk_metrica} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa};"
    if AMBIENTE == 1:
        command = f"UPDATE [Pardalis].[dbo].[Leitura] SET valorLeitura = {value}, dataColeta = '{data}' WHERE fkComponente = {fk_component} AND fkMetrica = {fk_metrica} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa};"

    run_sql_command(command)

def recreate_cpu_dist(descricao: list):
    new_description = {}
    for desc in descricao:
        new_description[desc['type']] = desc['value']
    return json.dumps(new_description)

def create_components(fk_maquina: int, fk_empresa: int, components: dict, descricao: list = None):
    for key in components:
        component_state = components[key]
        if (key == "cpu"):
            descricao = recreate_cpu_dist(descricao)
            if AMBIENTE == 0:
                    command = f"INSERT INTO Componente (nomeComponente, isComponenteValido, fkMaquina, fkEmpresa, descricao) VALUES ('{key}', {component_state},  {fk_maquina}, {fk_empresa}, '{descricao}');" 
            if AMBIENTE == 1:
                    command = f"INSERT INTO [Pardalis].[dbo].[Componente] (nomeComponente, isComponenteValido, fkMaquina, fkEmpresa, descricao) VALUES ('{key}', {component_state},  {fk_maquina}, {fk_empresa}, '{descricao}');"
            
        else:

            if AMBIENTE == 0:
                command = f"INSERT INTO Componente (nomeComponente, isComponenteValido, fkMaquina, fkEmpresa) VALUES ('{key}', {component_state},  {fk_maquina}, {fk_empresa});" 
            if AMBIENTE == 1:
                command = f"INSERT INTO [Pardalis].[dbo].[Componente] (nomeComponente, isComponenteValido, fkMaquina, fkEmpresa) VALUES ('{key}', {component_state},  {fk_maquina}, {fk_empresa});"

        run_sql_command(command)
        create_component_connection_with_metrica(key, fk_maquina, fk_empresa)

def create_component_connection_with_metrica(component_name : str, fk_maquina: int, fk_empresa: int):
    metricas = get_metricas(component_name.lower())
    for metrica in metricas:

        if AMBIENTE == 0:
            command = (f"INSERT INTO Componente_has_Metrica SELECT idComponente, {metrica['idMetrica']}, {fk_maquina}, {fk_empresa}" + 
            f" FROM Componente WHERE nomeComponente = '{component_name}' AND Componente.fkMaquina = {fk_maquina} AND Componente.fkEmpresa = {fk_empresa};") 

        if AMBIENTE == 1:
            command = (f"INSERT INTO [Pardalis].[dbo].[Componente_has_Metrica] SELECT idComponente, {metrica['idMetrica']}, {fk_maquina}, {fk_empresa}" +
            f" FROM [Pardalis].[dbo].[Componente] WHERE nomeComponente = '{component_name}' AND Componente.fkMaquina = {fk_maquina} AND Componente.fkEmpresa = {fk_empresa};")
        
        run_sql_command(command)
            

def append_information(fk_component: int, fk_maquina: int, fk_empresa: int, fk_metrica: int, value: float):
    data = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    command = f"INSERT INTO Leitura VALUES (null, {fk_component}, {fk_metrica}, {fk_maquina}, {fk_empresa}, '{data}', {value});"
    run_sql_command(command)

def clear_components(hashMaquina : str):
    computer = get_computer_hash(hashMaquina)
    components = get_componentes_computer(hashMaquina)
    for component in components:
        command = "DELETE FROM [Pardalis].[dbo].[Componente] WHERE idComponente = {0} AND fkMaquina = {1} AND fkEmpresa = {2};".format(component["idComponente"], computer["idMaquina"], computer["fkEmpresa"])
        run_sql_command(command)

def change_component_state(nome_componente: str, hash_maquina : str, state: int):
    try:
        command = f"UPDATE [Pardalis].[dbo].[Componente] SET [isComponenteValido] = {state} WHERE nomeComponente = '{nome_componente}' AND fkMaquina = {get_computer_hash(hash_maquina)['idMaquina']};"
        run_sql_command(command)
        print("Componente atualizado com sucesso!")
    except Exception as e:
        print("Erro ao atualizar componente: ", e)