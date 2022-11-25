from datetime import datetime
import pymysql.cursors 
import pymssql, json, time, socket

#0 = DESENVOLVIMENTO
#1 = PRODUCAO


AMBIENTE = 0



ip_address = socket.gethostbyname(socket.gethostname())
if AMBIENTE == 0:        
    connection = pymysql.connect(host=ip_address,
                             user='userP',
                             password='urubu100',
                             database='PARDALIS',
                             cursorclass=pymysql.cursors.DictCursor)
    cursor = connection.cursor()
else:
    connectionSQL = pymssql.connect(host='svr-pardalis.database.windows.net',
                             user='pardalis',
                             password='#urubu100',
                             database='pardalis',
                             as_dict=True)
    cursor = connectionSQL.cursor()

def rename_hash(hash: str):
    return hash.replace(':', '').upper()

def string_index(text: str, string: str):
    try:
        text.index(string)
        return True
    except:
        return False

def run_sql_command(command: str, fetchall: bool = False ):
    cursor.execute(command)
    if string_index(command.lower(), "select") and fetchall:
        return cursor.fetchall()
    elif string_index(command.lower(), "select") and not fetchall:

        return cursor.fetchone()
    elif string_index(command.lower(), "insert") or string_index(command.lower(), "update"):
        if AMBIENTE == 0:
            connection.commit()
        else:
            connectionSQL.commit()

    return False

def get_computer_hash(hash: str):
    if AMBIENTE == 0:
        command = f"SELECT * FROM Maquina WHERE hashMaquina = '{rename_hash(hash)}';" 
    else:
        command = f"SELECT * FROM [pardalis].[dbo].[Maquina] where (hashMaquina = '{rename_hash(hash)}');"
    return run_sql_command(command, False)

def get_computer_with_hash(hash: str):
    if AMBIENTE == 0:
        command = f"SELECT count(*) as qtdServidores FROM Maquina WHERE hashMaquina = '{rename_hash(hash)}' LIMIT 1 ;" 
        
    else:
        command = f"SELECT TOP 1 count(*) as qtdServidores FROM [pardalis].[dbo].[Maquina] where hashMaquina = '{rename_hash(hash)}' ;"
        
    return run_sql_command(command, False)

def get_componentes_computer(hash: str):
    if AMBIENTE == 0:
        command = f"SELECT * FROM Componente JOIN Maquina on idMaquina = fkMaquina where hashMaquina = '{rename_hash(hash)}';" 
    else:
        command = f"SELECT * FROM [pardalis].[dbo].[Componente] JOIN [pardalis].[dbo].[Maquina] ON Maquina.idMaquina = fkMaquina where (hashMaquina = '{rename_hash(hash)}');"

    return run_sql_command(command, True)

def get_component(nome_componente: str, fk_empresa: int, fk_maquina: int):
    nome_componente = nome_componente.lower()
    if AMBIENTE == 0:
        command = f"SELECT idComponente FROM Componente where nomeComponente = '{nome_componente}' and fkEmpresa = {fk_empresa} and fkMaquina = {fk_maquina};" 
    else:
        command = f"SELECT idComponente FROM [pardalis].[dbo].[Componente] where nomeComponente = '{nome_componente}' and fkEmpresa = {fk_empresa} and fkMaquina = {fk_maquina};"

    return run_sql_command(command)


def get_metricas(component_name : str = None):

    if AMBIENTE == 0:
        command = f"SELECT * FROM Metrica" 

        if component_name != None: 

            command += f" WHERE nomeMetrica LIKE '%{component_name}%'" 

    else:
        command = f"SELECT * FROM [pardalis].[dbo].[Metrica]"
        if component_name != None:
            command += f" WHERE (nomeMetrica LIKE '%{component_name}%')"

    return run_sql_command(command, True)

def get_metricas_connection(id_component: str, fk_maquina: int, fk_empresa: int, is_estatico : int = 0):

    if AMBIENTE == 0:
        command = f"SELECT * FROM Metrica JOIN Componente_has_Metrica on idMetrica = fkMetrica WHERE fkComponente = {id_component} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa} AND Metrica.isEstatico = {is_estatico};"

    else:
        command = f"SELECT * FROM [pardalis].[dbo].[Metrica] JOIN [pardalis].[dbo].[Componente_has_Metrica] on idMetrica = fkMetrica WHERE fkComponente = {id_component} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa} AND Metrica.isEstatico = {is_estatico};"

    return run_sql_command(command, True)

def get_leituras(fk_component : int, fk_maquina : int, fk_empresa : int, fk_metrica : int, limit: int = 1):
    if AMBIENTE == 0:
        command = f"SELECT * FROM Leitura WHERE fkComponente = {fk_component} AND fkMetrica = {fk_metrica} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa} LIMIT {limit};"  
    else:
        
        command = f"SELECT TOP {limit} * FROM [pardalis].[dbo].[Leitura] WHERE fkComponente = {fk_component} AND Leitura.fkMetrica = {fk_metrica} AND Leitura.fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa} ;"

    return run_sql_command(command, True)

