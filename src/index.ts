import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import {rout, test} from "./auth";

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
const start = async () => {
    try {
        await mongoose.connect('SECRET', {useNewUrlParser: true})
        app.listen(8080, () => console.log('Start!'));
    } catch (err) {

        throw new Error('Server don\'t work...' + err)
    }
}
start()