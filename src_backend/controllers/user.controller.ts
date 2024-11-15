import express from 'express'
import korisnik from '../models/korisnik'
import pregled from '../models/pregled'
import zahtevzaregistraciju from '../models/zahtevzaregistraciju'
import menadzer from '../models/menadzer'
import zahtevzapregled from '../models/zahtevzapregled'
import specijalizacija from '../models/specijalizacija'

export default class UserController{

    dohvatiLekare = (req:express.Request, res:express.Response)=>{
        korisnik.find({'tip':'lekar'}, (err, lekari)=>{
            if(err) console.log(err)
            else res.json(lekari)
        })
    }

    dohvatiPacijente = (req:express.Request, res:express.Response)=>{
        korisnik.find({'tip':'pacijent'}, (err, p)=>{
            if(err) console.log(err)
            else res.json(p)
        })
    }

    dohvatiZahteve = (req:express.Request, res:express.Response)=>{
        zahtevzaregistraciju.find({}, (err, z)=>{
            if(err) console.log(err)
            else res.json(z)
        })
    }

    login = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let password = req.body.password
        let tip = req.body.tip
        korisnik.findOne({'korisnicko_ime':username, 'lozinka':password, 'tip':tip}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })
    }

    dohvatiKorisnika = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        korisnik.findOne({'korisnicko_ime':username}, (err, user)=>{
            if(err) console.log(err)
            else res.json(user)
        })
    }

    promeniLozinku = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let nova = req.body.nova
        korisnik.collection.updateOne({'korisnicko_ime':username}, {$set:{'lozinka':nova}})
    }

    promeniLozinkuMenadzeru = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let lozinka = req.body.lozinka

        menadzer.collection.updateOne({'korisnicko_ime':username}, {$set:{'lozinka':lozinka}})
    }

    pretraga = (req:express.Request, res:express.Response)=>{
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let specijalizacija = req.body.specijalizacija;
        let ogranak = req.body.ogranak;

        korisnik.find({'ime':{$regex:ime}, 'prezime':{$regex:prezime}, 'specijalizacija':{$regex:specijalizacija}, 'ogranak':{$regex:ogranak}}, (err, dr)=>{
            if(err) console.log(err)
            else res.json(dr)
        })
    }

    registrovanje = (req:express.Request, res:express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let kontakt = req.body.kontakt;
        let email = req.body.email;
        let picture = req.body.picture;

        zahtevzaregistraciju.collection.insertOne({'korisnicko_ime':korisnicko_ime, 'lozinka':lozinka, 'ime':ime, 'prezime':prezime, 'adresa':adresa, 'kontakt':kontakt, 'email':email, 'status':'naCekanju', 'profilna_slika':picture})
    }

    azurirajPodatke = (req:express.Request,res:express.Response)=>{

        let ime = req.body.ime
        let prezime = req.body.prezime
        let kontakt = req.body.kontakt
        let email = req.body.email
        let adresa = req.body.adresa
        let korisnicko_ime = req.body.korisnicko_ime
        let slika = req.body.slika

        korisnik.collection.updateOne({'korisnicko_ime':korisnicko_ime},{$set:{'ime':ime,'prezime':prezime,'kontakt':kontakt,'email':email,'adresa':adresa, 'profilna_slika':slika}})


    }
    azurirajLekara = (req:express.Request,res:express.Response)=>{

        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let kontakt = req.body.kontakt
        let broj_licence = req.body.broj_licence
        let specijalizacija = req.body.specijalizacija
        let korisnicko_ime = req.body.korisnicko_ime
        let slika = req.body.slika

        korisnik.collection.updateOne({'korisnicko_ime':korisnicko_ime},{$set:{'ime':ime,'prezime':prezime,'kontakt':kontakt,'adresa':adresa,'broj_licence':broj_licence, 'specijalizacija':specijalizacija, 'profilna_slika':slika}})


    }

    dohvatiSvePreglede = (req:express.Request, res:express.Response)=>{
        let specijalizacija = req.body.specijalizacija

        pregled.find({'specijalizacija':specijalizacija}, (err, p)=>{
            if(err) console.log(err)
            else res.json(p)
        })
    }

    dodajPregledLekaru = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let naziv = req.body.naziv
        let trajanje = req.body.trajanje
        let cena = req.body.cena

        korisnik.collection.updateOne({'korisnicko_ime':username}, {$push:{'usluge': {'naziv':naziv, 'trajanje':trajanje, 'cena':cena}}})
    }

    otkaziPregledLekaru = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let naziv = req.body.naziv
        let trajanje = req.body.trajanje
        let cena = req.body.cena

        korisnik.collection.updateOne({'korisnicko_ime':username}, {$pull:{'usluge': {'naziv':naziv, 'trajanje':trajanje, 'cena':cena}}})
    }

    dodajZahtevMenadzeru = (req:express.Request, res:express.Response)=>{
        let specijalizacija = req.body.specijalizacija
        let naziv = req.body.naziv
        let cena = req.body.cena
        let trajanje = req.body.trajanje

        zahtevzapregled.collection.insertOne({'specijalizacija':specijalizacija, 'naziv':naziv, 'cena':cena, 'trajanje':trajanje})
    }

    otkazivanjeZakazanogPregleda = (req:express.Request, res:express.Response)=>{
        let pacijent = req.body.pacijent
        let naziv = req.body.naziv
        let datum = req.body.datum
        let vreme = req.body.vreme

        korisnik.collection.updateOne({'korisnicko_ime':pacijent}, {$pull:{'pregledi': {'naziv':naziv, 'datum':datum, 'vreme':vreme}}})
    }

    brisanjeKorisnika = (req:express.Request, res:express.Response)=>{
        let username = req.body.username

        korisnik.collection.deleteOne({'korisnicko_ime':username})
    }
    // this.userService.dodajLekara(this.korisnicko_ime, this.lozinka, this.ime, this.prezime, this.adresa, this.kontakt, this.email, this.broj_licence, this.specijalizacija, this.ogranak, this.slika).subscribe();

    dodajLekara = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let lozinka = req.body.lozinka
        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let kontakt = req.body.kontakt
        let email = req.body.email
        let broj_licence = req.body.broj_licence
        let specijalizacija = req.body.specijalizacija
        let ogranak = req.body.ogranak
        let slika = req.body.slika

        korisnik.collection.insertOne({'korisnicko_ime':username, 'lozinka':lozinka, 'ime':ime,'prezime':prezime,'adresa':adresa,'kontakt':kontakt,'email':email,'broj_licence':broj_licence,'specijalizacija':specijalizacija,'ogranak':ogranak, 'profilna_slika':slika,'tip':'lekar','usluge':Array})
    }

    //this.userService.promeniStatusZahtevu(zahtev.korisnicko_ime, status).subscribe()
  //  this.userService.dodajKorisnika(zahtev.korisnicko_ime, zahtev.lozinka, zahtev.ime, zahtev.prezime, zahtev.adresa, zahtev.kontakt, zahtev.email, zahtev.profilna_slika).subscribe()

    promeniStatusZahtevu = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let status= req.body.status

        zahtevzaregistraciju.collection.updateOne({'korisnicko_ime':username}, {$set:{'status':status}})
    }

    dodajKorisnika = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let lozinka = req.body.lozinka
        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let kontakt = req.body.kontakt
        let email = req.body.email
        let profilna_slika = req.body.profilna_slika

        korisnik.collection.insertOne({'korisnicko_ime':username, 'lozinka':lozinka,'ime':ime,'prezime':prezime,'adresa':adresa,'kontakt':kontakt,'email':email,'profilna_slika':profilna_slika,'tip':'pacijent','pregledi':Array,'izvestaji':Array})
    }

    dohvatiZahtevezap = (req:express.Request, res:express.Response)=>{
        zahtevzapregled.find({}, (err, z)=>{
            if(err) console.log(err)
            else res.json(z)
        })
    }

    izbrisiZahtev = (req:express.Request, res:express.Response)=>{
        let naziv = req.body.naziv
        zahtevzapregled.collection.deleteOne({'naziv':naziv})
    }

    dodajPregled = (req:express.Request, res:express.Response)=>{
        let naziv = req.body.naziv
        let cena = req.body.cena
        let trajanje = req.body.trajanje
        let specijalizacija = req.body.specijalizacija

        pregled.collection.insertOne({'naziv':naziv, 'cena':cena, 'trajanje':trajanje, 'specijalizacija':specijalizacija})
    }

    loginMenadzera = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let password = req.body.password

        menadzer.findOne({'korisnicko_ime':username, 'lozinka':password}, (err, m)=>{
            if(err) console.log(err)
            else res.json(m);
        })
    }

    dohvatiMenadzere = (req:express.Request, res:express.Response)=>{

        menadzer.find({}, (err, m)=>{
            if(err) console.log(err)
            else res.json(m)
        })
    }

    dohvatiSpecijalizacije = (req:express.Request, res:express.Response)=>{

        specijalizacija.find({}, (err, s)=>{
            if(err) console.log(err)
            else res.json(s)
        })
    }

    dodajSpec = (req:express.Request, res:express.Response)=>{
        let naziv = req.body.naziv

        specijalizacija.collection.insertOne({'naziv':naziv})
    }

    brisanjePregleda = (req:express.Request, res:express.Response)=>{
        let naziv = req.body.naziv

        pregled.collection.deleteOne({'naziv':naziv})
    }

    dohvPregled = (req:express.Request, res:express.Response)=>{
        let naziv = req.body.naziv

        pregled.findOne({'naziv':naziv}, (err, p)=>{
            if(err) console.log(err)
            else res.json(p)
        })
    }

    azurirajPregled = (req:express.Request, res:express.Response)=>{
        let stari = req.body.stari
        let naziv = req.body.naziv
        let cena = req.body.cena
        let trajanje = req.body.trajanje
        let specijalizacija = req.body.specijalizacija

        pregled.collection.updateOne({'naziv':stari},{$set:{'naziv':naziv, 'cena':cena, 'trajanje':trajanje, 'specijalizacija':specijalizacija}})
    }

    dohvatiMenadzera = (req:express.Request, res:express.Response)=>{
        let username = req.body.username

        menadzer.findOne({'korisnicko_ime':username}, (err, m)=>{
            if(err) console.log(err)
            else res.json(m)
        })
    }

    zakaziPregled = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let naziv = req.body.naziv
        let datum = req.body.datum
        let vreme = req.body.vreme
        let pom = new Date(datum)
        let str = ""
        if(pom.getMonth() < 9){
            if(pom.getDate() < 10){
                str = "0" + pom.getDate() + "-0" + (pom.getMonth() + 1) + "-" + pom.getFullYear()
            }
            else{
                str = pom.getDate() + "-0" + (pom.getMonth() + 1) + "-" + pom.getFullYear()
            }
        }
        else{
            if(pom.getDate() < 10){
                str = "0" + pom.getDate() + "-" + (pom.getMonth() + 1) + "-" + pom.getFullYear()
            }
            else{
                str = pom.getDate() + "-" + (pom.getMonth() + 1) + "-" + pom.getFullYear()
            }
        }


        
        korisnik.collection.updateOne({'korisnicko_ime':username}, {$push:{'pregledi':{'naziv':naziv, 'datum':str, 'vreme':vreme, 'izvestaj':'false'}}})
    }

    //this.userService.izvestajTrue(this.pacijent.korisnicko_ime, z.naziv, z.datum, z.vreme).subscribe()

    izvestajTrue = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let naziv = req.body.naziv
        let datum = req.body.datum
        let vreme = req.body.vreme

        korisnik.collection.updateOne({'korisnicko_ime':username}, {
            $set:{
                'pregledi.$[pregled].izvestaj':'true'
            }
            },
            {
                arrayFilters: [{'pregled.naziv':naziv,'pregled.datum':datum, 'pregled.vreme':vreme}]
        });
    }

      //this.userService.azurirajPregledLekaru(l.korisnicko_ime, u.naziv, u.cena, u.trajanje).subscribe()
      azurirajPregledLekaru = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let naziv = req.body.naziv
        let nazivpomocni = req.body.nazivpomocni
        let cena = req.body.cena
        let trajanje = req.body.trajanje

        korisnik.collection.updateOne({'korisnicko_ime':username}, {
            $set:{
                'usluge.$[usluga].naziv':naziv,
                'usluge.${usluga].cena':cena,
                'usluge.$[usluga].trajanje':trajanje
            }
            },
            {
                arrayFilters:[{'usluga.naziv':nazivpomocni}]
        });

      }

    //this.userService.unosenjeIzvestaja(this.pacijent, this.datum, this.vreme, this.lekar, this.specijalizacija, this.razlog, this.dijagnoza, this.terapija, datumn).subscribe()
    unosenjeIzvestaja = (req:express.Request, res:express.Response)=>{
        let username = req.body.username
        let datum = req.body.datum
        let vreme = req.body.vreme
        let lekar = req.body.lekar
        let specijalizacija = req.body.specijalizacija
        let razlog = req.body.razlog
        let dijagnoza = req.body.dijagnoza
        let terapija = req.body.terapija
        let datumn = req.body.datumn
        let pom = new Date(datumn)
        let str = ""
        if(pom.getMonth() < 9){
            if(pom.getDate() < 10){
                str = "0" + pom.getDate() + "-0" + (pom.getMonth() + 1) + "-" + pom.getFullYear()
            }
            else{
                str = pom.getDate() + "-0" + (pom.getMonth() + 1) + "-" + pom.getFullYear()
            }
        }
        else{
            if(pom.getDate() < 10){
                str = "0" + pom.getDate() + "-" + (pom.getMonth() + 1) + "-" + pom.getFullYear()
            }
            else{
                str = pom.getDate() + "-" + (pom.getMonth() + 1) + "-" + pom.getFullYear()
            }
        }
        korisnik.collection.updateOne({'korisnicko_ime':username}, {$push:{'izvestaji':{'datum':datum,'vreme':vreme,'lekar':lekar,'specijalizacija':specijalizacija,'razlog':razlog,'dijagnoza':dijagnoza,'terapija':terapija,'datum_narednog':str}}})
    }

}