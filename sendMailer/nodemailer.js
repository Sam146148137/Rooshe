const nodemailer = require ('nodemailer');
const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'rooshe@mail.ru',
            pass: 'NodeMailer99'
        }
    },
    {
        from: 'Rooshe <rooshe@mail.ru>',
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer