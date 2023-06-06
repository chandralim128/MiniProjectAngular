import { Component, OnInit } from '@angular/core';
import { incomeDetail } from '../income/income.model';
import { IncomeService } from '../income.service';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.css']
})
export class UpdateIncomeComponent implements OnInit {
  updateId: string;
  updateAmount: number;
  updateCategory: string;
  updateDescription: string;
  updateDate: string;
  loadedInCats = [];
  isDisabled: boolean;
  constructor(private incomeService: IncomeService,private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.isDisabled = true;
    this.updateId = this.incomeService.updateId;
    this.updateCategory = this.incomeService.updateCategory;
    this.updateAmount = this.incomeService.updateAmount;
    this.updateDescription = this.incomeService.updateDescription;
    this.updateDate = this.incomeService.updateDate;
    this.onFetchCategory();
  }
  onUpdateIncomeDetail(){
    let updatedData: incomeDetail = {
      id: this.updateId,
      date: this.updateDate,
      category: this.updateCategory,
      description: this.updateDescription,
      amount: this.updateAmount
  }
    console.log(updatedData);
    this.incomeService.updateIncomeDetail(updatedData).subscribe(
      (response) =>{
        console.log(response);
        swal.fire({
          title: "Success!",
          text: "Data Updated!",
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
    this.incomeService.fetchIncomeCategory().subscribe(
      (inCat) => {
        this.loadedInCats = inCat;
        console.log(inCat)
      },
      error => {
        console.log(error);
      }
    );
  }
}
