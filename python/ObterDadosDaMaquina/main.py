import os, platform, time, hash
import computer_data as dados, data_base as db

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
    db.create_components(machine_information["fkMaquina"], machine_information["fkEmpresa"])
    db.insert_component_info(computer_info["cpu"], "cpu", machine_information["fkMaquina"], machine_information["fkEmpresa"])
    
    components = db.get_components(machine_information["fkMaquina"], machine_information["fkEmpresa"])
    exists = db.update_machine(machine_information["fkMaquina"], machine_information["fkEmpresa"], computer_info["system"]["system"])
    os.system("clear")

    for component in components:
        insert_metrica(computer_info, component, exists, 0, True)

    while True:
        computer_info = dados.get_all_info()

        components = db.get_components(machine_information["fkMaquina"], machine_information["fkEmpresa"])
        for component in components:
            insert_metrica(computer_info, component, True, 1, False)

        time.sleep(3)
        os.system("clear")

def insert_metrica(computer_info : dict, component : tuple, exists : bool, type = 0, static=False):
    if (exists and component[2] == 1):
            component_name = component[1]
            db.insert_metrica(component_name, component[0], 
            component[4], component[-1], computer_info, type, static)



def select_menu():
    while True:
        try:
            
            print("Bem vindo ao Pardalis!")
            print("Opções Dinponíveis:")
            print("1 - Obter Dados do Computador") # 1 - Padrão adicionado no Banco
            print("2 - Atualizar Componentes do Computador")
            print("3 - Adicionar Hash do Computador") # 1234567890 - Padrão adicionado no Banco
            print("0 - Sair")

            hash_computer = hash.load_hash()

            machine_information["fkMaquina"] = hash_computer[0][0]
            machine_information["fkEmpresa"] = hash_computer[0][len(hash_computer[0]) - 1]
            machine_information["hash"] = hash_computer[0][5]
            option = int(input("Digite a opção desejada: "))
            if option == 1:
                if (not hash_computer):
                    break
                else:
                    db.get_metricas()
                    start_get_values()

                    
            elif option == 2:
                break
            elif option == 3:
                hash.save_hash()
                
            elif option == 0:
                print("Obrigado por utilizar o Pardalis!")
                break
            else:
                print("Opção inválida")
        except:
            pass

def main():
    if sistema_operacional == "Linux":
        select_menu()
    else:
        print("Sistema Operacional não suportado, utilize Linux!")
        exit()

main()