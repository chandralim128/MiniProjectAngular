import { Component, OnInit } from '@angular/core';
import { ExpenseService, expenseDetail } from '../expense.service';
import { IncomeService, incomeDetail } from '../income.service';
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadedIncomeDetails = [];
  loadedExpenseDetails = [];
  
  constructor(private expenseService: ExpenseService, private incomeService: IncomeService, private router: Router) { }

  ngOnInit(): void {
    this.onFetchExpenseDetails();
    this.onFetchIncomeDetails();
  }

  onFetchIncomeDetails(){
    this.incomeService.fetchIncomeDetails().subscribe(
      (inDet) => {
        this.loadedIncomeDetails = inDet;
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

  onFetchExpenseDetails(){
    this.expenseService.fetchExpenseDetails().subscribe(
      (exDet) => {
        this.loadedExpenseDetails = exDet;
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

  writeExpenseUpdate(exDet: expenseDetail){
    this.expenseService.expenseDetail = exDet;
  }

  writeIncomeUpdate(inDet: incomeDetail){
    this.incomeService.incomeDetail = inDet;
  }

  onExpenseDelete(deletedExpenseDetail: expenseDetail){
    this.expenseService.deleteExpenseDetail(deletedExpenseDetail).subscribe(
      (response) =>{
        swal.fire({
          title: "Success!",
          text: "Data Deleted!",
          showConfirmButton: true,
          icon: "success",
        });
        this.onFetchExpenseDetails();
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

  onIncomeDelete(deletedIncomeDetail: incomeDetail){
    this.incomeService.deleteIncomeDetail(deletedIncomeDetail).subscribe(
      (response) =>{
        swal.fire({
          title: "Success!",
          text: "Data Deleted!",
          showConfirmButton: true,
          icon: "success",
        });
        this.onFetchIncomeDetails();
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
