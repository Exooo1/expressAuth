import token from 'jsonwebtoken'
import Router from 'express'
import {modelAuth} from "./authScheme";
import bcrypt from 'bcrypt'

export const rout = Router()
export const test = Router()
const jwt = token

rout.use('/auth', (req, res, next) => {
    next()
})

rout.post('/auth/registration', async (req, res) => {
    try {
        const {username, password} = req.body
        console.log(username, password)
        const user = await modelAuth.findOne({username})
        if (user) res.status(400).json({message: 'You are auth'})
        const hashPassword = bcrypt.hashSync(password, 7)
        const auth = new modelAuth({username, password: hashPassword, mail: 'vlasikMaskalenchik1998@gmail.coom'})
        await auth.save()
        res.json({message: auth})
    } catch (err) {
        res.status(500).send(err)
    }
})
rout.post('/auth/login', async (req, res) => {
    try {
        const {username, password} = req.body
        const auth = await modelAuth.findOne({username})
        if (!auth) res.json({message: 'You aren\'t auth'})
        const validPassword = bcrypt.compareSync(password, auth.password)
        if (!validPassword) res.json({message: "it's bad"})
        const tk = jwt.sign({_id: auth._id}, 'secret', {expiresIn: '24h'})
        res.json({token: tk})
    } catch (err) {
    }
})

test.use((req, res, next) => {
    if (req.method === 'OPTIONS') next()
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) res.status(404).send('Bad!')
        const decor = jwt.verify(token, 'secret')
        console.log(decor)
        // @ts-ignore
        req.userId = decor._id
        next()
    } catch (err) {
        res.json({message: 'not found'})
    }
})


