import os
import platform
import time
import getmac
import computer_info as ci
import data_base_connection as db

computer_hash = getmac.get_mac_address().replace(":", "").upper()
print(computer_hash)
print(db.get_computer_with_hash(computer_hash))

def main():
    if platform.system() == "Linux":
        menu_select()
    else:
        print("Sistema Operacional não suportado, utilize Linux!")
        exit()

def menu_select():
    while True:
        os.system("clear")
        print("=====================================")
        print("= 1 - Obter informações do Computador =")
        print("= 2 - Obter Mac Address desse Computador =")
        print("= 3 - Obter Estado dos Componentes =")
        print("= 4 - Sair =")
        option = input("Escolha uma opção: ")
        if (option == "1"):
            get_computer_info()

def get_computer_info():
    if computer_hash:
        computer_info = ci.get_all_info()
        computer_components = db.get_componentes_computer(computer_hash)
        for component in computer_components:
            metricas_component = db.get_metricas(component["idComponente"], component["fkMaquina"])
            for metrica in metricas_component:
                print(f"{metrica['nomeMetrica']}: {computer_info[component['nomeComponente']][metrica['nomeMetrica']]}{metrica['unidadeDeMedida']}")

    else:
        print("Adicione a máquina pelo nosso site!")
