import os
import platform
import time
from tkinter import N
import getmac
import computer_info as ci
import data_base_connection as db

computer_hash = getmac.get_mac_address().upper()
print(computer_hash)
print()

def clear_screen():
    if platform.system() == "Linux":
        os.system("clear")
    elif platform.system() == "Windows":
        os.system("cls")

def run_command_verifying_hash(command):
    if db.get_computer_with_hash(computer_hash.replace(":", "").upper()):
        command()
# ----------------------------------------------------------------------------------------------------------------------
def menu_select():
    while True:
        #clear_screen()
        print("==========================================")
        print("=                                        =")
        print("= 1 - Obter informações do Computador    =")
        print("= 2 - Obter Mac Address desse Computador =")
        print("= 3 - Obter Estado dos Componentes       =")
        print("= 4 - Sair                               =")
        print("=                                        =")
        print("==========================================")
        option = input("Escolha uma opção: ")
        if option == "1":
            run_command_verifying_hash(get_computer_info)
            
        elif option == "2":
            print(f"O Mac Address desse computador é: {computer_hash}")
        elif option == "3":
            run_command_verifying_hash(change_components_state)
        elif option == "4":
            clear_screen()
            print("Saindo...")
            exit()

# ----------------------------------------------------------------------------------------------------------------------
#Opção 1
def get_computer_info():
    if computer_hash:
        computer_info = ci.get_all_info()
        print(computer_info)
        """ computer_components = db.get_componentes_computer(computer_hash)
        for component in computer_components:
            metricas_component = db.get_metricas(component["idComponente"], component["fkMaquina"])
            for metrica in metricas_component:
                print(f"{metrica['nomeMetrica']}: {computer_info[component['nomeComponente']][metrica['nomeMetrica']]}{metrica['unidadeDeMedida']}") """

    else:
        print("Adicione a máquina pelo nosso site!")

#Opção 2
def change_components_state():
    components = db.get_componentes_computer(computer_hash.replace(":", "").upper())
    for component in components:
        print(component)
        print("{:<8} {:<5}".format(component["nomeComponente"], component["isComponenteValido"]))
        #print(f"{}")

# ----------------------------------------------------------------------------------------------------------------------

menu_select()