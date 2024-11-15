import mongoose from 'mongoose'

let Schema = mongoose.Schema

let Zahtevzaregistraciju = new Schema({
    korisnicko_ime:{
        type:String
    },
    lozinka:{
        type:String
    },
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    adresa:{
        type:String
    },
    kontakt:{
        type:String
    },
    email:{
        type:String
    },
    status:{
        type:String
    },
    profilna_slika:{
        type:String
    }
})

export default mongoose.model('Zahtevzaregistraciju', Zahtevzaregistraciju, 'zahtevizaregistraciju')