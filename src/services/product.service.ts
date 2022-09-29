import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = environment.baseURL + "/products";

  httpOptions ={
    headers: new HttpHeaders({'content-Type1':'application/json'})
  }

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get(this.URL);
  }

  FindProductsByStore(id:number) {
    let params = new HttpParams().set("findByStore", id);
    return this.http.get<any>(this.URL, {params})
    .pipe(map((res:any)=>{
      return res;
    }));
  }
}
