import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';

//app configuration
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());

//initializing routings
app.use("/api/song",songRouter);

app.get("/",(req,res)=>{
    res.send("ApI working");
});

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})
