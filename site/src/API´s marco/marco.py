import psutil
import os
import pymysql as conector
import csv
import requests
import gzip
import json
import sys

from gpiozero import CPUTemperature


con = conector.connect(user='aluno', password='sptech',
                              host='127.0.0.1',
                              database='P1');
cursor = con.cursor();

i=0;
contador=200;

CPU=[]
RAM=[]
DISCO=[]  
TEMPERATURA=[22,222,22,22]


while(i<contador):
    i += 1

    cpu = psutil.cpu_percent(4);
    ram = psutil.virtual_memory()[2] / 10
    disco = round(psutil.disk_usage('/').total/(1024*1024*1024),1)
    temp = wmi.WMI(namespace="root\\wmi")
    cpu_temp = CPUTemperature()


    # CSV_URL="http://192.168.101.5:8085"

    # with requests.Session() as crawler:
    #     temp = crawler.get(CSV_URL)
    CPU.append(cpu)
    RAM.append(ram)
    DISCO.append(disco)
   
    # cursor.execute("USE db_test")
    cursor.execute(f"Insert into CPU_metricas values({i}, 33.1,{ram}, {cpu}, {disco},1);")
    con.commit()
    cursor.execute(f"select * from CPU_metricas")
    resultado = cursor.fetchall() # fetchone
    print(cpu)
    print(cpu.temperature)
    # TEMPERATURA.append(temp);  

   

print(CPU)
print(RAM)
print(DISCO)




GERAL=(CPU,RAM,DISCO);


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