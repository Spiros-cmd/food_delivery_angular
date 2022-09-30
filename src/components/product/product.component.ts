import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';
import { SharedService } from 'src/shared/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;
  storeId!: number;
  productId!: number;

  constructor(private productService: ProductService, private shared: SharedService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getStoreId();
    this.ReadProductByStoreHandler();
  }

  getStoreId() {
    this.storeId = this.shared.getId()
  }

  getProductId(id: number) {
    this.productId = id;
  }

  sendProductId() {
    this.shared.setId(this.productId);
  }

  addToCart(product: any) {
    // for(let i=0;i<this.products.length;i++){
    //   if(product.id===this.products[i].id){
    //     this.cartService.removeOrderItem(product)
    //   }
    // }
    this.cartService.addToCart(product);
  }

  ReadProductByStoreHandler() {
    this.productService.FindProductsByStore(this.storeId).subscribe(response => {
      this.products = response;
      this.products.data.forEach((a: any) => {
        Object.assign(a,{quantity:1,total:a.price });
      });
    })
  }
}
