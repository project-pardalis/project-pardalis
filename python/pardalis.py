import psutil
import platform
import subprocess
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import pymysql.cursors

def definirGraficoGeral(frame):
    conexao = pymysql.connect(host='localhost', user='root', password='urubu100', database='PARDALIS', cursorclass=pymysql.cursors.DictCursor)

    with conexao:
        with conexao.cursor() as cursor:
            comando = f"INSERT INTO REGISTRO (REGISTRO_MOMENTO, REGISTRO_PORC_CPU , REGISTRO_PORC_RAM, REGISTRO_PORC_DISCO, REGISTRO_NIVEL_CACHE_CPU) VALUES (NOW(), {psutil.cpu_percent()}, {psutil.virtual_memory().percent}, {psutil.disk_usage('/').percent}, {psutil.virtual_memory().cached * 10 ** -9})"
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

# Início do programa
# Verificar se é Linux
if platform.system() == "Linux":
    comando = "cat /proc/cpuinfo"
    resultado = subprocess.check_output(comando, shell=True).decode()
    for linha in resultado.splitlines():
        if "model name" in linha:
            nome_modelo = linha[linha.find(":") + 1 : -1].strip()
            break
else:
    print("Este aplicativo só pode executado em Linux!")
    exit()

# Pegar informações da MÁQUINA
sistemaOperacional = platform.uname().system
qtdCPUFisica = psutil.cpu_count(logical=False)
qtdCPUVirtual = psutil.cpu_count()
qtdTotalRam = psutil.virtual_memory().total * 10 ** -9
armazenamentoMax = psutil.disk_usage('/').total * 10**-9
modeloProcessador = nome_modelo

conexao = pymysql.connect(host='localhost', user='root', password='urubu100', database='PARDALIS', cursorclass=pymysql.cursors.DictCursor)

with conexao:
    with conexao.cursor() as cursor:
        comando = f"INSERT INTO MAQUINA (MAQUINA_SISTEMA_OPERACIONAL, MAQUINA_MODELO_PROCESSADOR , MAQUINA_QTD_CPU_FISICA, MAQUINA_QTD_CPU_VIRTUAL, MAQUINA_QTD_RAM, MAQUINA_ARMAZENAMENTO_MAXIMO) VALUES ('{sistemaOperacional}', '{modeloProcessador}', {qtdCPUFisica}, {qtdCPUVirtual}, {qtdTotalRam}, {armazenamentoMax})"
        cursor.execute(comando)

    conexao.commit()

# Lista dos valores que aparecem nos gráficos (ram, cpu, ocupação do disco)
valores = [[0] * 50, [0] * 50, [0] * 50]

# Criação da janela do gráfico e definindo propriedades
janela = plt.figure(num='Gráficos do sistema', figsize=(9, 6), facecolor='#EEE')

# Criação dos gráficos que ficam dentro da janela
graficos = [plt.subplot(311), plt.subplot(312), plt.subplot(313)]

# Configurações de cada gráfico
for i in range(0, 3):
    graficos[i].axes.get_xaxis().set_visible(False)
    graficos[i].set_facecolor('#DDD')

# Animação em tempo real do gráfico
animacaoGeral = FuncAnimation(janela, definirGraficoGeral, interval=1000)
plt.show()