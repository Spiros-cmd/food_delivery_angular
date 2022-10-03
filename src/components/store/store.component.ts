import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/services/store.service';
import { SharedService } from 'src/shared/shared.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  searchStore:string = '';
  stores: any;
  id!: number;
  PopularStoresByCategory:any;

  isShowDiv = false;
  food:string='FOOD';
  grocery:string='GROCERY';


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

  constructor(private storeService: StoreService,private shared:SharedService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ReadStoreHandler();
    this.getMostPopularStoresByCategory(this.food);
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

  getMostPopularStoresByCategory(category:string) {
    this.isShowDiv = !this.isShowDiv;
    this.storeService.mostPopularStoresByCategory(category).subscribe({
      next: response => this.PopularStoresByCategory = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
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
