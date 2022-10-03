import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from 'src/components/account/account.component';
import { CartComponent } from 'src/components/cart/cart.component';
import { HomeComponent } from 'src/components/home/home.component';
import { LoginComponent } from 'src/components/login/login.component';
import { PageNotFoundComponent } from 'src/components/page-not-found/page-not-found.component';
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
  {path:'Cart', component:CartComponent},
  {path:'Account', component:AccountComponent},
  {path:'**',pathMatch:'full', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
