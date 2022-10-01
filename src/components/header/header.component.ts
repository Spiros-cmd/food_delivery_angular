import { CartService } from 'src/services/cart.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalItem: number = 0;

  constructor(private dialogRef: MatDialog, private cartService:CartService){}

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
      console.log(this.totalItem);
    });
  }

  openDialog(){
    this.dialogRef.open(LoginComponent);
  }

}
