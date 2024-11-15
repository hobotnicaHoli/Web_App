import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LoginComponent } from './login/login.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LekarComponent } from './lekar/lekar.component';
import { LoginmenadzeraComponent } from './loginmenadzera/loginmenadzera.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { PacijentLekariComponent } from './pacijent.lekari/pacijent.lekari.component';
import { startWith } from 'rxjs';
import { StranicalekaraComponent } from './stranicalekara/stranicalekara.component';
import { PacijentiPreglediComponent } from './pacijenti.pregledi/pacijenti.pregledi.component';
import { LekarPreglediComponent } from './lekar.pregledi/lekar.pregledi.component';
import { KartoniComponent } from './kartoni/kartoni.component';
import { LekarRaznoComponent } from './lekar.razno/lekar.razno.component';
import { MenadzerComponent } from './menadzer/menadzer.component';
import { MenadzerAzuriranjeComponent } from './menadzer.azuriranje/menadzer.azuriranje.component';
import { MenadzerAzuriranjepacijentaComponent } from './menadzer.azuriranjepacijenta/menadzer.azuriranjepacijenta.component';
import { DodavanjelekaraComponent } from './dodavanjelekara/dodavanjelekara.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';
import { AzuriranjepregledaComponent } from './azuriranjepregleda/azuriranjepregleda.component';
import { PromenalozinkemenadzerComponent } from './promenalozinkemenadzer/promenalozinkemenadzer.component';
import { UnosenjeIzvestajaComponent } from './unosenje-izvestaja/unosenje-izvestaja.component';

const routes: Routes = [
  {path:"", component:PocetnaComponent},
  {path:"login", component:LoginComponent},
  {path:"pacijent", component:PacijentComponent},
  {path:"lekar", component:LekarComponent},
  {path:"loginmenadzera", component:LoginmenadzeraComponent},
  {path:"registracija", component:RegistracijaComponent},
  {path:"promenalozinke", component:PromenalozinkeComponent},
  {path:"pacijent.lekari", component:PacijentLekariComponent},
  {path:"stranicalekara", component:StranicalekaraComponent},
  {path:"pacijenti.pregledi", component:PacijentiPreglediComponent},
  {path:"lekar.pregledi", component:LekarPreglediComponent},
  {path:"kartoni", component:KartoniComponent},
  {path:"lekar.razno", component:LekarRaznoComponent},
  {path:"menadzer", component:MenadzerComponent},
  {path:"menadzer.azuriranje", component:MenadzerAzuriranjeComponent},
  {path:"menadzer.azuriranjepacijenta", component:MenadzerAzuriranjepacijentaComponent},
  {path:"dodavanjelekara", component:DodavanjelekaraComponent},
  {path:"zahtevi", component:ZahteviComponent},
  {path:"azuriranjepregleda", component:AzuriranjepregledaComponent},
  {path:"promenalozinkemenadzer", component:PromenalozinkemenadzerComponent},
  {path:"unosenje_izvestaja",component:UnosenjeIzvestajaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
