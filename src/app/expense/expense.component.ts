import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ExpenseService, expenseCategory, expenseDetail } from '../expense.service';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit, AfterViewInit {
  loadedExCats:any = [];
  date: string;
  expenseDetailForm: FormGroup;

  constructor(private expenseService: ExpenseService, private datePipe: DatePipe, private router: Router, private authServ: AuthenticationService) { 
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngAfterViewInit(): void {
    this.expenseDetailForm.patchValue({
      'date': this.date
    });
  }

  ngOnInit(): void {
    this.onFetchCategory();

    this.expenseDetailForm = new FormGroup({
      date: new FormControl({ value: null, disabled: true}, [Validators.required]),
      category: new FormControl({ value: null}, [Validators.required]),
      description: new FormControl({ value: null}, [Validators.required]),
      amount: new FormControl({ value: null}, [Validators.required]),
    });
  }

  onAddCategory(nameCtg) {
    const exCatNew: expenseCategory = {
      expenseCategoryName: nameCtg.expenseCategoryName,
      user: this.authServ.email
    }
    // Send Http request
    this.expenseService.addExpenseCategory(exCatNew).subscribe(
      (data) =>{
        this.onFetchCategory();
        swal.fire({
          title: "Success!",
          text: "Category Added!",
          showConfirmButton: true,
          icon: "success",
        });
      },
      error => {
        swal.fire({
          title: "Error!",
          text: error,
          showConfirmButton: true,
          icon: "error",
        });
      }
    );
  }

  onAddExpenseDetail(){
    const newExpense: expenseDetail = {
      date: this.date,
      category: this.expenseDetailForm.get('category').value,
      description: this.expenseDetailForm.get('description').value,
      amount: this.expenseDetailForm.get('amount').value,
      user: this.authServ.email
    }
    this.expenseService.addExpenseDetail(newExpense).subscribe(
      (data) =>{
        swal.fire({
          title: "Success!",
          text: "Data Added!",
          showConfirmButton: true,
          icon: "success",
        });
        this.router.navigate([""]);
      },
      error => {
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
      },
      error => {
        swal.fire({
          title: "Error!",
          text: error,
          showConfirmButton: true,
          icon: "error",
        });
      }
    );
  }
}
