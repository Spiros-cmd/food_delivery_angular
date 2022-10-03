import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private URL = environment.baseURL + "/stores";

  httpOptions = {
    headers: new HttpHeaders({'content-Type1':'application/json'})
  }

  constructor(private http:HttpClient) { }

  getStores(){
    return this.http.get(this.URL);
  }

  mostPopularStoresByCategory(category:string){
    let params = new HttpParams().set("storeCategory", category.toUpperCase());
    return this.http.get(this.URL+'/popular',{params});
  }
}
