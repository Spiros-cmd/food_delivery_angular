import { StoreService } from './../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  stores:any;

  constructor(private storeService:StoreService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.params.subscribe(params =>{
    //   if(params['searchItem'])
    //   this.products = this.productService.getProducts().filter((product: { name: string; }) => product.name.toLowerCase().includes(params['searchItem'].toLowerCase()))
    //   else
    //   this.products = this.productService.getProducts();
    // })
    // this.ReadStoreHandler();
  }

  // ReadStoreHandler(){
  //   this.storeService.getStores().subscribe({
  //     next: response => this.stores = response,
  //     error:(error:any) => console.log(error),
  //     complete:() => console.log('complete')
  //   });
}



