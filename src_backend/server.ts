import express, { Router } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user.routes';


const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017/ordinacija")
mongoose.connection.once('open', ()=>{
    console.log("db connected")
})

const router = Router();

app.use('/', router)

router.use('/user', userRouter)



app.listen(4000, () => console.log(`Express server running on port 4000`));