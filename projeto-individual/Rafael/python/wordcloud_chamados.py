import pymssql
import pymysql
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import data_base_connection as db
import stop
import time
import smtplib
import email
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# host = 'smtp.mailtrap.io'
# port = 3005
# login = 'a3bc091e0f0d958d6180a67f3c2a4bf9'
# password = 'Teste@123'


# sender_email = "Private Person <from@smtp.mailtrap.io>"
# receiver_email = "psykocontato@gmail.com"
# message = MIMEMultipart("alternative")
# message["Subject"] = "multipart test"
# message["From"] = sender_email
# message["To"] = receiver_email
# # send your email
# print("vai chegar no with")
# with smtplib.SMTP("smtp.mailtrap.io", port) as server:
#     print('no with')
#     server.login(login, password)
#     server.sendmail(
#         sender_email, receiver_email, message.as_string()
#     )
# print('Sent')

f = open('logsMail.txt', 'a')


def getAllDatabaseChamadoTitle():
    global query
    instrucao = f"SELECT assuntoChamado, isAberto from Chamado;"
    query = db.run_sql_command(instrucao, True)
    return query


def getTextWordCloud():
    text = getAllDatabaseChamadoTitle()
    newTxt = []
    for i in range(len(text)):
        if (not (text[i]['isAberto'] == 0)):
            newTxt.append(text[i])

    print(text)
    wordCloudTxt = ''
    wordCloudTxt += " ".join(str(txt['assuntoChamado']) for txt in newTxt)
    return wordCloudTxt


def plotWordCloud():
    summary = getTextWordCloud()
    stopwords = stop.stopwordsList()
    wordcloud = WordCloud(stopwords=stopwords,
                          background_color="white",
                          width=1600, height=800).generate(summary)

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.imshow(wordcloud, interpolation='bilinear')
    ax.set_axis_off()
    plt.imshow(wordcloud)
    wordcloud.to_file("../site/public/assets/wordcloud.png")


def main():

    while True:
        plotWordCloud()
        time.sleep(10)


main()
