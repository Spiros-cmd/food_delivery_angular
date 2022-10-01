import { StoreService } from './../../services/store.service';
import { Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-top-ten',
  templateUrl: './slider-top-ten.component.html',
  styleUrls: ['./slider-top-ten.component.css']
})
export class SliderTopTenComponent implements OnInit {

  products:any;

  constructor(private productService:ProductService, private router:Router){}

  ngOnInit(): void {
    this.findTopTenProducts();
  }

  findTopTenProducts(){
    this.productService.getTopTenProducts().subscribe({
      next: response => this.products = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  findProduct(id: any) {
    this.router.navigate(
      ['/product/'],
      { queryParams: { findByStore: id } }
    );
  }
  
}
