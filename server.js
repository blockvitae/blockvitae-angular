// @Refernce: https://medium.com/@hellotunmbi/how-to-deploy-angular-application-to-heroku-1d56e09c5147
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular'));

app.get('*', function(req,res) {
    
res.sendFile(path.join(__dirname +'/dist/angular/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);