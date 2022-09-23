from datetime import datetime
import pymysql.cursors

connection = pymysql.connect(host='localhost',
                             user='pateta',
                             password='teste@123',
                             database='PARDALIS')

cursor = connection.cursor()

static_metrica = {
    "cpu": {
        "cpu_Frequencia_Maxima": 1,
        "cpu_Frequencia_Minima": 2,
        "cpu_Arquitetura": 3,
        "cpu_BitsArquitetura": 4,
    },
    "ram": {
        "ram_Total": 5,
    },
    "disk": {
        "disco_Total": 6,
    }
}

dynamic_metrica = {
    "cpu": {
        "cpu_Utilizacao": 1,
        "cpu_Frequencia_Atual": 2,
    },
    "ram": {
        "ram_Usada": 3,
    },
    "disk": {
        "disco_Usado": 4,
    }
}

# Roda um comando do MySQL
def run_sql_command(sql_command : str):
    try:
        cursor.execute(sql_command)
        return cursor.fetchone()
    except Exception as e:
        print("Erro ao executar comando SQL")
        print("Comando: ", sql_command)
        print("Erro: ", e)

# Verifica se a hash já existe no banco de dados
def verify_if_hash_exists_in_database(hash : str):
    result = run_sql_command(f"SELECT * FROM Maquina WHERE hash = '{hash}'") # Verificar o query cost

    if len(result) == 0: return False
    else: return result

def insert_computer_info(pc_info : dict):
    insert_cpu_info(pc_info["cpu"])

# Recebe um parâmetro do tipo dicionario e insere no banco de dados
def insert_cpu_info(cpu_info : dict):
    command = ""
    run_sql_command(command)

def insert_memory_info(memory_info : dict):
    command = ""
    run_sql_command(command)

def insert_disk_info(disk_info : dict):
    command = ""
    run_sql_command(command)

# Atualiza informações básicas da máquina
def update_machine(fkMaquina : int, fkEmpresa : int, sistemaOperacional : str):
    command_to_check_info = ""
    result = run_sql_command(command_to_check_info)
    if result["dataCriacao"] == None:
        dataCriacao = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        command = f"UPDATE maquina SET dataCriacao = {dataCriacao} AND sistemaOperacional = {sistemaOperacional} ",
        f"WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa}"
        run_sql_command(command)
        return True
    else:
        return False
   
# Fazer com que o script do NodeJs crie automaticamente os componentes
# Fazer para que crie também a sua conexão com as métricas

# Pega as informações dos componentes que deseja monitorar
def get_components(fkMaquina : int, fkEmpresa : int):
    command = f"SELECT * FROM Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} AND isComponenteValido = 1"
    return run_sql_command(command)

def get_static_metricas_component(fkComponente : int):
    command = f"SELECT fkMetrica FROM Componente_has_Metrica WHERE fkComponente = {fkComponente} and isEstatico = 1"
    return run_sql_command(command)

def get_dynamic_metricas_component(fkComponente : int):
    command = f"SELECT fkMetrica FROM Componente_has_Metrica WHERE fkComponente = {fkComponente} and isEstatico = 0"
    return run_sql_command(command)

def insert_static_metrica(name : str, fkComponente : int, fkMaquina : int, fkEmpresa: int, valorLeitura : int):
    metricas = get_static_metricas_component(fkComponente)
    for metrica in metricas:
        metrica = metrica["fkMetrica"]
        
        for componente in static_metrica[name]:
            if metrica == static_metrica[name][componente]:
                insert_metrica_component(fkComponente, metrica, fkMaquina, fkEmpresa, valorLeitura)

def insert_dynamic_metrica(name : str, fkComponente : int, fkMaquina : int, fkEmpresa: int, valorLeitura : int):
    metricas = get_dynamic_metricas_component(fkComponente)
    for metrica in metricas:
        metrica = metrica["fkMetrica"]
        
        for componente in static_metrica[name]:
            if metrica == static_metrica[name][componente]:
                insert_metrica_component(fkComponente, metrica, fkMaquina, fkEmpresa, valorLeitura)

def insert_metrica_component(fkComponente : int, fkMetrica : int, fkMaquina : int, fkEmpresa : int, valorLeitura : int):
    dataColeta = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    command = f"INSERT INTO Leitura (fkMetrica, fkComponente, fkMaquina, fkEmpresa, dataColeta, valorLeitura) VALUES ({fkMetrica}, {fkComponente}, {fkMaquina}, {fkEmpresa}, {dataColeta}, {valorLeitura})"
    run_sql_command(command)