import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';
import Pregled from '../models/pregled';
import { Time } from '@angular/common';
import Zakazanipregled from '../models/zakazanipregled';

@Component({
  selector: 'app-stranicalekara',
  templateUrl: './stranicalekara.component.html',
  styleUrls: ['./stranicalekara.component.css']
})
export class StranicalekaraComponent implements OnInit{

  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'pacijent'){
      this.router.navigate([''])
    }
    this.userService.dohvatiKorisnika(localStorage.getItem("lekar")).subscribe((l:Korisnik)=>{
      this.lekar = l;
      this.userService.dohvatiSvePreglede(this.lekar.specijalizacija).subscribe((pr:Pregled[])=>{
        this.pregledi = pr;
        l.usluge.forEach(lu=>{
          this.pregledi.forEach(pre=>{
            if(pre.naziv == lu.naziv){
              this.usluge.push(lu)
            }
          })
            
        })
      })
      
      this.usluge.forEach(u=>{
        this.userService.dohvatiPacijente().subscribe((p:Korisnik[])=>{
          this.pacijenti = p
          this.pacijenti.forEach(pa=>{
            this.pacpregledi = pa.pregledi
            this.pacpregledi.forEach(pr=>{
              if(pr.naziv == u.naziv){
                pr.pacijent = pa.korisnicko_ime
                this.zakazanipregledi.push(pr);
              }
            })
          })
          this.zakazanipregledi.forEach(z=>{
            this.userService.dohvPregled(z.naziv).subscribe((p:Pregled)=>{
              z.trajanje = p.trajanje

            })
          })
        })
      })
    })
  }

  pregledi:Pregled[] = []
  usluge:Pregled[] = []
  pregled:string = "";
  datum:Date;
  datum1:string = "";
  vreme:Date;
  vreme1:string;
  poruka:string = "";
  poruka1:string = "";
  lekar:Korisnik;
  vremepomoc:Date
  kraj:Date
  pacijenti:Array<Korisnik>
  //sa ovim ispod uporedjujes?
  zakazanipregledi:Zakazanipregled[] = []
  pacpregledi:Array<Zakazanipregled>
  zdatum:Date
  pdatum:Date
  mesec:number
  dan:number
  godina:number
  mesecs:string;
  dans:string;
  godinas:string;

  zakazivanje(){
    this.poruka = ""
    this.poruka1 = ""
    if(this.pregled == ""){
      this.poruka1 = "Niste uneli pregled."
      return
    }
    this.userService.dohvPregled(this.pregled).subscribe((p1:Pregled)=>{
      //krajnje vreme ovoga sto ja zelim da zakazem
      this.kraj = new Date();
      let z1 = this.vreme.toString().split(":");
      console.log(z1[0])
      console.log(z1[1])
      let m = (+z1[0])*60 + (+z1[1]);
      console.log(m)
      let m1 = m + p1.trajanje
      console.log(m1)
      let h = m1/60
      let min = m1%60
      this.kraj.setMinutes(min)
      this.kraj.setHours(h)
      console.log(this.kraj)
      //pocetno vreme ovoga sto ja zelim da zakazem
      this.vremepomoc = new Date()
      this.vremepomoc.setMinutes(m%60)
      this.vremepomoc.setHours(m/60)
      console.log(this.vremepomoc)
      this.zdatum = new Date(this.datum)
      this.mesec = this.zdatum.getMonth() + 1
      console.log(this.mesec)
      this.dan = this.zdatum.getDate()
      console.log(this.dan)
      if(this.mesec < 10){
        this.mesecs = "0" + this.mesec.toString()
      }
      else this.mesecs = this.mesec.toString()
      if(this.dan < 10){
        this.dans = "0" + this.dan.toString()
      }
      else this.dans = this.dan.toString()

      this.godina = this.zdatum.getFullYear()
      this.godinas = this.zdatum.getFullYear().toString()

      this.zakazanipregledi.forEach(z=>{
        let p = z.datum.toString().split("-");
        let day = (Number)(p[0])
        let month = (Number)(p[1])
        let year = (Number)(p[2])
    
      if(this.godina == year && this.mesec == month && this.dan == day){
        this.poruka1 == "Usao u isti datum."
        alert('Usao')
          //sad dohvatam ovaj neki zakazani sto se poklapa vremenski sa ovim sto ja zelim da zakazem
          z.kraj = new Date();
          let z2 = z.vreme.toString().split(":");
          let m2 = (+z2[0])*60 + (+z2[1]);
          console.log(m2);
          let m3 = m2 + z.trajanje
          let h2 = m3/60
          let min2 = m3%60
          z.kraj.setMinutes(min2)
          z.kraj.setHours(h2)
          //pocetno vreme ovoga sto ja zelim da zakazem
          z.vremepomoc = new Date()
          z.vremepomoc.setMinutes(m2%60)
          z.vremepomoc.setHours(m2/60)
            if((this.vremepomoc.getTime() <= z.vremepomoc.getTime() && this.kraj.getTime() >= z.vremepomoc.getTime()) || (this.vremepomoc.getTime() >= z.vremepomoc.getTime() && this.kraj.getTime() <= z.kraj.getTime()) || (this.vremepomoc.getTime() <=z.kraj.getTime() && this.kraj.getTime() >= z.kraj.getTime()) || (this.vremepomoc.getTime() <= z.vremepomoc.getTime() && this.kraj.getTime() >= z.kraj.getTime())){
              this.poruka = "Lekar je zauzet u to vreme."
              return;
            }
      }
    })
    if(this.poruka == ""){
      this.poruka = "Uspesno ste zakazali pregled!";
      this.datum1 = this.datum.toString()
      this.vreme1 = this.vreme.toString()
      this.userService.zakaziPregled(localStorage.getItem("ulogovan"), this.pregled, this.datum1, this.vreme1).subscribe();
      }
  })
    
  }


}
