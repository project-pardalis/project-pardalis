from datetime import datetime
import pymysql.cursors

connection = pymysql.connect(host='localhost',
                             user='aluno',
                             password='sptech',
                             database='PARDALIS')

cursor = connection.cursor()

static_metrica = {
}

dynamic_metrica = {
}


def get_metricas():
    command = f"select * from Metrica;"
    metricas = run_sql_command(command)

    for i in range(len(metricas)):
        metrica = metricas[i]
        name_metrica = metrica[1]

        if name_metrica[0:3] == "ram":
            componente_name = "ram"
        elif name_metrica[0:3] == "cpu":
            componente_name = "cpu"
        elif name_metrica[0:3] == "dis":
            componente_name = "disco"

        if metrica[3] == 0:
            metrica_escolhida = dynamic_metrica
        else:
            metrica_escolhida = static_metrica

        if not (componente_name in metrica_escolhida):
            metrica_escolhida[componente_name] = {}

        metrica_escolhida[componente_name][name_metrica] = metrica[0]


def string_index(text: str, string: str):
    try:
        text.index(string)
        return True
    except:
        return False

# Roda um comando do MySQL


def run_sql_command(sql_command: str):
    try:
        cursor.execute(sql_command)
        # print(sql_command)
        if string_index(sql_command.lower(), "select"):
            return cursor.fetchall()
        elif string_index(sql_command.lower(), "insert") or string_index(sql_command.lower(), "update"):
            connection.commit()
    except Exception as e:
        print("Erro ao executar comando SQL")
        print("Comando: ", sql_command)
        print("Erro: ", e)

# Verifica se a hash já existe no banco de dados


def verify_if_hash_exists_in_database(hash: str):
    # Verificar o query cost
    result = run_sql_command(
        f"SELECT * FROM Maquina WHERE hashMaquina = '{hash}' LIMIT 1;")

    if len(result) == 0:
        return False
    else:
        return result

# Atualiza as informaões dos componentes


def insert_component_info(component_info: dict, nomeComponent: str, fkMaquina: int,
                          fkEmpresa: int):
    components = get_components(fkMaquina, fkEmpresa)
    for component in components:
        if (component[1] == nomeComponent) and (component[3] == None):
            if nomeComponent == 'cpu':
                cpu_text = "{"
                # cpu_descricao = {"Núcleo(s) por soquete": None,
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


def update_machine(fkMaquina: int, fkEmpresa: int, sistemaOperacional: str):
    dataCriacao = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    command = f'UPDATE Maquina SET dataCriacao = "{dataCriacao}", sistemaOperacional = "{sistemaOperacional}" WHERE idMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa}'
    run_sql_command(command)
    return True

# Pega as informações dos componentes que deseja monitorar


def get_components(fkMaquina: int, fkEmpresa: int):
    command = f"SELECT * FROM Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} AND isComponenteValido = 1 LIMIT 3;"
    return run_sql_command(command)

# Seleciona qual tipo de métrica vai utilizar


def insert_metrica(name_component: str, fkComponente: int, fkMaquina: int, fkEmpresa: int, data: int, type=0, static=False):
    if type == 0:
        metrica_escolhida = static_metrica
    else:
        metrica_escolhida = dynamic_metrica

    for componente in metrica_escolhida:
        for metrica in metrica_escolhida[componente]:

            idMetrica = metrica_escolhida[componente][metrica]

            if metrica in data[name_component]:
                value = data[name_component][metrica]
                if type == 0 and static == True:
                    insert_metrica_component(
                        fkComponente, idMetrica, fkMaquina, fkEmpresa, value)
                    print(f"Metrica {metrica} Estatica Adicionada/Atualizada")
                else:
                    insert_metrica_component(
                        fkComponente, idMetrica, fkMaquina, fkEmpresa, value, 1)
                    print(f"Metrica {metrica} Adicionada")
            else:
                break

# Insere as métricas na tabela Leitura


def insert_metrica_component(fkComponente: int, fkMetrica: int, fkMaquina: int, fkEmpresa: int, valorLeitura: int, type=0):
    dataColeta = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    if (type == 0):
        result = run_sql_command(
            f"SELECT idLeitura FROM Leitura WHERE fkComponente = {fkComponente} AND fkMetrica = {fkMetrica} AND fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} LIMIT 1;")
        print(result)
        if (len(result) > 0):
            command = f"INSERT INTO Leitura VALUES ({result[0][0]}, {fkComponente}, {fkMetrica}, {fkMaquina}, {fkEmpresa}, '{dataColeta}', {valorLeitura}) ON DUPLICATE KEY UPDATE valorLeitura = {valorLeitura}, dataColeta = '{dataColeta}';"
        else:
            command = f"INSERT INTO Leitura VALUES (null, {fkComponente}, {fkMetrica}, {fkMaquina}, {fkEmpresa}, '{dataColeta}', {valorLeitura});"
    else:
        command = f"INSERT INTO Leitura VALUES (null, {fkComponente}, {fkMetrica}, {fkMaquina}, {fkEmpresa}, '{dataColeta}', {valorLeitura})"
    run_sql_command(command)

# Cria os componentes no banco de dados


def create_components(fkMaquina: int, fkEmpresa: int):
    get_component_command = f"SELECT nomeComponente from Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} LIMIT 3"
    components = run_sql_command(get_component_command)
    print("Componentes encontrados: ", components)
    list_of_components = ["cpu", "ram", "disco"]

    if components != None:
        for component in components:
            list_of_components.remove(component[0])

    for i in range(len(list_of_components)):
        print(f"Componente {list_of_components[i]} sendo criado")
        insert_command = f'INSERT INTO Componente VALUES (null, "{list_of_components[i]}", 1, Null, {fkMaquina}, {fkEmpresa});'
        run_sql_command(insert_command)
        print("Componente Adicionado")

        get_component_command = f"SELECT nomeComponente from Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} LIMIT 3"

    components = run_sql_command(
        f"SELECT idComponente, nomeComponente from Componente WHERE fkMaquina = {fkMaquina} AND fkEmpresa = {fkEmpresa} LIMIT 3")
    for component in components:
        for metrica in static_metrica[component[1]]:
            fkMetrica = static_metrica[component[1]][metrica]
            conexao_metricas = run_sql_command(
                f"SELECT * FROM Componente_has_Metrica WHERE fkComponente = {component[0]} AND fkMetrica = {fkMetrica} AND fkMaquina = {fkMaquina} and fkEmpresa = {fkEmpresa}")
            if (len(conexao_metricas) == 0):
                print(f"Componente {component[1]}, Metrica {metrica} Criado")

                run_sql_command(
                    f"INSERT INTO Componente_has_Metrica VALUES ({component[0]}, {fkMetrica}, {fkMaquina}, {fkEmpresa})")
            else:
                print(
                    f"Componente {component[1]}, Metrica {metrica} Já existe")
