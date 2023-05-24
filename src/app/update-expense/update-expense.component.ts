import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { HomeComponent } from '../home/home.component';
import { DatePipe } from '@angular/common';
import { expenseDetail } from '../expense/expense.model';
@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit {
  updateId: string;
  updateAmount: number;
  updateCategory: string;
  updateDescription: string;
  updateDate: string;
  loadedExCats = [];
  isDisabled: boolean;
  constructor(private expenseService: ExpenseService,private datePipe: DatePipe) {
   }

  ngOnInit(): void {
    this.isDisabled = true;
    this.updateId = this.expenseService.updateId;
    this.updateCategory = this.expenseService.updateCategory;
    this.updateAmount = this.expenseService.updateAmount;
    this.updateDescription = this.expenseService.updateDescription;
    this.updateDate = this.expenseService.updateDate;
    this.onFetchCategory();
  }
  onUpdateExpenseDetail(){
    let updatedData: expenseDetail = {
      id: this.updateId,
      date: this.updateDate,
      category: this.updateCategory,
      description: this.updateDescription,
      amount: this.updateAmount
  }
    console.log(updatedData);
    this.expenseService.updateExpenseDetail(updatedData);
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
