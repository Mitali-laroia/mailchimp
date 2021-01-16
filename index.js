const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        'members': [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ],
    }

    var jsonData = JSON.stringify(data);

    console.log(firstName,lastName,email);

    var options = {
        url:'https://us2.api.mailchimp.com/2.0/lists/112ca23e3c',
        method: 'POST',
        headers:{
            'Authorization' : "04042001mitali@gmail.com 16f1853dd4c9f62df769a573bd38b4bb-us2"
        },
        body : jsonData
    }

    request(options, function(error, response, body){
        if(error){
            console.log(error);
            res.sendFile(__dirname + "/failure.html");
        }
        else{
            if(response.statusCode == 200){
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});

app.post("/failure.html", function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server is running");
});

//API  16f1853dd4c9f62df769a573bd38b4bb-us2
//list id 112ca23e3c