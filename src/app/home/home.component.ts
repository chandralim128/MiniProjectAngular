import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { IncomeService } from '../income.service';
import { expenseDetail } from '../expense/expense.model';
import { incomeDetail } from '../income/income.model';
import swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadedIncomeDetails = [];
  loadedExpenseDetails = [];
  
  constructor(private expenseService: ExpenseService, private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.onFetchExpenseDetails();
    this.onFetchIncomeDetails();
  }
  onFetchIncomeDetails(){
    this.incomeService.fetchIncomeDetails().subscribe(
      (inDet) => {
        this.loadedIncomeDetails = inDet;
        console.log(inDet)
      },
      error => {
        console.log(error);
      }
    );
  }
  onFetchExpenseDetails(){
    this.expenseService.fetchExpenseDetails().subscribe(
      (exDet) => {
        this.loadedExpenseDetails = exDet;
        console.log(exDet)
      },
      error => {
        console.log(error);
      }
    );
  }
  writeExpenseUpdate(exDet: expenseDetail){
    console.log(exDet);
    this.expenseService.getUpdateData(exDet);
  }
  writeIncomeUpdate(inDet: incomeDetail){
    console.log(inDet);
    this.incomeService.getUpdateData(inDet);
  }
  onExpenseDelete(deletedExpenseDetail: expenseDetail){
    console.log(deletedExpenseDetail);
    this.expenseService.deleteExpenseDetail(deletedExpenseDetail).subscribe(
      (response) =>{
        console.log(response);
        swal.fire({
          title: "Success!",
          text: "Data Deleted!",
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
  onIncomeDelete(deletedIncomeDetail: incomeDetail){
    console.log(deletedIncomeDetail);
    this.incomeService.deleteIncomeDetail(deletedIncomeDetail).subscribe(
      (response) =>{
        console.log(response);
        swal.fire({
          title: "Success!",
          text: "Data Deleted!",
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
}
