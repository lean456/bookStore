//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
console.log(__dirname);
app.use(express.static(__dirname + '/dist/firebase'));
app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/firebase/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);