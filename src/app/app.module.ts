import { SliderTopTenComponent } from './../components/slider-top-ten/slider-top-ten.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { SearchComponent } from '../components/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { StoreComponent } from '../components/store/store.component';
import { ProductComponent } from '../components/product/product.component';
import { ProductService } from 'src/services/product.service';
import { StoreService } from 'src/services/store.service';
import { LoginComponent } from 'src/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog'
import { AuthService } from 'src/services/auth.service';
import { CartComponent } from '../components/cart/cart.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
<<<<<<< HEAD
import { AccountComponent } from '../components/account/account.component';
=======
import { CategoryDropComponent } from 'src/components/category-drop/category-drop.component';
>>>>>>> 448d7fcd9303b12175607cb7929edc5b5aa5a442

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    StoreComponent,
    ProductComponent,
    LoginComponent,
    CartComponent,
    SliderTopTenComponent,
<<<<<<< HEAD
    AccountComponent
=======
    CategoryDropComponent
>>>>>>> 448d7fcd9303b12175607cb7929edc5b5aa5a442
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    CarouselModule
  ],
  providers: [ProductService,StoreService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
