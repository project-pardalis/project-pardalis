import psutil
import os
import mysql.connector as conector
import csv
import requests
import gzip
import json
import sys


con = conector.connect(user='aluno', password='sptech',
                              host='127.0.0.1',
                              database='db_test');
cursor = con.cursor();

i=0;
contador=2;

CPU=[]
RAM=[]
DISCO=[]  
TEMPERATURA=[22,222,22,22]


while(i<contador):
    i=i+1;

    cpu = psutil.cpu_percent(4);
    ram = psutil.virtual_memory()[2]
    disco = round(psutil.disk_usage('/').total/(1024*1024*1024),1);
   

    # CSV_URL="http://192.168.101.5:8085"

    # with requests.Session() as crawler:
    #     temp = crawler.get(CSV_URL)

   
    # cursor.execute("USE db_test")
    # cursor.execute(f"INSERTO INTO metricas VALUES(1,{cpu},{ram},{disco},null)")

    CPU.append(cpu);
    RAM.append(ram);
    DISCO.append(disco);
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