var mongoose = require('mongoose')


var dbURI = 'mongodb+srv://nurshot:nurshot@mekanbul.h6341tl.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI);
mongoose.connection.on("connected", function(){
    console.log("Bağlandı");
});
mongoose.connection.on("error", function(){
    console.log("Error");
});
mongoose.connection.on("disconnected", function(){
    console.log("Disconnect");
});
process.on("SIGINT" ,function(){
    mongoose.connection.close();
    console.log("Close");
    process.exit(0);
});
require("./venue"); 

