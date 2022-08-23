import psutil
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from datetime import datetime, timedelta
import pymysql.cursors
import platform
import os
import subprocess, re

def nomeProcessador():
    if platform.system() == "Linux":
        command = "cat /proc/cpuinfo"
        all_info = subprocess.check_output(command, shell=True).decode().strip()
        for line in all_info.split("\n"):
            if "model name" in line:
                z = re.sub( ".*model name.*:", "", line,1)
    else:
        print("Deu ruim")

    print(z)


def infoMaquina():

    sistemaOperacional = platform.uname().system
    qtdCPU = os.cpu_count()
    qtdThreads = os.cpu_count()*2
    qtdCache = psutil.virtual_memory().cached * 10**-9
    qtdTotalRam = psutil.virtual_memory().total * 10 ** -9
    armazenamentoMax = psutil.disk_usage('/').total * 10**-9
    modeloProcessador = nomeProcessador()

    conexao = pymysql.connect(host='localhost', user='aluno', password='sptech', database='PARDALIS', cursorclass=pymysql.cursors.DictCursor)

    with conexao:
        with conexao.cursor() as cursor:
            comando = f"INSERT INTO MAQUINA (MAQUINA_SISTEMA_OPERACIONAL, MAQUINA_MODELO_PROCESSADOR , MAQUINA_THREADS, MAQUINA_QTD_CPU, MAQUINA_QTD_RAM, MAQUINA_QTD_CACHE, MAQUINA_ARMAZENAMENTO_MAXIMO) VALUES ('{sistemaOperacional}', '{modeloProcessador}', {qtdThreads}, {qtdCPU}, {qtdTotalRam}, {qtdCache}, {armazenamentoMax})"
            cursor.execute(comando)

        conexao.commit()

infoMaquina()

def definirGraficoGeral(frame):
    conexao = pymysql.connect(host='localhost', user='aluno', password='sptech', database='PARDALIS', cursorclass=pymysql.cursors.DictCursor)

    with conexao:
        with conexao.cursor() as cursor:
            comando = f"INSERT INTO REGISTRO (REGISTRO_MOMENTO, REGISTRO_PORC_CPU , REGISTRO_PORC_RAM, REGISTRO_PORC_DISCO) VALUES (NOW(), {psutil.cpu_percent()}, {psutil.virtual_memory().percent}, {psutil.disk_usage('/').percent})"
            cursor.execute(comando)

        conexao.commit()

    valores[0].append(round(psutil.virtual_memory().used / psutil.virtual_memory().total * 100, 2))
    valores[1].append(psutil.cpu_percent(interval=0.2))
    valores[2].append(round(psutil.disk_usage("/").percent, 2))
    
    nomeDados = ['Memória RAM', 'CPU', 'Disco']

    for index in range(0, 3):
        valores[index].remove(valores[index][0])
        graficos[index].cla() # limpa o gráfico
        graficos[index].plot(valores[index])
        graficos[index].scatter(len(valores[index]) - 1, valores[index][-1]) # marcador da posição atual
        graficos[index].title.set_text(f'{nomeDados[index]} - {valores[index][-1]}%')
        graficos[index].set_ylim(0, 100)

# Lista dos valores que aparecem nos gráficos (ram, cpu, ocupação do disco)
valores = [[0] * 50, [0] * 50, [0] * 50]

# propriedades dos gráficos
janela = plt.figure(num='Gráficos do sistema', figsize=(3 * 3, 2 * 3), facecolor='#EEE')

graficos = [plt.subplot(311), plt.subplot(312), plt.subplot(313)]

for i in range(0, 3):
    graficos[i].axes.get_xaxis().set_visible(False)
    graficos[i].set_facecolor('#DDD')

animacaoGeral = FuncAnimation(janela, definirGraficoGeral, interval=1000)
plt.show()