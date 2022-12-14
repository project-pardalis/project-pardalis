import random
import csv
import mysql.connector as db
from pymysql import NULL

banco = db.connect(
    host="localhost",
    user="aluno",
    password="sptech",
    database="PARDALIS"
)

mycursor = banco.cursor()

f = open("python/jorge.csv", "w")


def delete_csv():
    with open('python/jorge.csv', "w") as arq:
        arq.write('')
    with open('python/jorgeComponente.csv', "w") as arq:
        arq.write('')
    with open('python/jorgeMetricasHasComponentes.csv', "w") as arq:
        arq.write('')
    with open('python/jorgeUsuarios.csv', "w") as arq:
        arq.write('')
    with open('python/jorgeDados.csv', "w") as arq:
        arq.write('')


def sorteio(componente):
    if componente.lower() == "maquina":
        maquina = random.randint(0, 100)
        if maquina < 75:
            return 0
        else:
            return 1


def hex_append(so):
    so = so.lower()
    so = so[0:2]
    return f"{so}-{gerar_hex(20)}"


def gerar_hex(num):
    chars = "123456ABCDEFGHI76wndixdzsfszfs2009765210ojfngdBNMUOP"
    string_hex = ''
    for i in range(num):
        rand = random.randint(0, len(chars)-1)
        string_hex += chars[rand]
    return string_hex


def format_date(mes, dia, hora, minuto, segundo):
    mesF = mes
    diaF = dia
    horaF = hora
    minF = minuto
    segF = segundo
    if mes < 10:
        mesF = f'0{mes}'
    if dia < 10:
        diaF = f'0{dia}'
    if hora < 10:
        horaF = f'0{hora}'
    if minuto < 10:
        minF = f'0{minuto}'
    if segundo < 10:
        segF = f'0{segundo}'
    data = f'2022-{mesF}-{diaF} {horaF}:{minF}:{segF}'
    return data


def check_lines(arq):
    with open(arq) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            line_count += 1
    return line_count


def write_lines_comp(idComp, fkMaq, fkEmp, nome):
    with open("python/jorgeComponente.csv", "a", newline='',encoding='utf-8') as csv_file:
        esc = csv.writer(csv_file, delimiter=',',
                         quotechar='"', quoting=csv.QUOTE_MINIMAL)
        esc.writerow([idComp, nome, 1, NULL, fkMaq, fkEmp])


def write_lines_met(fkComp, fkMaq, fkEmp, fkMet):
    with open("python/jorgeMetricasHasComponentes.csv", "a", newline='',encoding='utf-8') as csv_file:
        esc = csv.writer(csv_file, delimiter=',',
                         quotechar='"', quoting=csv.QUOTE_MINIMAL)
        esc.writerow([fkComp, fkMet, fkMaq, fkEmp])


def write_lines_user(idUser, fkEmp, fkAdm, nome, email, senha, cargo):
    with open("python/jorgeUsuarios.csv", "a", newline='',encoding='utf-8') as csv_file:
        esc = csv.writer(csv_file, delimiter=',',
                         quotechar='"', quoting=csv.QUOTE_MINIMAL)
        esc.writerow([idUser, nome, email, senha, cargo, fkEmp, fkAdm])


def write_lines_dados(idComp, fkComp, fkMet, fkMaq, fkEmp, data, valor):
    sql = "INSERT INTO Leitura VALUES(%s,%s,%s,%s,%s,%s,%s)"
    val = (idComp,fkMet,fkComp,fkMaq,fkEmp,data,valor)
    mycursor.execute(sql,val)
    banco.commit()


def get_componente(x):
    componentes = ["Cpu", "Memoria Ram", "Disco"]
    return componentes[x]


def main_usuario():
    ler = open("python/nomes.txt", "r").read().split(",")
    cargoR = ["Operacional", "Tecnico"]
    for i in range(20):
        idUsuario = i+1
        fkEmpresa = 1
        rand = random.randint(0, len(ler)-1)
        nome = ler[rand]
        email = f'{nome}@gmail.com'
        senha = gerar_hex(8)
        cargoRandom = random.randint(0, 100)
        if cargoRandom > 90:
            cargo = cargoR[0]
        else:
            cargo = cargoR[1]

        if i > 1:
            fkAdm = def_Adm(i)
        else:
            fkAdm = 'Null'
        write_lines_user(idUsuario, fkEmpresa, fkAdm,
                         nome, email, senha, cargo)


def def_Adm(qtd):
    rand = random.randint(0, 100)
    if rand > 60:
        return random.randint(0, qtd)
    else:
        return "Null"


def main_maquinas():
    so = ["Linux", "Windows"]
    for i in range(1, 51):
        idServer = i
        sistemaOp = so[sorteio("maquina")]
        hexCode = hex_append(sistemaOp)
        onCloud = random.randint(0, 1)
        with open("python/jorge.csv", "a", newline='',encoding='utf-8') as csv_file:
            esc = csv.writer(csv_file, delimiter=',',
                             quotechar='"', quoting=csv.QUOTE_MINIMAL)
            esc.writerow([idServer, hexCode, sistemaOp, onCloud, "2022-12-12 10:10:10", gerar_hex(10),1])


def main_componentes():
    compNum = 0
    fkMaquina = 0
    for i in range(check_lines("python/jorge.csv")*3):
        idComponente = i+1
        if i % 3 == 0:
            fkMaquina += 1
        fkEmpresa = 1
        nome = get_componente(compNum)
        compNum += 1
        if compNum == 3:
            compNum = 0
        write_lines_comp(idComponente, fkMaquina, fkEmpresa, nome)


def main_metricas():
    for maquina in range(check_lines("python/jorge.csv")):
        for componente in range(2):
            if componente == 0:
                for i in range(2):
                    write_lines_met(componente+1,maquina+1,1,i+1)
            write_lines_met(componente+2,maquina+1,1,componente+3)


def main_dados():
    idComponente = 0
    for mes in range(11):
        for dias in range(29):
            for horas in range(24):
                for minutos in range(60):
                    for segundos in range(60):
                        for maquina in range(check_lines("python/jorge.csv")):
                            for componente in range(3):
                                if componente == 0:
                                    for i in range(2):
                                        valor = random.randint(60, 80)
                                        idComponente += 1
                                        write_lines_dados(idComponente, componente+i+1, componente+1, maquina+1,
                                                          1, format_date(mes+1, dias+1, horas, minutos, segundos),valor)
                                elif componente == 1:
                                    valor = random.randint(6, 12)
                                    idComponente += 1
                                    write_lines_dados(idComponente, componente+2, componente+1, maquina+1,
                                                      1, format_date(mes+1, dias+1, horas, minutos, segundos), valor)
                                elif componente == 2:
                                    valor = random.randint(700, 1000)
                                    idComponente += 1
                                    write_lines_dados(idComponente, componente+2, componente+1, maquina+1,
                                                      1, format_date(mes+1, dias+1, horas, minutos, segundos), valor)


def main():

    delete_csv()
    main_maquinas()
    main_componentes()
    main_metricas()
    main_usuario()
    main_dados()


main()
