import { Component, OnInit, HostListener, ViewChild, ElementRef, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/services/store.service';
import { SharedService } from 'src/shared/shared.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  searchStore:string = '';
  stores: any;
  id!: number;

  constructor(private storeService: StoreService,private shared:SharedService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ReadStoreHandler();
  }

  setId(id: number){
    this.id = id;
    this.shared.setId(this.id)
  }

  setStoreId(){
    this.shared.setId(this.id);
  }

  onSearchTextEntered(searchValue:string){
    this.searchStore = searchValue;
  }

  ReadStoreHandler() {
    this.storeService.getStores().subscribe({
      next: response => this.stores = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  goPizzas(id: any) {
    this.router.navigate(
      ['/products/'],
      { queryParams: { findByStore: id } }
    );
  }

  goPizzas2(id: any) {
    this.router.navigateByUrl(
      'localhost:8080/products?findByStore=' + id
    );
  }
}
