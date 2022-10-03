import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account:any;
  orders:any=[];

  constructor(private accountService:AuthService, private cartService:CartService) { }

  ngOnInit(): void {
    this.getAccountById();
    this.getOrdersByAccountId(1);
  }

  getAccountById(){
    this.accountService.accountById(1).subscribe({
      next: response => this.account = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

  getOrdersByAccountId(id:number){
    this.cartService.orderHistory(id).subscribe({
      next: response => this.orders = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    });
  }

}
