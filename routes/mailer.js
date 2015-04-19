var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'latelloise.conserve@gmail.com',
        pass: 'qgrdnqvelyjqlidj'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


exports.envoyerMail = function(mailOptions) {
	// var mailOptions = {
	//     from: 'Fred Foo ✔ <soft.pcmax@gmail.com>', // sender address
	//     to: 'kawael09@gmail.com', // list of receivers, baz@blurdybloop.com
	//     subject: 'Hello ✔', // Subject line
	//     text: 'Hello world ✔', // plaintext body
	//     html: '<b>Hello world ✔</b>' // html body
	// };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
};
// send mail with defined transport object
