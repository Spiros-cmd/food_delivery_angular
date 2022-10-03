import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharedService } from 'src/shared/shared.service';

@Component({
  selector: 'app-slider-top-ten',
  templateUrl: './slider-top-ten.component.html',
  styleUrls: ['./slider-top-ten.component.css']
})
export class SliderTopTenComponent implements OnInit {

  products:any;
  storeId:any;
  loaded: boolean = false;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left" aria-hidden="true"></i>', '<i class="fa fa-caret-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  constructor(private productService:ProductService,private shared:SharedService, private router:Router, private http:HttpClient){}

  ngOnInit(): void {
    // this.router.events.subscribe;
    this.findTopTenProducts();

  }

  findTopTenProducts(){
    this.productService.getTopTenProducts().subscribe({
      next: response => this.products = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  onSelect(product:any){
      this.products = product;
  }

  findProductsByStore(id:any){
      return this.productService.FindProductsByStore(id);
  }

  public findStoreId = (id:any) => {
    for(let i=0; i < this.findTopTenProducts.length; i++){

    }
  }

  ReadProductByStoreHandler(id:any) {
    this.productService.FindProductsByStore(id).subscribe(response => {
      this.products = response;
      this.products.data.forEach((a: any) => {
        Object.assign(a,{quantity:1,total:a.price });
      });
    })
  }

  setId(id: number){
    this.storeId = id;
    this.shared.setId(this.storeId)
  }
}
