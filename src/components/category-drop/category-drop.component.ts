import { StoreService } from 'src/services/store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-drop',
  templateUrl: './category-drop.component.html',
  styleUrls: ['./category-drop.component.css']
})
export class CategoryDropComponent implements OnInit {

  constructor(service:StoreService) { }

  ngOnInit(): void {
  }

}