def update_static_metrica(value: float, fk_component: int, fk_maquina: int, fk_empresa: int, fk_metrica: int):
    data = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if AMBIENTE == 0:
        command = f"UPDATE Leitura SET valorLeitura = {value}, dataColeta = '{data}' WHERE fkComponente = {fk_component} AND fkMetrica = {fk_metrica} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa};"
    else:
        command = f"UPDATE [pardalis].[dbo].[Leitura] SET valorLeitura = {value}, dataColeta = '{data}' WHERE fkComponente = {fk_component} AND fkMetrica = {fk_metrica} AND fkMaquina = {fk_maquina} AND fkEmpresa = {fk_empresa};"

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
            else:
                    command = f"INSERT INTO [pardalis].[dbo].[Componente] (nomeComponente, isComponenteValido, fkMaquina, fkEmpresa, descricao) VALUES ('{key}', {component_state},  {fk_maquina}, {fk_empresa}, '{descricao}');"
            
        else:

            if AMBIENTE == 0:
                command = f"INSERT INTO Componente (nomeComponente, isComponenteValido, fkMaquina, fkEmpresa) VALUES ('{key}', {component_state},  {fk_maquina}, {fk_empresa});" 
            else:
                command = f"INSERT INTO [pardalis].[dbo].[Componente] (nomeComponente, isComponenteValido, fkMaquina, fkEmpresa) VALUES ('{key}', {component_state},  {fk_maquina}, {fk_empresa});"

        run_sql_command(command)
        create_component_connection_with_metrica(key, fk_maquina, fk_empresa)

def create_component_connection_with_metrica(component_name : str, fk_maquina: int, fk_empresa: int):
    metricas = get_metricas(component_name.lower())
    for metrica in metricas:

        component = get_component( component_name, fk_empresa, fk_maquina)["idComponente"]

        if AMBIENTE == 0:
            command = f"INSERT INTO Componente_has_Metrica values ({component}, {metrica['idMetrica']}, {fk_maquina}, {fk_empresa});"
        else:
            command = f"INSERT INTO [pardalis].[dbo].[Componente_has_Metrica] values ({component}, {metrica['idMetrica']}, {fk_maquina}, {fk_empresa});"

        run_sql_command(command)
            

def append_information(fk_component: int, fk_maquina: int, fk_empresa: int, fk_metrica: int, value: float):
    data = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if AMBIENTE == 0:
        command = f"INSERT INTO Leitura VALUES (null, {fk_component}, {fk_metrica}, {fk_maquina}, {fk_empresa}, '{data}', {value});"
    else:
        command = f"INSERT INTO [pardalis].[dbo].[Leitura] (fkComponente, fkMetrica, fkMaquina, fkEmpresa, dataColeta, valorLeitura) VALUES ({fk_component}, {fk_metrica}, {fk_maquina}, {fk_empresa}, '{data}', {value});"

    run_sql_command(command)

def clear_components(hashMaquina : str):
    computer = get_computer_hash(hashMaquina)
    components = get_componentes_computer(hashMaquina)
    for component in components:
        if AMBIENTE == 0:
            command = "DELETE FROM Componente WHERE idComponente = {0} AND fkMaquina = {1} AND fkEmpresa = {2};".format(component["idComponente"], computer["idMaquina"], computer["fkEmpresa"]) 

        else:
            command = "DELETE FROM [pardalis].[dbo].[Componente] WHERE idComponente = {0} AND fkMaquina = {1} AND fkEmpresa = {2};".format(component["idComponente"], computer["idMaquina"], computer["fkEmpresa"])
        run_sql_command(command)

def change_component_state(nome_componente: str, hash_maquina : str, state: int):
    try:
        if AMBIENTE == 0:
            command = f"UPDATE Componente SET isComponenteValido = {state} WHERE nomeComponente = '{nome_componente}' AND fkMaquina = {get_computer_hash(hash_maquina)['idMaquina']};" 
        else:
            command = f"UPDATE [pardalis].[dbo].[Componente] SET [isComponenteValido] = {state} WHERE nomeComponente = '{nome_componente}' AND fkMaquina = {get_computer_hash(hash_maquina)['idMaquina']};"
        run_sql_command(command)
        print("Componente atualizado com sucesso!")
        time.sleep(3)
    except Exception as e:
        print("Erro ao atualizar componente: ", e)

def SO_isNull(hash_maquina : str):
    if AMBIENTE == 0:
            result = run_sql_command("SELECT sistemaOperacional FROM Maquina WHERE hashMaquina = '{0}';".format(rename_hash(hash_maquina)))
    else:
        result = run_sql_command("SELECT [sistemaOperacional] FROM [pardalis].[dbo].[Maquina] WHERE hashMaquina = '{0}';".format(rename_hash(hash_maquina)))
    return result['sistemaOperacional'] == ""

def appendSO(hash_maquina : str, so: str):
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if AMBIENTE == 0:
            command = f"UPDATE Maquina SET sistemaOperacional = '{so}', dataCriacao = '{date}' WHERE hashMaquina = '{rename_hash(hash_maquina)}';"
    else:
        command = f"UPDATE [pardalis].[dbo].[Maquina] SET [sistemaOperacional] = '{so}', dataCriacao = '{date}' WHERE hashMaquina = '{rename_hash(hash_maquina)}';"
    run_sql_command(command)


