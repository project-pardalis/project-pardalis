var twilio = require('twilio');


function enviarSMS(req, res) {

  var client = new twilio('AC1ccce9715f2886c2e80b664720ddd672', 'af1358ec330093c6f420aeccb1cf6aae');




  client.messages.create({
    to: '+5511986823796',
    from: '+15044144347',
    body: 'Setor/CPU em estado preocupante!!!!!!!'
  });



}

module.exports = {
  enviarSMS
}