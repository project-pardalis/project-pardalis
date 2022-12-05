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


f = open('logsMail.txt', 'a')


def getAllDatabaseChamadoTitle():
    global query
    instrucao = f"SELECT assuntoChamado, isAberto from Chamado;"
    query = db.run_sql_command(instrucao, True)
    return query


def getTextWordCloud():
    text = getAllDatabaseChamadoTitle()
    newTxt = ''
    whitelist = stop.stopwordsList()
    for i in range(len(text)):
        txtCompare = text[i]['assuntoChamado'].split(' ')
        for j in range(len(txtCompare)):
            for k in range(len(whitelist)):
                if (txtCompare[j] == whitelist[k]):
                    newTxt = newTxt + ' ' + txtCompare[j]
                    break
    print(newTxt)
    return newTxt


def plotWordCloud():
    summary = getTextWordCloud()

    wordcloud = WordCloud(
        background_color="white",
        width=1600, height=800).generate(summary)

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.imshow(wordcloud, interpolation='bilinear')
    ax.set_axis_off()
    plt.imshow(wordcloud)
    wordcloud.to_file("./../../site/public/assets/wordcloud.png")


def main():

    while True:
        plotWordCloud()
        time.sleep(10)


main()
