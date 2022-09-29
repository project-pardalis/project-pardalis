from datetime import datetime
import random
import mysql.connector as db

banco = db.connect(
  host="localhost",
  user="aluno",
  password="sptech",
  database="PARDALIS"
)

mycursor = banco.cursor()

sqlMetrica = "INSERT INTO Metrica VALUES(NULL,'porcentagemCpu','%',0),(NULL,'temperaturaCpu','°C',0),(NULL,'memoriaRam','GB',0),(NULL,'espacoDisco','GB',0)"
mycursor.execute(sqlMetrica)

sqlEmpresa = "INSERT INTO Empresa VALUES(NULL,'teste',12345678912345)"
mycursor.execute(sqlEmpresa)
sqlUsuario = "INSERT INTO Usuario VALUES(NULL,%s,%s,%s,%s,1,%s)"
sqlMaquina = "INSERT INTO Maquina VALUES(NULL,%s,%s,%s,%s,%s,1)"
sqlComponente = "INSERT INTO Componente VALUES(NULL,%s,1,%s,%s,1)"
sqlComponenteHasMetrica = "INSERT INTO Componente_has_Metrica VALUES(%s,%s,%s,%s)"
sqlDados = "INSERT INTO Leitura VALUES(NULL,%s,%s,%s,1,%s,%s)"

date = datetime.now()

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
        rand = random.randint(0,len(chars)-1)
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

def write_lines_comp(fkMaq,nome):
    val = (nome,'teste',fkMaq)
    mycursor.execute(sqlComponente,val)

def write_lines_met(fkComp,fkMaq,fkEmp,fkMet):
    val = (fkComp,fkMet,fkMaq,fkEmp)
    mycursor.execute(sqlComponenteHasMetrica,val)

def write_lines_user(fkAdm,nome,email,senha,cargo):
    val = (nome,email,senha,cargo,fkAdm)
    mycursor.execute(sqlUsuario,val)

def write_lines_dados(fkComp,fkMaq,fkEmp,fkMet,valor, data):
    val = (fkMet,fkComp,fkMaq,fkEmp,data,valor)
    mycursor.execute(sqlDados,val)

def get_componente(x):
    componentes = ["Cpu","Memoria Ram","Disco"]
    return componentes[x]

def main_usuario():
    ler = open("python/nomes.txt","r").read().split(",")
    cargoR = ["Operacional","Tecnico"]
    for i in range(20): 
        idUsuario = i+1
        fkEmpresa = 1
        rand = random.randint(0,len(ler))
        nome = ler[rand]
        email = f'{nome}@gmail.com'
        senha = gerar_hex(8) 
        cargoRandom = random.randint(0,100)
        if cargoRandom > 90:
            cargo = cargoR[0]
        else:
            cargo = cargoR[1]
       
        if i>1 : 
            fkAdm = None
        else:
            fkAdm = None
        write_lines_user(fkAdm,nome,email,senha,cargo)
        
def def_Adm(qtd):
    rand = random.randint(0,100)
    if rand > 80:
        return random.randint(0,qtd)
    else:
        return None

def main_maquinas():

    so = ["Linux", "Windows"]
    for i in range(1,51):
        idServer = i
        sistemaOp = so[sorteio("maquina")]
        hexCode = hex_append(sistemaOp)
        onCloud = random.randint(0,1)
        val = (hexCode,sistemaOp,onCloud,'2022-12-12 10:10:10',gerar_hex(10))
        mycursor.execute(sqlMaquina,val)

def main_componentes():
    compNum = 0
    fkMaquina = 0
    for i in range(150):
        if i % 3 == 0:
            fkMaquina+=1
        fkEmpresa = 1
        nome = get_componente(compNum)
        compNum+=1
        if compNum == 3:
            compNum = 0
        write_lines_comp(fkMaquina, nome)

def main_metricas():
    for maquina in range(50):
        for componente in range(2):
            if componente == 0:
                for i in range(2):
                    write_lines_met(componente+1,maquina,1,i+1)
            write_lines_met(componente+2,maquina,componente+3,1)

def main_dados():
    for mes in range(11):
        for dias in range(29):
            for horas in range(24):
                for minutos in range(60):
                    for segundos in range(60):
                        for maquina in range(50):
                            for componente in range(3):
                                if componente == 0:
                                    for i in range(2):
                                        valor = random.randint(20,100)
                                        write_lines_dados(componente+i+1, componente+1,maquina+1,1,format_date(mes+1, dias+1, horas, minutos, segundos), valor)
                                elif componente == 1:
                                    valor = random.randint(1,16)
                                    write_lines_dados(componente+2, componente+1,maquina+1,1, format_date(mes+1, dias+1, horas, minutos, segundos), valor)
                                elif componente == 2:              
                                    valor = random.randint(0,1000)
                                    write_lines_dados(componente+2, componente+1,maquina+1,1, format_date(mes+1, dias+1, horas, minutos, segundos), valor)

def main(): 
    main_usuario()
    main_maquinas()
    main_componentes()
    main_metricas()
    main_dados()

main()