import tkinter
import tkinter.messagebox
import customtkinter
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os
import time
from locust import HttpUser, task, between
from email.message import EmailMessage
import ssl
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

customtkinter.set_appearance_mode("Dark") 
customtkinter.set_default_color_theme("blue")


#graficos



def comecarTeste():

   alvoHost=(porta.get())
   qtdUsuarios=int(usuarios.get())
   spawnRate=int(spawn.get())
   tempoExec=int(exec.get())
   tempoInat=int(inat.get())

   if(qtdUsuarios is None or qtdUsuarios<=0):
        print("Erro - Quantidade de usuários inválida")

   elif(spawnRate is None or spawnRate<=0):
        print("Erro - Não há taxa de Spawn")

   elif(alvoHost is None):
        print("Erro - Sem host")

   elif(tempoExec > 600 or tempoExec <=0):
        print("Tempo inválido, favor inserir novo tempo")

   elif(tempoInat > 100 or tempoInat <=0):
        print("Tempo inválido, favor inserir novo tempo")

   else:
        os.system("locust -f locustfile.py --host %s --csv=example --headless -u %d -r %.2f --run-time %d --stop-timeout %d" %(alvoHost,qtdUsuarios,spawnRate,tempoExec,tempoInat))



data = pd.read_csv('example_stats_history.csv', header = None, prefix="var", skiprows=[0])

def executarGraficoUsuarios():
    plt.plot(data.var1, label='Usuários')

    plt.xlabel('Tempo em segundos',fontsize=10)
    plt.title('Gráfico', fontsize=18)
    plt.legend()
    plt.show()

def executarGraficoRequisicoes():

    plt.plot(data.var18, label='Total de Falhas', color='red')
    plt.plot(data.var17, label='Total de Requisições', color='green')
    
    plt.xlabel('Tempo em segundos', fontsize=10)
    plt.title('Gráfico', fontsize=18)

    plt.legend()
    plt.show()

def executarGraficoRequisicoesSegundo():
    plt.plot(data.var5, label='Falhas por segundo', color='orange')
    plt.plot(data.var4, label='Requisições por segundo', color='cyan')

    plt.xlabel('Tempo em segundos', fontsize=10)
    plt.title('Gráfico', fontsize=18)

    plt.legend()
    plt.show()


app = customtkinter.CTk()

app.title("Pardalis®")
app.geometry(f"{870}x{350}")

app.grid_columnconfigure((0, 1, 2), weight=1)
app.grid_rowconfigure((0, 1, 2), weight=1)



def enviarEmail():
    destinatario = customtkinter.CTkInputDialog(text="Email do destinatário:", title="Envio de email")

    destinatario = destinatario.get_input()
    remetente = 'xxxxxxxxxxxxx'
    senha = 'xxxxxxxxxxxxxxx'
    assunto = 'Teste de máquina'
    
    body = f"""
    Segue os arquivos do teste de máquina/servidor realizados.
    """
    #objeto mime

    em = MIMEMultipart()
    em['From'] = remetente
    em['To'] = destinatario
    em['Subject'] = assunto
    #em.set_content(body)

    #context = ssl.create_default_context()

    #with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        #smtp.login(remetente,senha)
        #smtp.sendmail(remetente, destinatario, em)

    em.attach(MIMEText(body, 'plain'))
    filename1 = "example_stats_history.csv"

    attachment1= open(filename1, 'rb')  # r de ler e b de binario abre no python como binario

        #base 64
    attachment_package1 = MIMEBase('application', 'octet-stream')
    attachment_package1.set_payload((attachment1).read())
    encoders.encode_base64(attachment_package1)
    attachment_package1.add_header('Content-Disposition', "attachment; filename= " + filename1)
    em.attach(attachment_package1)

    filename2 = "example_stats.csv"
    attachment2= open(filename2, 'rb')


    attachment_package2 = MIMEBase('application', 'octet-stream')
    attachment_package2.set_payload((attachment2).read())
    encoders.encode_base64(attachment_package2)
    attachment_package2.add_header('Content-Disposition', "attachment; filename= " + filename2)
    em.attach(attachment_package2)

    filename3 = "example_failures.csv"
    attachment3= open(filename3, 'rb')


    attachment_package3 = MIMEBase('application', 'octet-stream')
    attachment_package3.set_payload((attachment3).read())
    encoders.encode_base64(attachment_package3)
    attachment_package3.add_header('Content-Disposition', "attachment; filename= " + filename3)
    em.attach(attachment_package3)

    filename4 = "example_exceptions.csv"
    attachment4= open(filename4, 'rb')


    attachment_package4 = MIMEBase('application', 'octet-stream')
    attachment_package4.set_payload((attachment4).read())
    encoders.encode_base64(attachment_package4)
    attachment_package4.add_header('Content-Disposition', "attachment; filename= " + filename4)
    em.attach(attachment_package4)

    
