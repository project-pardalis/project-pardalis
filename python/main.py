from os import system, name as osName
import psutil
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from time import sleep
from datetime import datetime, timedelta
from platform import system as platformSystem, release, uname

qtdCpus = psutil.cpu_count()

def limparTela():
    if(osName == 'posix'):
        system('clear')
    else:
        system('cls')

def definirGraficoCPUs(frame):
    for index in range(0, qtdCpus):
        valoresCpu[index].remove(valoresCpu[index][0])
        valoresCpu[index].append(psutil.cpu_percent(interval=0.2, percpu=True)[index])
        graficosCpu[index].cla() # limpa o gráfico
        graficosCpu[index].plot(valoresCpu[index])
        graficosCpu[index].scatter(len(valoresCpu[index]) - 1, valoresCpu[index][-1]) # marcador da posição atual
        graficosCpu[index].title.set_text(f'CPU {index + 1} - {valoresCpu[index][-1]}%')
        graficosCpu[index].set_ylim(0, 100)

def definirGraficoGeral(frame):
    valoresGeral[0].append(round(psutil.virtual_memory().used / psutil.virtual_memory().total * 100, 2))
    valoresGeral[1].append(psutil.cpu_percent(interval=0.2))
    valoresGeral[2].append(round(psutil.disk_usage("/").percent, 2))
    
    nomeDados = ['Memória RAM', 'CPU', 'Disco']

    for index in range(0, 3):
        valoresGeral[index].remove(valoresGeral[index][0])
        graficosGeral[index].cla() # limpa o gráfico
        graficosGeral[index].plot(valoresGeral[index])
        graficosGeral[index].scatter(len(valoresGeral[index]) - 1, valoresGeral[index][-1]) # marcador da posição atual
        graficosGeral[index].title.set_text(f'{nomeDados[index]} - {valoresGeral[index][-1]}%')
        graficosGeral[index].set_ylim(0, 100)

while True:
    limparTela()
    print(80 * '=')
    print('Opções'.center(80))
    print(80 * '=')
    print('[ 0 ] Finalizar aplicação')
    print('[ 1 ] Gerar relatório')
    print('[ 2 ] Informações sobre o sistema')
    print('[ 3 ] Acompanhar sistema geral')
    print('[ 4 ] Acompanhar CPUs')
    print(80 * '=')
    opcao = input('Digite uma opção: ')

    if opcao == '0':
        print(80 * '=')
        print('Sistema finalizado com sucesso'.center(80))
        print(80 * '=')
        exit()

    elif opcao == '1':
        # Algo aqui
        print('Algo')

    elif opcao == '2':
        limparTela()
        print(80 * '=')
        print('Informações sobre o sistema'.center(80))
        print(80 * '=')
        print(f'Sistema operacional: {platformSystem()}')
        print(f'Versão do sistema operacional: {release()}')
        print(f'Quantidade de CPU\'s lógicas na máquina: {qtdCpus}')
        print(f'Memória RAM total: {round(psutil.virtual_memory().total * 10 ** -9, 2)} GB')
        print(f'Espaço utilizado do disco: {round(psutil.disk_usage("/").used * 10 ** -9, 2)} GB / {round(psutil.disk_usage("/").total * 10 ** -9, 2)} GB ({round(psutil.disk_usage("/").percent, 2)}%)')
        print(f'Espaço livre do disco: {round(psutil.disk_usage("/").free * 10 ** -9, 2)} GB / {round(psutil.disk_usage("/").total * 10 ** -9, 2)} GB ({round(100 - psutil.disk_usage("/").percent, 2)}%)')
        print(f'Última inicialização do sistema: {datetime.fromtimestamp(psutil.boot_time()).strftime("%d/%m/%Y - %H:%M:%S")}')
        print(80 * '=' + '\n')
        input('Aperte Enter para continuar...')

    elif opcao == '3':
        valoresGeral = [[0] * 50, [0] * 50, [0] * 50]

        # propriedades dos gráficos
        janelaGeral = plt.figure(figsize=(3 * 3, 2 * 3), facecolor='#EEE')
        
        graficosGeral = [plt.subplot(311), plt.subplot(312), plt.subplot(313)]
        
        for i in range(0, 3):
            graficosGeral[i].axes.get_xaxis().set_visible(False)
            graficosGeral[i].set_facecolor('#DDD')

        animacaoGeral = FuncAnimation(janelaGeral, definirGraficoGeral, interval=500)
        plt.show()

    elif opcao == '4':
        valoresCpu = []
        for index in range(0, qtdCpus):
            valoresCpu.append([0] * 50)

        # propriedades dos gráficos
        janela = plt.figure(figsize=(3 * 3, 2 * 3), facecolor='#EEE')
        
        if qtdCpus == 2:
            graficosCpu = [plt.subplot(221), plt.subplot(222)]
        elif qtdCpus == 4:
            graficosCpu = [plt.subplot(221), plt.subplot(222), plt.subplot(223), plt.subplot(224)]
        elif qtdCpus == 6:
            graficosCpu = [plt.subplot(331), plt.subplot(332), plt.subplot(333), plt.subplot(337), plt.subplot(338), plt.subplot(339)]

        for i in range(0, qtdCpus):
            graficosCpu[i].axes.get_xaxis().set_visible(False)
            graficosCpu[i].set_facecolor('#DDD')

        animacaoCPU = FuncAnimation(janela, definirGraficoCPUs, interval=500)
        plt.show()

    else:
        print(80 * '=')
        print('Por favor, escolha uma opção válida!'.center(80))
        print(80 * '=')
        sleep(2)