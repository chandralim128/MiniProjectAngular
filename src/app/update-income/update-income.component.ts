import { Component, OnInit } from '@angular/core';
import { incomeDetail } from '../income/income.model';
import { IncomeService } from '../income.service';
import { DatePipe } from '@angular/common';

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
  constructor(private incomeService: IncomeService,private datePipe: DatePipe) { }

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
    this.incomeService.updateIncomeDetail(updatedData);
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
