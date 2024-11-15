import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LekarComponent } from './lekar/lekar.component';
import { PacijentComponent } from './pacijent/pacijent.component';
import { LoginmenadzeraComponent } from './loginmenadzera/loginmenadzera.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PromenalozinkeComponent } from './promenalozinke/promenalozinke.component';
import { PacijentLekariComponent } from './pacijent.lekari/pacijent.lekari.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PocetnaComponent,
    LekarComponent,
    PacijentComponent,
    LoginmenadzeraComponent,
    RegistracijaComponent,
    PromenalozinkeComponent,
    PacijentLekariComponent,
    StranicalekaraComponent,
    PacijentiPreglediComponent,
    LekarPreglediComponent,
    KartoniComponent,
    LekarRaznoComponent,
    MenadzerComponent,
    MenadzerAzuriranjeComponent,
    MenadzerAzuriranjepacijentaComponent,
    DodavanjelekaraComponent,
    ZahteviComponent,
    AzuriranjepregledaComponent,
    PromenalozinkemenadzerComponent,
    UnosenjeIzvestajaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
