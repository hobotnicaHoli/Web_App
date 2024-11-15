import mongoose from 'mongoose'

let Schema = mongoose.Schema

let Zahtevzapregled = new Schema({
    naziv:{
        type:String
    },
    cena:{
        type:Number
    },
    trajanje:{
        type:Number
    },
    specijalizacija:{
        type:String
    },

})

export default mongoose.model('Zahtevzapregled', Zahtevzapregled, 'zahtevizapregled')