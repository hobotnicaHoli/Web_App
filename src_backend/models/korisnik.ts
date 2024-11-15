

import mongoose from 'mongoose'

let Schema = mongoose.Schema

let Korisnik = new Schema({
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
    tip:{
        type:String
    },
    broj_licence:{
        type:Number
    },
    specijalizacija:{
        type:String
    },
    ogranak:{
        type:String
    },
    profilna_slika:{
        type:String
    },
    usluge:{
        type:Array
    },
    pregledi:{
        type:Array
    },
    izvestaji:{
        type:Array
    }
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici')