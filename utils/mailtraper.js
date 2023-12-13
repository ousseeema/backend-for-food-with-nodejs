const nodemailer = require('nodemailer')

const sendmail = async (options) =>{

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ed6990159e4dcc",
      pass: "86d8b94f6b7505"
    }
  });

  const  message ={
    from : "oussema@gmail.com",
    to : options.mailto,
    subject: options.subject,
    text : options.text
  }
   

  const info = await transport.sendMail(message)

}

module.exports= sendmail;