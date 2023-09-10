import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './home/home.module'; // Importa HomePageModule en lugar de HomePage

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),


    AppRoutingModule,
    HomePageModule, // Agrega HomePageModule aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}