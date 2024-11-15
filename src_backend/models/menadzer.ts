import mongoose from 'mongoose'

let Schema = mongoose.Schema

let Menadzer = new Schema({
    korisnicko_ime:{
        type:String
    },
    lozinka:{
        type:String
    }
})

export default mongoose.model('Menadzer', Menadzer, 'menadzeri')