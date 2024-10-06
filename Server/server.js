const express=require("express")
const app=express()
const PORT=5000

app.get('/',(req,res)=>{
    res.status(200).json("WELCOME TO SERVER")
})
app.listen(PORT,()=>{
    console.log(`Server Listening to port  http://localhost:${PORT}`);
    
})