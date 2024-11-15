import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Korisnik from '../models/korisnik';
import Zakazanipregled from '../models/zakazanipregled';
import Pregled from '../models/pregled';

@Component({
  selector: 'app-lekar.pregledi',
  templateUrl: './lekar.pregledi.component.html',
  styleUrls: ['./lekar.pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit{
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'lekar'){
      this.router.navigate([''])
    }
    this.userService.dohvatiPacijente().subscribe((p:Korisnik[])=>{
      this.pacijenti = p;
      this.userService.dohvatiKorisnika(localStorage.getItem("ulogovan")).subscribe((k:Korisnik)=>{
        this.lekar = k;
        this.usluge = this.lekar.usluge
        this.usluge.forEach(u=>{
            this.pacijenti.forEach(pa=>{
              this.pacpregledi = pa.pregledi
              this.pacpregledi.forEach(pr=>{
                if(pr.naziv == u.naziv){
                  pr.pacijent = pa.korisnicko_ime
                  this.zakazanipregledipom.push(pr);
                }
              })
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
            if(godinatrenutna < godina){
              this.zakazanipregledipom2.push(z)
            }
            if(godinatrenutna == godina){
              if(mesectrenutni < mesec){
                this.zakazanipregledipom2.push(z)
              }
              if(mesectrenutni == mesec){
                if(dantrenutni < dan){
                  this.zakazanipregledipom2.push(z)
                }
                if(dantrenutni == dan){
                  if(sattrenutni < sat){
                    this.zakazanipregledipom2.push(z)
                  }
                  if(sattrenutni == sat){
                    if(minuttrenutni <= minut){
                      this.zakazanipregledipom2.push(z)
                    }
                  }
                }
              }
            }
          })
          this.zakazanipregledipom2.sort((a, b)=>{
            let r = -1
            let datum1 = a.datum.toString().split("-")
            let vreme1 = a.vreme.toString().split(":")
            let datum2 = b.datum.toString().split("-")
            let vreme2 = b.vreme.toString().split(":")
            let d1 = (Number)(datum1[0])
            let m1 = (Number)(datum1[1])
            let g1 = (Number)(datum1[2])
            let s1 = (Number)(vreme1[0])
            let min1 = (Number)(vreme1[1])
            let d2 = (Number)(datum2[0])
            let m2 = (Number)(datum2[1])
            let g2 = (Number)(datum2[2])
            let s2 = (Number)(vreme2[0])
            let min2 = (Number)(vreme2[1])
            if(g1 > g2){
              r = 1
            }
            if(g1 == g2){
              if(m1 > m2){
                r = 1
              }
              if(m1 == m2){
                if(d1 > d2){
                  r = 1
                }
                if(d1 == d2){
                  if(s1 > s2){
                    r = 1
                  }
                  if(s1 == s2){
                    if(min1 >= min2){
                      r = 1
                    }
                  }
                }
              }
            }
            return r
          })
          if(this.zakazanipregledipom2[0] != null){
            this.zakazanipregledi.push(this.zakazanipregledipom2[0])
          }
          if(this.zakazanipregledipom2[1] != null){
            this.zakazanipregledi.push(this.zakazanipregledipom2[1])
          }
          if(this.zakazanipregledipom2[2] != null){
            this.zakazanipregledi.push(this.zakazanipregledipom2[2])
          }

      })
    })

    
  }

  constructor(private router:Router, private userService:UserService){}

  zakazanipregledipom2:Zakazanipregled[]=[]
  usluge: Array<Pregled>
  lekar:Korisnik
  pacijenti:Array<Korisnik>
  zakazanipregledipom:Zakazanipregled[]=[]
  zakazanipregledi:Zakazanipregled[] = []
  pacpregledi:Array<Zakazanipregled>

  otvorikarton(pregled:Zakazanipregled){
    localStorage.setItem("pacijent", pregled.pacijent);
    this.router.navigate(['kartoni']);
  }

  odjava(){
    localStorage.removeItem("ulogovan");
    sessionStorage.removeItem("tip");
    this.router.navigate(['login'])
  }
}
