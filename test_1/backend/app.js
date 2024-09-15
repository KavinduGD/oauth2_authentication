const express=require('express');
const request_router=require('./routes/request');
const oauth_router=require('./routes/oauth');
const dotenv=require('dotenv');
dotenv.config();

const app=express();

app.use('/request',request_router);
app.use('/oauth',oauth_router);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}
);


