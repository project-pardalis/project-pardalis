
import psutil, os, platform, controlador_hash as hash, comandosDados as dados

# Início do programa
# Verificar se é Linux

def select_menu():
    print("Bem vindo ao Pardalis!")
    print("Opções Dinponíveis:")
    print("1 - Obter Dados do Computador")
    print("2 - Adicionar Hash do Computador")
    print("0 - Sair")
    option = input("Digite a opção desejada: ")
    if option == 1:
        exit()
    elif option == 2:
        hash.save_hash()

    elif option == 0:
        print("Obrigado por utilizar o Pardalis!")
        exit()
    else:
        print("Opção inválida")
        select_menu()

hash_computer = hash.load_hash()
sistema_operacional = platform.system()

def main():
    if sistema_operacional == "Linux":
        select_menu()
    else:
        print("Sistema Operacional não suportado, utilize Linux!")
        exit()

main()