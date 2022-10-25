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

def get_computer_with_hash(hash: str):
    command = f"SELECT count(*) as qtdServidores FROM Maquina WHERE hashMaquina = '{hash}' LIMIT 1;"
    return run_sql_command(command, False)

def get_componentes_computer(hash: str):
    command = f"SELECT * FROM Componente JOIN Maquina on idMaquina = fkMaquina where hashMaquina = '{hash}';"
    return run_sql_command(command, True)

def get_metricas(id_component: str, fk_maquina: int):
    command = f"SELECT * FROM Metrica JOIN Componente_has_Metrica on idMetrica = fkMetrica WHERE fkComponente = {id_component} AND fkMaquina = {fk_maquina};"
    return run_sql_command(command, True)