const {spawn} = require('child_process');
var https = require('node:https');
let jiraAccount = {
    "email": 'jvhengler@gmail.com',
    "passwd": 'q H 3 M E D m U 1 m U i U M p 2 Z o 5 9 7 0 3 E'.replaceAll(" ", "")
}

async function createIssueMain(req, res) {
    let userEmail = req.body.userEmail;
    let requestSummary = req.body.requestSummary;
    let requestDescription = req.body.requestDescription;

    let userId = await getUserId(userEmail);
    if (userId) {
        res.status(400).send("Usuário não encontrado!");
        return;
    }
    else if (requestSummary == undefined){
        res.status(400).send("O Título do chamado está undefined!");
        return;
    }
    else if (requestDescription == undefined){
        res.status(400).send("A descrição do chamado está undefined!");
        return;
    }
    
    issue = createIssue(userId, requestSummary, requestDescription);
    if (issue == 'Ticket criado com sucesso!') res.status(200).send("Chamado criado com sucesso!");
    else res.status(400).send("Erro ao criar chamado!");
}

async function getUserId(email) {
    let res = await request(`https://grupo-pardalis.atlassian.net/rest/api/3/user/search?query=${email}`);
    
    try {
        return res[0].accountId;
    } catch (err) {
        return undefined;
    }
}

async function createIssue(reporterId, summary, description) {
    const python = spawn('python', ['./src/controllers/jiraScript.py', summary, description, reporterId, jiraAccount.passwd]);
    python.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        console.log("Chamado feito na hora: " + data.toString());
        /* console.log(data); */
    });
    python.stderr.on('data', (data) => {
        console.log("Error: " + data);
        return data
    });
}

async function request(link) {
    return new Promise((resolve, reject) => {
        https.get(link, {
            auth: `${jiraAccount.email}:${jiraAccount.passwd}`,
            headers: {
                'Accept': 'application/json'
            }
        }, (resp) => {
            var data = '';
            resp.on('data', function (chunk) {
                data += chunk;
            });

            resp.on('end', function () {
                try {
                    resolve(JSON.parse(data));
                } catch (err) {  
                    console.log(err);
                    reject(err);
                }
            });
        });
    });
}

async function verifyEmail(req, res) {
    let email = req.body.email;
    console.log(email)
    let id = await getUserId(email);
    console.log(id)
    if (typeof id == 'string') res.status(200).json({'result': "Usuário encontrado!"});
    else res.status(400).json({'result': "Usuário não encontrado!"});
}

module.exports = {
    createIssueMain,
    verifyEmail
}


