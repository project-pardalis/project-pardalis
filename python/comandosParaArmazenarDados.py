import pymysql.cursors

connection = pymysql.connect(host='localhost',
                             user='xxxxxxx',
                             password='xxxxxx',
                             database='pardalis')

cursor = connection.cursor()

def run_sql_command(sql_command):
    return cursor.execute(sql_command)