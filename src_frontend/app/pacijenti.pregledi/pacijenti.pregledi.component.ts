import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import Zakazanipregled from '../models/zakazanipregled';
import Korisnik from '../models/korisnik';
import Pregled from '../models/pregled';
import Izvestaj from '../models/izvestaj';

@Component({
  selector: 'app-pacijenti.pregledi',
  templateUrl: './pacijenti.pregledi.component.html',
  styleUrls: ['./pacijenti.pregledi.component.css']
})
export class PacijentiPreglediComponent implements OnInit{

  constructor(private router:Router, private userService:UserService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("tip") != 'pacijent'){
      this.router.navigate([''])
    }
    this.userService.dohvatiKorisnika(localStorage.getItem("ulogovan")).subscribe((k:Korisnik)=>{
      k.izvestaji.forEach(i=>{
        let trenutno = new Date()
        let p = i.datum.toString().split("-")
        let dan = (Number)(p[0])
        let mesec = (Number)(p[1])
        let godina = (Number)(p[2])
        let v = i.vreme.toString().split(":")
        let sat = (Number)(v[0])
        let minut = (Number)(v[1])
        let dantrenutni = trenutno.getDate()
        let mesectrenutni = trenutno.getMonth() + 1
        let godinatrenutna = trenutno.getFullYear()
        let sattrenutni = trenutno.getHours()
        let minuttrenutni = trenutno.getMinutes()
        if(godinatrenutna > godina){
          this.izvestaji.push(i)
        }
        if(godinatrenutna == godina){
          if(mesectrenutni > mesec){
            this.izvestaji.push(i)
          }
          if(mesectrenutni == mesec){
            if(dantrenutni > dan){
              this.izvestaji.push(i)
            }
            if(dantrenutni == dan){
              if(sattrenutni > sat){
                this.izvestaji.push(i)
              }
              if(sattrenutni == sat){
                if(minuttrenutni >= minut){
                  this.izvestaji.push(i)
                }
              }
            }
          }
        }
          
        
      })
      this.izvestaji.sort((a, b)=>{
        let r = -1
        let datum1 = a.datum.toString().split("-")
        let datum2 = b.datum.toString().split("-")
        let vreme1 = a.vreme.toString().split(":")
        let vreme2 = b.vreme.toString().split(":")
        let d1 = (Number)(datum1[0])
        let m1 =(Number)(datum1[1])
        let g1 = (Number)(datum1[2])
        let d2 = (Number)(datum2[0])
        let m2 = (Number)(datum2[1])
        let g2 = (Number)(datum2[2])
        let s1 = (Number)(vreme1[0])
        let min1 = (Number)(vreme1[1])
        let s2 = (Number)(vreme2[0])
        let min2 = (Number)(vreme2[1])
        if(g1 < g2){
          r = 1
        }
        if(g1 == g2){
          if(m1 < m2){
            r = 1
          }
          if(m1 == m2){
            if(d1 < d2){
              r = 1
            }
            if(d1 == d2){
              if(s1 < s2){
                r = 1
              }
              if(s1 == s2){
                if(min1 <= min2){
                  r = 1
                }
              }
            }
          }
        }
        return r
      }
      )
      this.pacijent = k.korisnicko_ime;
      k.pregledi.forEach(p=>{
        let trenutno = new Date()
        let p1 = p.datum.toString().split("-")
        let dan = (Number)(p1[0])
        let mesec = (Number)(p1[1])
        let godina = (Number)(p1[2])
        let v = p.vreme.toString().split(":")
        let sat = (Number)(v[0])
        let minut = (Number)(v[1])
        let dantrenutni = trenutno.getDate()
        let mesectrenutni = trenutno.getMonth() + 1
        let godinatrenutna = trenutno.getFullYear()
        let sattrenutni = trenutno.getHours()
        let minuttrenutni = trenutno.getMinutes()
        if(godinatrenutna < godina){
          this.zakazanipregledi.push(p)
        }
        if(godinatrenutna == godina){
          if(mesectrenutni < mesec){
            this.zakazanipregledi.push(p)
          }
          if(mesectrenutni == mesec){
            if(dantrenutni < dan){
              this.zakazanipregledi.push(p)
            }
            if(dantrenutni == dan){
              if(sattrenutni < sat){
                this.zakazanipregledi.push(p)
              }
              if(sattrenutni == sat){
                if(minuttrenutni <= minut){
                  this.zakazanipregledi.push(p)
                }
              }
            }
          }
        }

      })
      this.zakazanipregledi.sort((a, b)=>{
        let r = -1
        let datum1 = a.datum.toString().split("-")
        let datum2 = b.datum.toString().split("-")
        let vreme1 = a.vreme.toString().split(":")
        let vreme2 = b.vreme.toString().split(":")
        let d1 = (Number)(datum1[0])
        let m1 =(Number)(datum1[1])
        let g1 = (Number)(datum1[2])
        let d2 = (Number)(datum2[0])
        let m2 = (Number)(datum2[1])
        let g2 = (Number)(datum2[2])
        let s1 = (Number)(vreme1[0])
        let min1 = (Number)(vreme1[1])
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
      //this.zakazanipregledi = k.pregledi
      this.zakazanipregledi.forEach(z=>{
        
        
        this.userService.dohvPregled(z.naziv).subscribe((p:Pregled)=>{
          let kraj = new Date();
          z.trajanje = p.trajanje
          let z1 = z.vreme.toString().split(":");
          let m = (+z1[0])*60 + (+z1[1]);
          let m1 = m + p.trajanje
          let h = m1/60
          let min = m1%60
          kraj.setMinutes(min)
          kraj.setHours(h)
          z.vremepomoc = new Date()
          z.vremepomoc.setMinutes(m%60)
          z.vremepomoc.setHours(m/60)

          //alert(kraj)
          z.kraj = kraj
          
        })
        this.userService.dohvatiLekare().subscribe((l:Korisnik[])=>{
          this.lekari = l;
          this.lekari.forEach(e => {
            e.usluge.forEach(u=>{
              if(z.naziv == u.naziv){
                z.lekar = e.ime + " " + e.prezime
                z.ogranak = e.ogranak
              }
            })
          });
        }
        )

      })


    })
  }

  zakazanipregledi:Zakazanipregled[] = []
  lekari:Array<Korisnik>
  pregledi:Array<Pregled>
  izvestaji:Izvestaj[] = []
  pacijent:string = "";

  otkazivanje(pregled:Zakazanipregled){
    this.userService.otkazivanjeZakazanogPregleda(this.pacijent, pregled.naziv, pregled.datum, pregled.vreme).subscribe();
    window.location.reload();
  }

  odjava(){
    localStorage.removeItem("ulogovan");
    sessionStorage.removeItem("tip");
    this.router.navigate(['login'])
  }

}
