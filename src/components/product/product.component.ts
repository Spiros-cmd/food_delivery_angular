import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { SharedService } from 'src/shared/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  allProducts: any;
  products: any;
  id!:number;

  constructor(private productService: ProductService,private shared:SharedService, private router:Router) { }

  ngOnInit(): void {
    this.getStoreId();
    this.ReadProductByStoreHandler();
  }

  getStoreId(){
    this.id = this.shared.getId()
  }

  ReadProductHandler() {
    this.productService.getProducts().subscribe({
      next: response => this.allProducts = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  ReadProductByStoreHandler() {
    this.productService.FindProductsByStore(this.id).subscribe({
      next: response => this.products = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }
}
