import {Schema, model} from "mongoose";

const authScheme = new Schema({
    username: {type: String, default: '', trim: true},
    mail: {type: String, default: '', trim: true},
    password: {type: String, default: '', trim: true}
})

export const modelAuth = model('auth', authScheme)