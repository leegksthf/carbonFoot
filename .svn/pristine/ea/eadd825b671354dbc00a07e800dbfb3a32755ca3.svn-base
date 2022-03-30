var fs = require("fs");

exports.listener =  function(request, response){
	
	fs.readFile("./views/fail.html", "utf-8", function(error, data){
		response.send(data);
	});
}
