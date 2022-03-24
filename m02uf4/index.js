#!/usr/bin/node
let http = require("http");
let mongo_client = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;

let url = "mongodb://localhost/";
let db;
let fs = require("fs");
console.log("Iniciando Script mongo_http");

mongo_client.connect(url, function(error,conn){
	console.log("Estas dentro de Mongo");
	if (error){
		console.log("ERROR");
		return;
	}
	db = conn.db("tffhd");
});

function send_data_list(db, req, res) {
	let col= "";

	if (req.url == "/characters") {
    	col = "characters";
    }
    else if (req.url == "/items") {
        col = "items";
    }
    else { res.end(); return; }

    let col_data = db.collection(col).find({},{projection: { name:1 } });

    col_data.toArray(function(err, data) {
    	let string = JSON.stringify(data);

         res.end(string);
     });
}

http.createServer(function(req, res) {
	res.writeHead(200);

	let url = req.url.split("/");

	if (req.url == "/") {
		fs.readFile("index.html",function(err, data){
			res.writeHead(200, {"Content-Type":"text/html"});
			res.end(data);
		});
		return;
	}
	
	if(url.length == 2) {
		send_data_list(db, req, res);
		return;
	}

	else{
		if (url[2].length != 24) {
			res.end(); 
			return;
		}

		if (url[1] == "characters") {
			let obj_id = new ObjectId(url[2]);
			let col_data = db.collection("characters").find({"_id":obj_id},{projection: {_id:1, name:1} });
		
			col_data.toArray(function(err, data){
				let string = JSON.stringify(data);
				res.end(string);
			});	
		}
		else if (url[1] == "items") {
			let obj_id = new ObjectId(url[2]);
			let col_data = db.collection("items").find({"_id":obj_id},{projection: {_id:1, name:1} });
		
			col_data.toArray(function(err, data){
				let string = JSON.stringify(data);
				res.end(string);
			});
		}
	}

}).listen(1200);ehffhd");

mongo_client.connect(url, function(error, conn){
	console.log("Dentro de MongoDB");
	
	if (error){
		console.log("error!!!");
		return;
	}
	

	db = conn.db("tffhd");

	
});

function send_data_list(db, request, response){

	if (request.url == "/characters")
		col = "characters";
	else if (request.url == "/items")
		col = "items";
	else{
		response.end();
		return;
	}




}


http.createServer(function (request, response){
	response.writeHead(200);

	if(request.url == "/"){
		fs.readFile("index.html", function (err, data){
			response.writeHead(200, {"Content-type":"text/html"});
			response.end(data);

		});
		return;
	}

	let col = "";

	let url = request.url.split("/");
	console.log(url);
	if (url.length == 2){
		send_data_list(db, request, response);
	}else{

		if(url[2].length != 24){
			response.end();
			return;
		}

		if (url[1] == "characters"){

			let obj_id = new ObjectId(url[2]);	
			let col_data = db.collection("characters").find({"_id":obj_id});

			col_data.toArray(function(err, data){
				let string = JSON.stringify(data);
				response.end(string);
	
			});	
		}else if (url[1] == "items"){
			let obj_id = new ObjectId(url[2]);
			let col_data = db.collection("items").find({"_id":obj_id});

			col_data.toArray(function(err, data){
				let string = JSON.stringify(data);
				response.end(string);
	
			});	
		}
	}

}).listen(1095);
