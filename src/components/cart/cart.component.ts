import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { SharedService } from 'src/shared/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products!:any;
  productId!:number;
  grandTotal!:number;
  total!:number;
  pId:any=[];
  pQ:any=[];
  oi:any=[];

  constructor(private shared:SharedService, private cartService:CartService) { }

  ngOnInit(): void {
    this.getProd();
  }

  increaseQuantity(product:any){
    product.quantity++;
  }
  decreaseQuantity(product:any){
    this.cartService.decreaseQuantity(product);
  }

  setOrderItem(id:number,quantity:number){
    this.pId.push(id);
    this.pQ.push(quantity);
  }

  removeItem(item:any){
    this.cartService.removeOrderItem(item);
  }

  emptyCart(){
    this.cartService.removeAllFromCart();
  }

  checkout(products:any){
    products.forEach((p:any) => {
      let orderItems={
        productId:p.id,
        quantity:p.quantity
      }
      this.oi.push(orderItems)
    });
    let postCheckout={
      orderItems:this.oi,
      paymentMethod:1,
      accountId:1,
      storeId:this.shared.getId()
    }
    this.cartService.checkout(postCheckout);
    this.emptyCart();
    alert("Congrats...your order bla bla bla");
  }

  getProducts(){
    this.products = this.cartService.getProducts();
  }

  getProd(){
    this.cartService.getProducts().subscribe({
      next: response => {this.products = response;
      this.grandTotal = this.cartService.getTotalPrice()},
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }
}
