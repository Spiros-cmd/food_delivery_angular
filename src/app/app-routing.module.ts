import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/components/home/home.component';
import { LoginComponent } from 'src/components/login/login.component';
import { ProductComponent } from 'src/components/product/product.component';
import { StoreComponent } from 'src/components/store/store.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:searchItem',component:StoreComponent},
  {path:'Store',component:StoreComponent},
  {path:'Product',component:ProductComponent},
  {path:'Login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
