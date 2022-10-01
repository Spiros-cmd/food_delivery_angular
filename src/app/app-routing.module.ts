import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/components/cart/cart.component';
import { HomeComponent } from 'src/components/home/home.component';
import { LoginComponent } from 'src/components/login/login.component';
import { ProductComponent } from 'src/components/product/product.component';
import { StoreComponent } from 'src/components/store/store.component';
import { AuthGuard } from 'src/services/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'search/:searchItem',component:StoreComponent},
  {path:'Store',component:StoreComponent},
  {path:'Product',component:ProductComponent},
  {path:'Login', component:LoginComponent},
  {path:'Cart', component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
