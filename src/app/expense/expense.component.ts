import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { DatePipe } from '@angular/common';
import { expenseCategory } from './expenseCategory.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  loadedExCats:any = [];
  date: string;
  isDisabled: boolean;
  constructor(private expenseService: ExpenseService, private datePipe: DatePipe) { 
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.isDisabled = true;
  }

  ngOnInit(): void {
    this.onFetchCategory();
  }
  onAddCategory(exCat: { name: string;}) {
    // Send Http request
    this.expenseService.addExpenseCategory(exCat);
    this.onFetchCategory();
  }
  onAddExpenseDetail(exDet: {date: string; category: string; amount: number; description: string}){
    exDet.date = this.date;
    this.expenseService.addExpenseDetail(exDet);
  }
  onFetchCategory(){
    this.expenseService.fetchExpenseCategory().subscribe(
      (exCat) => {
        this.loadedExCats = exCat;
        console.log(exCat)
      },
      error => {
        console.log(error);
      }
    );
  }
}
