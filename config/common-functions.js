require('dotenv').config();
const transporter = require('./email')

transporter.verify(function(error, success) {
	if (error) {
	  	console.log(error);
	} else {
	  	console.log(getDateTime()+": Server is ready to take our messages");
	}
});

function sendEmail(mailOptions, callback){
	if(!mailOptions){
		console.log(getDateTime()+":--------------- NO LLEGO OPCIONES DE MAIL --------------------\n")
		callback(true, "No se recibio el parametro mailOptions")
	}else{
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(getDateTime()+":-------------- ERROR AL ENVIAR EL MENSAJE ------------------\n")
                console.log(error)
                transporter.close();
				return callback(true, error)
			}else{
				console.log(getDateTime()+":-------------------- MENSAJE ENVIADO -----------------------\n")
                console.log(info.response)
                transporter.close();
				return callback(false, info.response);
			}
		})
	}
}

function getDateTime(){
	var date = new Date()
	var hour = date.getHours()
	var min = date.getMinutes()
	var sec = date.getSeconds()
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	month = (month < 10 ? "0" : "") + month
	var day = date.getDate()
	day = (day < 10 ? "0" : "") + day
	return year  + '-' + month + '-' + day + ' ' + hour + '-' + min + '-' + sec
}
//---------------------------------------------------------

module.exports = {
    "getDateTime": getDateTime,
    "sendEmail" : sendEmail  
}