var sessoes = [];
var jiraApi = require('jira-client');
var https = require('node:https');
let jiraAccount = {
    "email": 'jvhengler@gmail.com',
    "passwd": '2gL2PdfLQcYFkvBF8Fas2019'
}


async function createIssue(req, res) {
    let userEmail = req.body.userEmail;

    
    let userId = await getUserId(userEmail);
    console.log(userId);

}

async function getUserId(email) {
    let res = await request(`https://grupo-pardalis.atlassian.net/rest/api/3/user/search?query=${email}`, https.get);
    return res[0].accountId;
}

/* async function createIssue() {
    await request("https://grupo-pardalis.atlassian.net/rest/api/3/issue", https.post)
} */

async function request(link, functionToExecute) {
    console.log("Acessando o link: " + link)
    
    return new Promise((resolve, reject) => {
        functionToExecute(link, {
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

module.exports = {
    createIssue
}


