import { StoreService } from 'src/services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-drop',
  templateUrl: './category-drop.component.html',
  styleUrls: ['./category-drop.component.css']
})
export class CategoryDropComponent implements OnInit {

  storesByCategory:any;

  constructor(private storeService:StoreService) { }

  ngOnInit(): void {
    this.getStoresByCategory('FOOD')
  }

  getStoresByCategory(category:string){
    this.storeService.storesByName(category).subscribe({
      next: response => this.storesByCategory = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

}
