import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri="http://localhost:4000/user"

  dohvatiLekare(){
    let data = {}
    return this.http.post(`${this.uri}/dohvatiLekare`, data)
  }

  dohvatiPacijente(){
    let data = {}
    return this.http.post(`${this.uri}/dohvatiPacijente`, data)
  }

  dohvatiZahteve(){
    let data = {}
    return this.http.post(`${this.uri}/dohvatiZahteve`, data)
  }

  dohvatiKorisnika(username:string){
    let data = {
      username:username
    }
    return this.http.post(`${this.uri}/dohvatiKorisnika`, data)
  }

  promeniLozinku(username:string, nova:string){
    let data = {
      username:username,
      nova:nova
    }
    return this.http.post(`${this.uri}/promeniLozinku`, data)
  }
  login(username:string, password:string, tip:string){
    let data = {
      username:username,
      password:password,
      tip:tip
    }
    return this.http.post(`${this.uri}/login`, data)
  }

  pretraga(ime:string, prezime:string, specijalizacija:string, ogranak:string){
    let data = {
      ime:ime,
      prezime:prezime,
      specijalizacija:specijalizacija,
      ogranak:ogranak
    }

    return this.http.post(`${this.uri}/pretraga`, data)
  }

  registrovanje(korisnicko_ime:string, lozinka:string, ime:string, prezime:string, adresa:string, kontakt:string, email:string, picture:string){
    let data = {
      korisnicko_ime:korisnicko_ime,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      kontakt:kontakt,
      email:email,
      picture:picture
    }
    return this.http.post(`${this.uri}/registrovanje`, data)
  }

  azurirajPodatke(korisnicko_ime:string,ime:string,prezime:string,kontakt:string,adresa:string,email:string, slika:string){
    let data = {
      ime:ime,
      prezime:prezime,
      kontakt:kontakt,
      adresa:adresa,
      email:email,
      korisnicko_ime:korisnicko_ime,
      slika:slika
    }


    return this.http.post(`${this.uri}/azurirajPodatke`,data)
  }
  azurirajLekara(korisnicko_ime:string, ime:string, prezime:string, adresa:string, kontakt:string, broj_licence:number, specijalizacija:string, slika:string){
    let data = {
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      kontakt:kontakt,
      broj_licence:broj_licence,
      specijalizacija:specijalizacija,
      slika:slika,
      korisnicko_ime:korisnicko_ime
    }
    return this.http.post(`${this.uri}/azurirajLekara`, data)
  }

  dohvatiSvePreglede(specijalizacija:string){
    let data = {
      specijalizacija:specijalizacija
    }
    return this.http.post(`${this.uri}/dohvatiSvePreglede`, data)
  }

  dodajPregledLekaru(username:string, naziv:string, trajanje:number, cena:number){
    let data = {
      username:username,
      naziv:naziv,
      trajanje:trajanje,
      cena:cena
    }
    return this.http.post(`${this.uri}/dodajPregledLekaru`, data)
  }

  dodajZahtevMenadzeru(specijalizacija:string, naziv:string, cena:number, trajanje:number){
    let data = {
      specijalizacija:specijalizacija,
      naziv:naziv,
      cena:cena,
      trajanje:trajanje
    }
    return this.http.post(`${this.uri}/dodajZahtevMenadzeru`, data)
  }

  otkaziPregledLekaru(username:string, naziv:string, trajanje:number, cena:number){
    let data = {
      username:username,
      naziv:naziv,
      trajanje:trajanje,
      cena:cena
    }
    return this.http.post(`${this.uri}/otkaziPregledLekaru`, data)
  }
  //this.userService.azurirajPregledLekaru(l.korisnicko_ime, u.naziv, u.cena, u.trajanje).subscribe()

  azurirajPregledLekaru(username:string,nazivpomocni:string, naziv:string, cena:number, trajanje:number){
    let data = {
      username:username,
      nazivpomocni:nazivpomocni,
      naziv:naziv,
      trajanje:trajanje,
      cena:cena
    }
    return this.http.post(`${this.uri}/azurirajPregledLekaru`, data)
  }

  otkazivanjeZakazanogPregleda(pacijent:string, naziv:string, datum:Date, vreme:Date){
    let data = {
      pacijent:pacijent,
      naziv:naziv,
      datum:datum, 
      vreme:vreme
    }
    return this.http.post(`${this.uri}/otkazivanjeZakazanogPregleda`, data)
  }

  brisanjeKorisnika(username:string){
    let data = {
      username:username
    }
    return this.http.post(`${this.uri}/brisanjeKorisnika`, data)
  }
 

  dodajLekara(username:string, lozinka:string, ime:string, prezime:string, adresa:string, kontakt:string, email:string, broj_licence:number, specijalizacija:string, ogranak:string, slika:string){
    let data = {
      username:username,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      adresa:adresa,
      kontakt:kontakt,
      email:email,
      broj_licence:broj_licence,
      specijalizacija:specijalizacija,
      ogranak:ogranak,
      slika:slika
    }
    return this.http.post(`${this.uri}/dodajLekara`, data)
  }

  //this.userService.promeniStatusZahtevu(zahtev.korisnicko_ime).subscribe()
    //this.userService.dodajKorisnika(zahtev.korisnicko_ime, zahtev.lozinka, zahtev.ime, zahtev.prezime, zahtev.adresa, zahtev.kontakt, zahtev.email, zahtev.profilna_slika).subscribe()
    promeniStatusZahtevu(username:string, status:string){
      let data = {
        username:username,
        status:status
      }
      return this.http.post(`${this.uri}/promeniStatusZahtevu`, data)
    }

    dodajKorisnika(username:string, lozinka:string, ime:string, prezime:string, adresa:string, kontakt:string, email:string, profilna_slika:string){
      let data = {
        username:username,
        lozinka:lozinka,
        ime:ime,
        prezime:prezime,
        adresa:adresa,
        kontakt:kontakt,
        email:email,
        profilna_slika:profilna_slika
      }
      return this.http.post(`${this.uri}/dodajKorisnika`, data)
    }

    dohvatiZahtevezap(){
      let data = {}
      return this.http.post(`${this.uri}/dohvatiZahtevezap`, data)
    }

    dodajPregled(naziv:string, cena:number, trajanje:number, specijalizacija:string){
      let data = {
        naziv:naziv,
        cena:cena,
        trajanje:trajanje,
        specijalizacija:specijalizacija
      }
      return this.http.post(`${this.uri}/dodajPregled`, data)
    }

    izbrisiZahtev(naziv:string){
      let data = {
        naziv:naziv
      }
      return this.http.post(`${this.uri}/izbrisiZahtev`, data)
    }

    loginMenadzera(username:string, password:string){
      let data = {
        username:username,
        password:password
      }
      return this.http.post(`${this.uri}/loginMenadzera`, data)
    }

    dohvatiMenadzere(){
      let data = {}
      return this.http.post(`${this.uri}/dohvatiMenadzere`, data)
    }

    dohvatiSpecijalizacije(){
      let data = {}
      return this.http.post(`${this.uri}/dohvatiSpecijalizacije`, data)
    }

    dodajSpec(naziv:string){
      let data = {
        naziv:naziv
      }
      return this.http.post(`${this.uri}/dodajSpec`, data)
    }

    brisanjePregleda(naziv:string){
      let data = {
        naziv:naziv
      }
      return this.http.post(`${this.uri}/brisanjePregleda`, data)
    }

    dohvPregled(naziv:string){
      let data = {
        naziv:naziv
      }
      return this.http.post(`${this.uri}/dohvPregled`, data)
    }

    azurirajPregled(stari:string, naziv:string, cena:number, trajanje:number, specijalizacija:string){
      let data = {
        stari:stari,
        naziv:naziv,
        cena:cena,
        trajanje:trajanje,
        specijalizacija:specijalizacija
      }
      return this.http.post(`${this.uri}/azurirajPregled`, data)
    }

    promeniLozinkuMenadzeru(username:string, lozinka:string){
      let data = {
        username:username,
        lozinka:lozinka
      }
      return this.http.post(`${this.uri}/promeniLozinkuMenadzeru`, data)
    }

    dohvatiMenadzera(username:string){
      let data = {
        username:username
      }
      return this.http.post(`${this.uri}/dohvatiMenadzera`, data)
    }

    zakaziPregled(username:string, naziv:string, datum:string, vreme:string){
      let data = {
        username:username,
        naziv:naziv,
        datum:datum,
        vreme:vreme
      }
      return this.http.post(`${this.uri}/zakaziPregled`, data)
    }

    //this.userService.izvestajTrue(this.pacijent.korisnicko_ime, z.naziv, z.datum, z.vreme).subscribe()
    izvestajTrue(username:string, naziv:string, datum:string, vreme:string){
      let data = {
        username:username,
        naziv:naziv,
        datum:datum,
        vreme:vreme
      }
      return this.http.post(`${this.uri}/izvestajTrue`, data)
    }

    //this.userService.unosenjeIzvestaja(this.pacijent, this.datum, this.vreme, this.lekar, this.specijalizacija, this.razlog, this.dijagnoza, this.terapija, datumn).subscribe()
    unosenjeIzvestaja(username:string, datum:string, vreme:string, lekar:string, specijalizacija:string, razlog:string, dijagnoza:string, terapija:string, datumn:string){
      let data = {
        username:username,
        datum:datum,
        vreme:vreme,
        lekar:lekar,
        specijalizacija:specijalizacija,
        razlog:razlog,
        dijagnoza:dijagnoza,
        terapija:terapija,
        datumn:datumn
      }
      return this.http.post(`${this.uri}/unosenjeIzvestaja`, data)
    }
  }
