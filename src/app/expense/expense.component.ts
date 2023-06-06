import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { DatePipe } from '@angular/common';
import { expenseCategory } from './expenseCategory.model';
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  loadedExCats:any = [];
  date: string;
  isDisabled: boolean;
  constructor(private expenseService: ExpenseService, private datePipe: DatePipe, private router: Router) { 
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.isDisabled = true;
  }

  ngOnInit(): void {
    this.onFetchCategory();
  }
  onAddCategory(exCat: { name: string;}) {
    // Send Http request
    this.expenseService.addExpenseCategory(exCat).subscribe(
      (data) =>{
        console.log(data);
        this.onFetchCategory();
        swal.fire({
          title: "Success!",
          text: "Category Added!",
          showConfirmButton: true,
          icon: "success",
        });
      },
      error => {
        console.log(error)
        swal.fire({
          title: "Error!",
          text: error,
          showConfirmButton: true,
          icon: "error",
        });
      }
    );
  }
  onAddExpenseDetail(exDet: {date: string; category: string; amount: number; description: string}){
    exDet.date = this.date;
    this.expenseService.addExpenseDetail(exDet).subscribe(
      (data) =>{
        console.log(data);
        swal.fire({
          title: "Success!",
          text: "Data Added!",
          showConfirmButton: true,
          icon: "success",
        });
        this.router.navigate([""]);
      },
      error => {
        console.log(error)
        swal.fire({
          title: "Error!",
          text: error,
          showConfirmButton: true,
          icon: "error",
        });
      }
    );
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
