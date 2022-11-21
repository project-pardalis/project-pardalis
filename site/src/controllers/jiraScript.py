import sys
from jira import JIRA

jira_options = {
    'server': "https://grupo-pardalis.atlassian.net"
}

jira = JIRA(
    options=jira_options,
    basic_auth=('jvhengler@gmail.com', sys.argv[4])
)


try:
    jira.create_issue({
        'project': {'key': 'PP'},
        'summary': sys.argv[1],
        'description': sys.argv[2],
        'issuetype': {'id': '10003'},
        'reporter': {'id': sys.argv[3]}
    })
    print("Ticket criado com sucesso!")
except: 
    print("Erro ao criar issue")