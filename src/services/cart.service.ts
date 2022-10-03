import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderItemsList : any=[];
  productList = new BehaviorSubject<any>([]);
  private URL = environment.baseURL + "/orders";

  httpOptions = {
    headers: new HttpHeaders({'content-Type1':'application/json'})
  }

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product:any){
    this.orderItemsList.push(...product);
    this.productList.next(product);
  }

  increaseQuantity(product:any){
    product.quantity++;
    this.productList.next(product);
  }
  decreaseQuantity(product:any){
    product.quantity--;
    if(product.quantity==0){
      this.removeOrderItem(product)
    }
  }

  addToCart(product:any,idx:any){
    const found = this.orderItemsList.find(
      (item: any) => JSON.stringify(item)===JSON.stringify(product)
    );
    if(found){
      this.orderItemsList[idx].quantity++;
    }else{
      this.orderItemsList.push(product);
      this.productList.next(this.orderItemsList);
      this.getTotalPrice();
    }
    console.log(this.orderItemsList);
  }

  getTotalPrice():number{
    let grandTotal = 0;
    this.orderItemsList.map((a:any)=>{
      grandTotal += (a.total);
    });
    return grandTotal;
  }

  updateTotalPrice():number{
    let grandTotal = 0;
    this.orderItemsList.forEach((oi:any) => {
      grandTotal +=(oi.total*oi.quantity)
    });
    return grandTotal;
  }

  removeOrderItem(product:any){
    this.orderItemsList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.orderItemsList.splice(index,1)
        this.updateTotalPrice()
      }
    });
    this.productList.next(this.orderItemsList)
  }

  removeAllFromCart(){
    this.orderItemsList = []
    this.productList.next(this.orderItemsList)
  }

  checkout(orderItems:any){
    return this.http.post(this.URL+'/checkout',
    orderItems,
    this.httpOptions).toPromise().then((data:any)=>{
      console.log(data);
    })
  }

  orderHistory(id:number){
    let params = new HttpParams().set("Id", id);
    return this.http.get(this.URL+'/orderHistory',{params});
  }
}
