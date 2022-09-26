from datetime import datetime
from distutils.log import error
import pymysql.cursors

connection = pymysql.connect(host='localhost',
                             user='aluno',
                             password='sptech',
                             database='PARDALIS')

cursor = connection.cursor()

static_metrica = {
    "cpu": {
        "cpu_Frequencia_Maxima": 2,
        "cpu_Frequencia_Minima": 4
    },
    "ram": {
        "ram_Total": 5
    },
    "disco": {
        "disco_Total": 7
    }
}

dynamic_metrica = {
    "cpu": {
        "cpu_Utilizacao": 1,
        "cpu_Frequencia_Atual": 3,
    },
    "ram": {
        "ram_Usada": 6,
    },
    "disco": {
        "disco_Usado": 8,
    }
}

def string_index(text : str, string : str):
    try:
        text.index(string)
        return True
    except:
        return False

# Roda um comando do MySQL
def run_sql_command(sql_command : str):
    try:
        cursor.execute(sql_command)
        #print(sql_command)
        if string_index(sql_command.lower(), "select"):
            return cursor.fetchall()
        elif string_index(sql_command.lower(), "insert") or string_index(sql_command.lower(), "update"):
            connection.commit()
    except Exception as e:
        print("Erro ao executar comando SQL")
        print("Comando: ", sql_command)
        print("Erro: ", e)

# Verifica se a hash já existe no banco de dados
def verify_if_hash_exists_in_database(hash : str):
    result = run_sql_command(f"SELECT * FROM Maquina WHERE hashMaquina = '{hash}' LIMIT 1;") # Verificar o query cost

    if len(result) == 0: return False
    else: return result
    
# Atualiza as informaões dos componentes
def insert_component_info(component_info : dict, nomeComponent : str, fkMaquina : int,
                          fkEmpresa: int):
    components = get_components(fkMaquina, fkEmpresa)
    for component in components:
        if (component[1] == nomeComponent) and (component[3] == None):
            if nomeComponent == 'cpu':
                cpu_text = "{"
                #cpu_descricao = {"Núcleo(s) por soquete": None,
                #                 "Nome do modelo": None,
                #                 "Arquitetura": None,
                #                 "Thread(s) per núcleo": None}
                for data in component_info["cpu_type"]:

                    if data["type"] == "Núcleo(s) por soquete":
                        data["type"] = "Núcleo por soquete"
                    elif data["type"] == "Thread(s) per núcleo":
                        data["type"] = "Thread per núcleo"

                    cpu_text += f'"{data["type"]}": "{data["value"]}", '
                cpu_text = cpu_text.rstrip(cpu_text[-1])
                cpu_text = cpu_text.rstrip(cpu_text[-1])   
                cpu_text += "}"

                command = f"UPDATE Componente SET descricao = '{cpu_text}' WHERE nomeComponente = '{nomeComponent}' AND fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa};"
                run_sql_command(command)

# Atualiza informações básicas da máquina
def update_machine(fkMaquina : int, fkEmpresa : int, sistemaOperacional : str):
    command_to_check_info = f"SELECT dataCriacao FROM Maquina WHERE idMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa}"
    result = run_sql_command(command_to_check_info)

    if result[0][0] == None:
        dataCriacao = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        command = f'UPDATE Maquina SET dataCriacao = "{dataCriacao}", sistemaOperacional = "{sistemaOperacional}" WHERE idMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa}'
        run_sql_command(command)
        return True
    else:
        return False
   
# Fazer com que o script do NodeJs crie automaticamente os componentes
# Fazer para que crie também a sua conexão com as métricas

# Pega as informações dos componentes que deseja monitorar
def get_components(fkMaquina : int, fkEmpresa : int):
    command = f"SELECT * FROM Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} AND isComponenteValido = 1 LIMIT 3;"
    return run_sql_command(command)

def get_metricas_component(fkComponente : int, isEstatico : int):
    command = f"SELECT idMetrica FROM Componente_has_Metrica JOIN Metrica ON Componente_has_Metrica.fkComponente = {fkComponente} AND Metrica.isEstatico = {isEstatico}"
    return run_sql_command(command)

def insert_metrica(name : str, fkComponente : int, fkMaquina : int, fkEmpresa: int, data : int, type = 0):
    if type == 0:
        metrica_escolhida = static_metrica
    else: 
        metrica_escolhida = dynamic_metrica
    for metrica in metrica_escolhida[name]:
        idMetrica = metrica_escolhida[name][metrica]

        insert_metrica_component(fkComponente, idMetrica, fkMaquina, fkEmpresa, data[name][metrica])
        print(f"Metrica: {metrica} Adicionado")


def insert_metrica_component(fkComponente : int, fkMetrica : int, fkMaquina : int, fkEmpresa : int, valorLeitura : int):
    dataColeta = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    command = f"INSERT INTO Leitura VALUES (null, {fkComponente}, {fkMetrica}, {fkMaquina}, {fkEmpresa}, '{dataColeta}', {valorLeitura})"
    run_sql_command(command)

def create_components(fkMaquina : int, fkEmpresa : int):
    get_component_command = f"SELECT nomeComponente from Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} LIMIT 3"
    components = run_sql_command(get_component_command)
    print("Componentes encontrados: ", components)
    list_of_components = ["cpu", "ram", "disco"]

    if components != None:
        for component in components:
            list_of_components.remove(component[0])
    
    for i in range(len(list_of_components)):
        print(f"Componente {list_of_components[i]} sendo criado")
        descricao_json = {}
        insert_command = f'INSERT INTO Componente VALUES (null, "{list_of_components[i]}", 1, "{descricao_json}", {fkMaquina}, {fkEmpresa});'
        run_sql_command(insert_command)
        print("Componente Adicionado")

        get_component_command = f"SELECT nomeComponente from Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} LIMIT 3"

    components = run_sql_command(f"SELECT idComponente, nomeComponente from Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} LIMIT 3")
    for component in components:
        for metrica in static_metrica[component[1]]:
            fkMetrica = static_metrica[component[1]][metrica]
            conexao_metricas = run_sql_command(f"SELECT * FROM Componente_has_Metrica WHERE fkComponente = {component[0]} AND fkMetrica = {fkMetrica} AND fkMaquina = {fkMaquina} and fkEmpresa = {fkEmpresa}")
            if (len(conexao_metricas) == 0):
                print(f"Componente {component[1]}, Metrica {metrica} Criado")

                run_sql_command(f"INSERT INTO Componente_has_Metrica VALUES ({component[0]}, {fkMetrica}, {fkMaquina}, {fkEmpresa})")
            else:
                print(f"Componente {component[1]}, Metrica {metrica} Já existe")
