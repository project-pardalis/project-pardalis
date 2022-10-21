import json, getmac
import data_base as db


# Tenta salvar o hash digitado no json
def save_hash(mac_address):
    hash_computer = mac_address
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

    except:
        with open("hash.json", "w") as file:
            json.dump({
                "hash": ""
            }, file)
        print("Arquivo de hash não encontrado, criando arquivo...")

# Verifica se o hash existe no banco de dados
def check_hash(hash: str):
    exists_in_database = db.verify_if_hash_exists_in_database(hash.replace(":", "").upper())
    if exists_in_database:
        print(f"Hash {hash} no banco de dados!")
        return exists_in_database
    else:
        print("Hash não encontrado no banco de dados!")
        print("Pegue o seu hash na opção 3 e adiciione na sua infraestrutura no site!")
        return False

#Pega o Mac Address do computador para adicionar como hash
def get_mac_address():
    mac_address = getmac.get_mac_address()
    print("O seu hash/mac address é: ", mac_address)
    save_hash(mac_address)