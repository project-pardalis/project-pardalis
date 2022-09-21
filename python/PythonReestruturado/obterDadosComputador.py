import psutil, os, platform, time, controlador_hash as hash
import comandosDados as dados, comandosParaArmazenarDados as db

# Início do programa
# Verificar se é Linux

machine_information = {
    "fkMaquina": "",
    "fkEmpresa": "",
    "hash": ""
}
hash_computer = False
sistema_operacional = platform.system()

def start_get_values():
    computer_info = dados.get_all_info()
    db.insert_computer_info(computer_info)
    
    components = db.get_components(machine_information["fkMaquina"], machine_information["fkEmpresa"])

    insert_static_metrica(computer_info, components)
    
    while True:

        components = db.get_components(machine_information["fkMaquina"], machine_information["fkEmpresa"])
        db.insert_dynamic_metrica(computer_info, components)
        time.sleep(1)

## Arrumar o insert_static_metrica no valor Leitura
## Descobrir onde colocar o estático como arquitetura do computador
def insert_static_metrica(computer_info : dict, components : dict):
    exists = db.update_machine(machine_information["fkMaquina"], machine_information["fkEmpresa"], computer_info["system"]["system"])

    if (not exists):
        for component in components:
            component_name = component["nomeComponente"]
            db.insert_static_metrica(component["nomeComponente"], component["idComponente"], 
            component["fkMaquina"], component["fkEmpresa"], computer_info[component_name]["atual_percent"], "ENCONTRAR")

def select_menu():
    try:
        print("Bem vindo ao Pardalis!")
        print("Opções Dinponíveis:")
        print("1 - Obter Dados do Computador")
        print("2 - Atualizar Componentes do Computador")
        print("3 - Adicionar Hash do Computador")
        print("0 - Sair")
        option = input("Digite a opção desejada: ")
        if option == 1:
            hash_computer = hash.load_hash()
            machine_information["fkMaquina"] = hash_computer["fkMaquina"]
            machine_information["fkEmpresa"] = hash_computer["fkEmpresa"]
            machine_information["hash"] = hash_computer["hash"]

            if (not hash_computer):
                exit()
            else:
                start_get_values()
        elif option == 2:
            exit()
        elif option == 3:
            hash.save_hash()

        elif option == 0:
            print("Obrigado por utilizar o Pardalis!")
            exit()
        else:
            print("Opção inválida")
    except:
        pass
    select_menu()

def main():
    if sistema_operacional == "Linux":
        select_menu()
    else:
        print("Sistema Operacional não suportado, utilize Linux!")
        exit()

main()