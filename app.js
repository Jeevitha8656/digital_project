const express = require('express');
const cors=require('cors');
const router=require('./Router/routes.js');
const app=express();
app.set('view engine','ejs');
app.set('views','./views');
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:true}));   

app.use('/',router)


module.exports = app;
// app.listen(8080,()=>{  // listen to port 3000
//     console.log('Server is running on port 8080');
// }); 