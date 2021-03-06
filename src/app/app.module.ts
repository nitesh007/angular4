import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms'; 
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import 'hammerjs';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import {DishService} from './services/dish.service';
import {LeaderService} from './services/leader.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import {HttpModule} from '@angular/http';
import {baseURL} from './shared/baseurl';
import {ProcessHttpMsgService} from './services/process-http-msg.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [DishService,LeaderService,ProcessHttpMsgService,
  {provide:'BaseURL',useValue:'baseURL'}],
  entryComponents:[LoginComponent], 
  bootstrap: [AppComponent]
})
export class AppModule { }
