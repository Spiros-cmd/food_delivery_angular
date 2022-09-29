import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderItemsList : any=[];
  productList = new BehaviorSubject<any>([]);
  private URL = environment.baseURL + "/orders";

  // smth:any = {orderItems:[],paymentMethod:1,accountId:1,storeId:1};

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

  addToCart(product:any){
    this.orderItemsList.push(product);
    this.productList.next(this.orderItemsList);
    this.getTotalPrice();
    console.log(this.orderItemsList);
  }

  getTotalPrice():number{
    let grandTotal = 0;
    this.orderItemsList.map((a:any)=>{
      grandTotal += a.total;
    });
    return grandTotal;
  }

  removeOrderItem(product:any){
    this.orderItemsList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.orderItemsList.splice(index,1)
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
