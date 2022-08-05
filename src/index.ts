import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import cron from 'node-cron'
import {rout, test} from "./auth";
import {modelAuth} from "./authScheme";

const app = express()
app.use(express.json())
app.use(cors({}))
app.use(rout)
app.use(test)
app.use('/', (req, res, next) => {
    // @ts-ignore
    console.log(req.userId)
    res.send('Hi, Auth is Here')
})

// cron.schedule('0,30 * * * * *', async () => {
//     await modelAuth.deleteOne({_id: '62ed5644a019a71cf44eefb0'})
//     console.log('running a task every minute');
// });
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Exooo1:Exoool20101234@cluster0.ejj7k.mongodb.net/petProject', {useNewUrlParser: true})
        app.listen(8080, () => console.log('Start!'));
    } catch (err) {

        throw new Error('Server don\'t work...' + err)
    }
}
start()