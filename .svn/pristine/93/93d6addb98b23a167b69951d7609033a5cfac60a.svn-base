var fs = require("fs");

exports.listener =  function(request, response){
	
	fs.readFile("./views/fail2.html", "utf-8", function(error, data){
		response.send(data);
	});
}
