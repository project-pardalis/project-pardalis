import psutil
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from datetime import datetime, timedelta
import pymysql.cursors
import platform

def definirGraficoGeral(frame):
    conexao = pymysql.connect(host='localhost', user='root', password='1234', database='pardalis', port=3307, cursorclass=pymysql.cursors.DictCursor)

    with conexao:
        with conexao.cursor() as cursor:
            comando = f"INSERT INTO registro (momento, porcentagemCPU, porcentagemRAM, porcentagemDisco) VALUES (NOW(), {psutil.cpu_percent()}, {psutil.virtual_memory().percent}, {psutil.disk_usage('/').percent})"
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