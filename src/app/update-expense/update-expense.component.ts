import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ExpenseService, expenseDetail } from '../expense.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import swal from "sweetalert2";
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css']
})
export class UpdateExpenseComponent implements OnInit, AfterViewInit {

  loadedExCats = [];
  updateExpenseForm: FormGroup;
  expenseDetail: expenseDetail;

  constructor(private expenseService: ExpenseService, private datePipe: DatePipe, private router: Router, private authServ: AuthenticationService) {
  }

  ngOnInit(): void {
    this.onFetchCategory();
    this.expenseDetail = this.expenseService.expenseDetail;

    this.updateExpenseForm = new FormGroup({
      date: new FormControl({ value: null, disabled: true}, [Validators.required]),
      category: new FormControl({ value: null}, [Validators.required]),
      description: new FormControl({ value: null}, [Validators.required]),
      amount: new FormControl({ value: null}, [Validators.required]),
    });
  }

  ngAfterViewInit(): void {
    this.updateExpenseForm.patchValue({
      'date': this.expenseDetail.date,
      'category': this.expenseDetail.category,
      'description': this.expenseDetail.description,
      'amount': this.expenseDetail.amount,
    });
  }

  onUpdateExpenseDetail(){
    this.expenseDetail = this.expenseService.expenseDetail;

    let updatedData: expenseDetail = {
      id: this.expenseDetail.id,
      date: this.updateExpenseForm.get('date').value,
      category: this.updateExpenseForm.get('category').value,
      description: this.updateExpenseForm.get('description').value,
      amount: this.updateExpenseForm.get('amount').value,
      user: this.authServ.email
    }

    this.expenseService.updateExpenseDetail(updatedData).subscribe(
      response =>{
        swal.fire({
          title: "Success!",
          text: "Data Updated!",
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
