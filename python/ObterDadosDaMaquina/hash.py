import json, data_base as db
from logging import exception
# Tentar


# Tensa salvar o hash digitado no json
def save_hash():
    hash_computer = input("Digite o hash do computador: ")
    try:
        with open("hash.json", "w") as file:
            json.dump({
                "hash": hash_computer
            }, file)
        print("Hash salvo com sucesso!")
        return hash_computer
    except:
        print("Erro ao salvar o hash do computador")

# Carrega o hash do json, se não existir o arquivo, cria um novo
def load_hash():
    try:
        with open('hash.json', 'r') as openfile:
            result = check_hash(json.load(openfile)["hash"])
            if result:
                return result
            else:
                return False

    except :
        with open("hash.json", "w") as file:
            json.dump({
                "hash": ""
            }, file)
        print("Arquivo de hash não encontrado, criando arquivo...")

# Verifica se o hash existe no banco de dados
def check_hash(hash : str):
    exists_in_database = db.verify_if_hash_exists_in_database(hash)
    if exists_in_database:
        print("Hash encontrado no banco de dados!")
        return exists_in_database
    else:
        print("Hash não encontrado no banco de dados!")
        print("Crie um novo hash no seu perfil no site!")
        return False
    # Acessar o banco de dados e verificar se o hash existe e se está ativo?