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

  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  totalCards: number = this.arr.length;
  currentPage: number = 1;
  pagePosition: string = "0%";
  cardsPerPage!: number;
  totalPages!: number;
  overflowWidth!: string;
  cardWidth!: string;
  containerWidth!: number;
  @ViewChild("container", { static: true, read: ElementRef })
  container!: ElementRef;
  @HostListener("window:resize") windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  constructor(private storeService: StoreService,private shared:SharedService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.cardsPerPage = this.getCardsPerPage();
    // this.initializeSlider();
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

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${this.totalPages *
      10}px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${this.cardsPerPage *
      10}px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
  }

  changePage(incrementor: number) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${10 *
      (this.currentPage - 1)}px)`;
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
