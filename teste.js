var twilio = require('twilio');



var client = new twilio('AC1ccce9715f2886' + 'c2e80b664720ddd672', 'efbbc732d5a7ef3561' + '49edf69e43350c');




  client.messages.create({
    to: '+5511986823796',
    from: '+15044144347',
    body: 'Setor/CPU em estado preocupante!!!!!!!'
  });