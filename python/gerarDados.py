from dis import dis
import random
import csv

f = open("python/jorge.csv","w")

def delete_csv():
    with open('python/jorge.csv',"w") as arq : 
        arq.write('')
    with open('python/jorgeComponente.csv',"w") as arq:
        arq.write('')
    with open('python/jorgeMetricasHasComponentes.csv',"w") as arq:
        arq.write('')
    with open('python/jorgeUsuarios.csv',"w") as arq:
        arq.write('')
    with open('python/jorgeDados.csv',"w") as arq:
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
    return f"{so}-{gerar_hex()}"

def gerar_hex():
    chars = "123456ABCDEFGHI76wndixdzsfszfs2009765210ojfngdBNMUOP"
    string_hex = ''
    for i in range(0,20):
        rand = random.randint(0,len(chars)-1)
        string_hex += chars[rand]
    return string_hex

def check_lines(arq):
    with open(arq) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            line_count += 1
    return line_count

def write_lines_comp(idComp,fkMaq,fkEmp,nome):
    with open("python/jorgeComponente.csv", "a") as csv_file:
            esc = csv.writer(csv_file, delimiter=',', quotechar='"',quoting=csv.QUOTE_MINIMAL)
            esc.writerow([idComp, fkMaq, fkEmp, nome, 1])

def write_lines_met(fkComp,fkMaq,fkEmp,fkMet):
    with open("python/jorgeMetricasHasComponentes.csv", "a") as csv_file:
            esc = csv.writer(csv_file, delimiter=',', quotechar='"',quoting=csv.QUOTE_MINIMAL)
            esc.writerow([fkComp, fkMaq, fkEmp, fkMet])

def write_lines_user(idUser,fkEmp,fkAdm,nome,email,senha,cargo):
    with open("python/jorgeUsuarios.csv", "a") as csv_file:
            esc = csv.writer(csv_file, delimiter=',', quotechar='"',quoting=csv.QUOTE_MINIMAL)
            esc.writerow([idUser,fkEmp,fkAdm,nome,email,senha,cargo])

def write_lines_dados(idComp,fkComp,fkMaq,fkEmp,fkMet,valor, dia, hora, minuto):
    with open("python/jorgeDados.csv", "a") as csv_file:
            esc = csv.writer(csv_file, delimiter=',', quotechar='"',quoting=csv.QUOTE_MINIMAL)
            esc.writerow([idComp, fkComp, fkMaq, fkEmp, fkMet,valor, dia, hora, minuto])


def get_componente(x):
    componentes = ["Cpu","Memoria Ram","Disco"]
    return componentes[x]


def main_usuario():
    ler = open("python/nomes.txt","r").read().split(",")
    cargoR = ["Operacional","Tecnico"]
    for i in range(20) : 
        idUsuario = i+1
        fkEmpresa = 1
        rand = random.randint(0,len(ler))
        nome = ler[rand]
        email = f'{nome}@gmail.com'
        senha = gerar_hex() 
        cargoRandom = random.randint(0,100)
        if cargoRandom > 90:
            cargo = cargoR[0]
        else:
            cargo = cargoR[1]
       
        if i>1 : 
            fkAdm = def_Adm(i)
        else:
            fkAdm = 'Null'
        write_lines_user(idUsuario,fkEmpresa,fkAdm,nome,email,senha,cargo)
        

def def_Adm(qtd):
    rand = random.randint(0,100)
    if rand > 50:
        return random.randint(0,qtd)
    else:
        return "Null"



def main_maquinas():

    so = ["Linux", "Windows"]
    for i in range(1,51):
        idServer = i
        sistemaOp = so[sorteio("maquina")]
        hexCode = hex_append(sistemaOp)
        onCloud = random.randint(0,1)
        with open("python/jorge.csv", "a") as csv_file:
            esc = csv.writer(csv_file, delimiter=',', quotechar='"',quoting=csv.QUOTE_MINIMAL)
            esc.writerow([idServer, hexCode, sistemaOp, onCloud, 1])

def main_componentes():
    compNum = 0
    fkMaquina = 0
    for i in range(check_lines("python/jorge.csv")*3):
        idComponente = i+1
        if i % 3 == 0:
            fkMaquina+=1
        fkEmpresa = 1
        nome = get_componente(compNum)
        compNum+=1
        if compNum == 3:
            compNum = 0
        write_lines_comp(idComponente, fkMaquina, fkEmpresa, nome)

def main_metricas():
    for maquina in range(check_lines("python/jorgeComponente.csv")*check_lines("python/jorgeMetricas.csv")):
        for componente in range(3):
            for metrica in range(check_lines("python/jorgeMetricas.csv")):
                write_lines_met(componente+1,maquina+1,1,metrica)

def main_dados():
    idComponente = 0 
    for dias in range(10):
        for horas in range(24):
            for minutos in range(60):
                for maquina in range(check_lines("python/jorge.csv")):
                    for metrica in range(check_lines("python/jorgeMetricas.csv")):
                        for componente in range(3):
                            if componente == 0:
                                for i in range(2):
                                    valor = random.randint(20,100)
                                    idComponente += 1
                                    write_lines_dados(idComponente,componente+1,maquina+1,1,metrica,valor, dias,horas,minutos)
                            elif componente == 1:
                                valor = random.randint(1,16)
                                idComponente += 1
                                write_lines_dados(idComponente,componente+1,maquina+1,1,metrica, valor, dias,horas,minutos)
                            elif componente == 2:
                                valor = random.randint(0,100)
                                idComponente += 1
                                write_lines_dados(idComponente,componente+1,maquina+1,1,metrica, valor, dias,horas,minutos)

                


def main(): 
    delete_csv()
    main_maquinas()
    main_componentes()
    main_metricas()
    main_usuario()
    main_dados()

main()