#conversão para string

    texto = em.as_string()

        # Conexão server
        
    conex_server = smtplib.SMTP('smtp.gmail.com', 587)
    conex_server.starttls()
    conex_server.login(remetente, senha)

    conex_server.sendmail(remetente, destinatario, texto)

    # fechar porta
    conex_server.quit()

logo_Pardalis = customtkinter.CTkLabel(master=app, text="Bem vindo ao\n Teste de Servidor \nPardalis", font=customtkinter.CTkFont(size=20, weight="bold"))
logo_Pardalis.grid(row=0, column=0,rowspan=2, padx=(20, 20), pady=(20, 20))


usuarios = customtkinter.CTkEntry(master=app, placeholder_text="Quantidade de usuários")
usuarios.grid(row=4, column=0, columnspan=1, padx=(10, 10), pady=(20, 20), sticky="nsew")


spawn = customtkinter.CTkEntry(master=app, placeholder_text="Taxa de spawn")
spawn.grid(row=4, column=1, columnspan=1, padx=(10, 10), pady=(20, 20), sticky="nsew")

porta = customtkinter.CTkEntry(master=app, placeholder_text="Porta alvo")
porta.grid(row=4, column=2, columnspan=1, padx=(10, 10), pady=(20, 20), sticky="nsew")


exec = customtkinter.CTkEntry(master=app, placeholder_text="Tempo de execução")
exec.grid(row=5, column=0, columnspan=1, padx=(10, 10), pady=(20, 20), sticky="nsew")

inat = customtkinter.CTkEntry(master=app, placeholder_text="Tempo de encerramento por inatividade")
inat.grid(row=5, column=1, columnspan=1, padx=(10, 10), pady=(20, 20), sticky="nsew")

botao_executar = customtkinter.CTkButton(master=app, fg_color="green", border_width=2, text="Começar teste", text_color=("gray10", "#DCE4EE"),command=comecarTeste)
botao_executar.grid(row=5, column=2, padx=(20, 10), pady=(20, 20), sticky="nsew")

instrucoes = customtkinter.CTkTextbox(master=app, width=250)
instrucoes.grid(row=0, column=1, rowspan=4,padx=(20, 0), pady=(20, 0), sticky="nsew")


instrucoes.insert("0.0", "Instruções\n\n" + "Preencha os campos a baixo com as demais requisições para iniciar o teste. \n\n O tempo de execução é necessário ser em segundos e há um limite de 10 minutos.\n\n O tempo de inatividade tem um máximo de 100 segundos\n\nAo lado se encontram gráficos de requisições, usuários e etc.\n\n Para enviar um email abra o campo de email.")


tabBotoes = customtkinter.CTkTabview(master=app, width=250)
tabBotoes.grid(row=0, column=2, rowspan=4,padx=(20, 20), pady=(20, 0), sticky="nsew")
tabBotoes.add("Gráficos")
tabBotoes.tab("Gráficos").grid_columnconfigure(0, weight=1)

botaoGraficos_1 = customtkinter.CTkButton(tabBotoes.tab("Gráficos"), fg_color="transparent", border_width=2, text="Usuários", text_color=("gray10", "#DCE4EE") ,command=executarGraficoUsuarios)
botaoGraficos_1.grid(row=0, column=0, padx=20, pady=(10, 10))

botaoGraficos_2 = customtkinter.CTkButton(tabBotoes.tab("Gráficos"), fg_color="transparent", border_width=2, text="Requisições", text_color=("gray10", "#DCE4EE") ,command=executarGraficoRequisicoes)
botaoGraficos_2.grid(row=1, column=0, padx=20, pady=(10, 10))

botaoGraficos_3 = customtkinter.CTkButton(tabBotoes.tab("Gráficos"), fg_color="transparent", border_width=2, text="Requisições por s/", text_color=("gray10", "#DCE4EE") ,command=executarGraficoRequisicoesSegundo)
botaoGraficos_3.grid(row=2, column=0, padx=20, pady=(10, 10))

botao_enviar_email = customtkinter.CTkButton(master=app, text="Enviar email com arquivos",
                                                           command=enviarEmail)
botao_enviar_email.grid(row=2, column=0, padx=20, pady=(10, 10))



app.mainloop()