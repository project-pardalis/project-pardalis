import os
import time
from locust import HttpUser, task, between

print('-------------------------------------------------------')

print ("Teste de Servidor Pardalis")
print("Favor seguir instruções do site ao realizar o teste de Servidor")

print('-------------------------------------------------------')


qtdUsuarios = int(input("Insira a quatidade de Usuarios:"))

while(qtdUsuarios is None or qtdUsuarios<=0):
        print('-------------------------------------------------------')
        print("Erro - Quantidade de usuários inválida")
        print('-------------------------------------------------------')
        qtdUsuarios = int(input("Insira a quatidade de Usuários:"))

print('-------------------------------------------------------')

spawnRate = float(input("Insira a taxa de Spawn:"))

while(spawnRate is None or spawnRate<=0):
        print('-------------------------------------------------------')
        print("Erro - Não há taxa de Spawn")
        print('-------------------------------------------------------')
        spawnRate = float(input("Insira a taxa de Spawn:"))

print('-------------------------------------------------------')

alvoHost = input("Insira a porta alvo:")

while(alvoHost is None):
        print('-------------------------------------------------------')
        print("Erro - Sem host")
        print('-------------------------------------------------------')
        alvoHost = input("Insira a porta alvo:")

print('-------------------------------------------------------')

tempoExec = int(input("Insira o tempo de execução (em segundos e com limite de 10 minutos):"))

while(tempoExec > 600 or tempoExec <=0):
    print('-------------------------------------------------------')
    print("Tempo inválido, favor inserir novo tempo")
    print('-------------------------------------------------------')
    tempoExec = int(input("Insira o tempo de execução(em segundos):"))

tempoInat = int(input("Insira o tempo de encerramento por inatividade(em segundos):"))

while (tempoInat > 100 or tempoInat <=0):
    print('-------------------------------------------------------')
    print("Tempo inválido, favor inserir novo tempo")
    print('-------------------------------------------------------')
    tempoInat = int(input("Insira o tempo de encerramento por inatividade(limite de 100 segundos):"))

print('-------------------------------------------------------')
print('-------------------------------------------------------')
print('-------------------------------------------------------')

print('Quantidade de Usuários: %d' %(qtdUsuarios))
print('Usuários por Segundo: %.2f' %(spawnRate))
print('Porta: %s' %(alvoHost))
print('Tempo de execução: %d' %(tempoExec))

print('-------------------------------------------------------')
print('-------------------------------------------------------')
print('-------------------------------------------------------')

os.system("locust -f locustfile.py --host %s --csv=example --headless -u %d -r %.2f --run-time %d --stop-timeout %d" %(alvoHost,qtdUsuarios,spawnRate,tempoExec,tempoInat))
