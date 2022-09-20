import json

def save_hash():
    hash_computer = input("Digite o hash do computador: ")
    try:
        with open("hash.json", "w") as file:
            file.write({
                "hash": hash_computer
            })
        return hash_computer
        print("Hash salvo com sucesso!")
    except:
        print("Erro ao salvar o hash do computador")

def load_hash():
    try:
        with open('hash.json', 'r') as openfile:
            return json.load(openfile)
    except:
        with open("hash.json", "w") as file:
            file.write({
                "hash": ""
            })
            print("Arquivo de hash não encontrado, criando arquivo...")

def check_hash():
    pass
    # Acessar o banco de dados e verificar se o hash existe e se está ativo?