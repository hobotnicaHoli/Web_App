import mongoose from 'mongoose'

let Schema = mongoose.Schema

let Pregled = new Schema({
  naziv:{
    type:String
  }  ,
  cena:{
    type:Number
  },
  trajanje:{
    type:Number
  },
  specijalizacija:{
    type:String
  },
  obrisan:{
    type:String
  }
})

export default mongoose.model('Pregled', Pregled, 'pregledi')