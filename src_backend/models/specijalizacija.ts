import mongoose from 'mongoose'

let Schema = mongoose.Schema

let Specijalizacija = new Schema({
    naziv:{
        type:String
    }
})

export default mongoose.model('Specijalizacija', Specijalizacija, 'specijalizacije')