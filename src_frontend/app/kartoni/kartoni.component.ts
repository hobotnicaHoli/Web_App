import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Izvestaj from '../models/izvestaj';
import Korisnik from '../models/korisnik';
import Zakazanipregled from '../models/zakazanipregled';
import Pregled from '../models/pregled';

@Component({
  selector: 'app-kartoni',
  templateUrl: './kartoni.component.html',
  styleUrls: ['./kartoni.component.css']
})
export class KartoniComponent implements OnInit{

  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'lekar'){
      this.router.navigate([''])
    }
    this.userService.dohvatiKorisnika(localStorage.getItem("pacijent")).subscribe((k:Korisnik)=>{
      this.pacijent = k
      this.izvestaji = k.izvestaji;
      this.pacpregledi = k.pregledi;
//dohvatam sve usluge ovog lekara a onda unutar ovog pacijenta trazim zakazane preglede koji se poklapaju sa nazivima usluga ovog lekara
      this.userService.dohvatiKorisnika(localStorage.getItem("ulogovan")).subscribe((k1:Korisnik)=>{
        this.lekar = k1
        this.usluge = this.lekar.usluge
        this.usluge.forEach(u=>{
          this.pacpregledi.forEach(pr=>{
            if(pr.naziv == u.naziv && pr.izvestaj == "false"){
              pr.pacijent = this.pacijent.korisnicko_ime
              this.zakazanipregledipom.push(pr)
            }
          })
        })
        this.zakazanipregledipom.forEach(z=>{
          let trenutno = new Date()
          let p = z.datum.toString().split("-")
          let dan = (Number)(p[0])
          let mesec = (Number)(p[1])
          let godina = (Number)(p[2])
          let v = z.vreme.toString().split(":")
                let sat = (Number)(v[0])
                let minut = (Number)(v[1])
                let dantrenutni = trenutno.getDate()
                let mesectrenutni = trenutno.getMonth() + 1
                let godinatrenutna = trenutno.getFullYear()
                let sattrenutni = trenutno.getHours()
                let minuttrenutni = trenutno.getMinutes()
                if(godinatrenutna > godina){
                  this.zakazanipregledi.push(z)
                }
                if(godinatrenutna == godina){
                  if(mesectrenutni > mesec){
                    this.zakazanipregledi.push(z)
                  }
                  if(mesectrenutni == mesec){
                    if(dantrenutni > dan){
                      this.zakazanipregledi.push(z)
                    }
                    if(dantrenutni == dan){
                      if(sattrenutni > sat){
                        this.zakazanipregledi.push(z)
                      }
                      if(sattrenutni == sat){
                        if(minuttrenutni >= minut){
                          this.zakazanipregledi.push(z)
                        }
                      }
                    }
                  }
                }
              })
      })
      
    })
    
  }
  pacpregledi:Zakazanipregled[]
  usluge:Pregled[]
  lekar:Korisnik
  zakazanipregledipom:Zakazanipregled[]=[]
  zakazanipregledi:Zakazanipregled[] = []
  izvestaji:Izvestaj[] = []
  pacijent:Korisnik

  unesiizvestaj(z:Zakazanipregled){
    localStorage.setItem("pacijentizvestaj", this.pacijent.korisnicko_ime)
    localStorage.setItem("datumizvestaj", z.datum.toString())
    localStorage.setItem("vremeizvestaj", z.vreme.toString())
    this.userService.izvestajTrue(this.pacijent.korisnicko_ime, z.naziv, z.datum.toString(), z.vreme.toString()).subscribe()  
    this.router.navigate(['unosenje_izvestaja'])
    
  }

}
