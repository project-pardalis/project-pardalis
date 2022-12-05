import psutil
import os
import pymysql as conector
import csv
import requests
import gzip
import json
import sys
import psutil as ps
import pymssql
# essa biblioteca da problema pq tem que def. pin
# from gpiozero import CPUTemperature


# 0 = DESENVOLVIMENTO
# 1 = PRODUCAO


AMBIENTE = 1


if AMBIENTE == 0:
    connection = pymysql.connect(host='localhost',
                                 user='aluno',
                                 password='urubu100',
                                 database='PARDALIS',
                                 cursorclass=pymysql.cursors.DictCursor)
    cursor = connection.cursor()
else:
    connection = pymssql.connect(host='svr-pardalis.database.windows.net',
                                 user='pardalis',
                                 password='#urubu100',
                                 database='pardalis',
                                 as_dict=True)
    cursor = connection.cursor()


i = 0


CPU = []
RAM = []
DISCO = []
TEMPERATURA = [22, 222, 22, 22]


while (True):

    cpu = psutil.cpu_percent(4)
    ram = psutil.virtual_memory()[2] / 10
    disco = round(psutil.disk_usage('/').total/(1024*1024*1024), 1)
    try:
        temp = ps.sensors_temperatures()['acpitz'][0].current

    except:
        print("Por limitação do windows, a temperatura não pode ser pega. Portanto, estamos encerrando o programa ")
        exit()

    cpu_temp = temp
    # CSV_URL="http://192.168.101.5:8085"

    # with requests.Session() as crawler:
    #     temp = crawler.get(CSV_URL)
    CPU.append(cpu)
    RAM.append(ram)
    DISCO.append(disco)

    # cursor.execute("USE db_test")
    cursor.execute(
        f"insert into CPU_metricas (temperatura, ram, frequencia, disco) values  ( {cpu_temp},{ram}, {cpu}, {disco});")
    connection.commit()
    cursor.execute(f"select * from CPU_metricas")
    resultado = cursor.fetchall()  # fetchone
    print(cpu_temp)

    # TEMPERATURA.append(temp);


print(CPU)
print(RAM)
print(DISCO)


GERAL = (CPU, RAM, DISCO)


objJson = json.dumps(GERAL)
print(GERAL)


# GERAL.append(CPU);
# class Juncao():
#     dados={}
#     def

# with open('data000000000000.csv.gz', 'wb') as f:
#         f.write(CPU)

# f = gzip.open('data000000000000.csv.gz', 'rt')
# file_content=f.read()


# cr = csv.reader(file_content.splitlines(), delimiter=',')
# my_list = list(cr)
# for row in my_list:
#     print(row)
