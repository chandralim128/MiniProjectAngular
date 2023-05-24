import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../income.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  loadedInCats = [];
  date: string;
  isDisabled: boolean;
  constructor(private incomeService: IncomeService, private datePipe: DatePipe) { 
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.isDisabled = true;
  }

  ngOnInit(): void {
    this.onFetchCategory();
  }
  onAddCategory(exCat: { name: string;}) {
    // Send Http request
    this.incomeService.addIncomeCategory(exCat);
    this.onFetchCategory();
  }
  onAddIncomeDetail(inDet: {date: string; category: string; amount: number; description: string}){
    inDet.date = this.date;
    this.incomeService.addIncomeDetail(inDet);
  }
  onFetchCategory(){
    this.incomeService.fetchIncomeCategory().subscribe(
      (exCat) => {
        this.loadedInCats = exCat;
        console.log(exCat)
      },
      error => {
        console.log(error);
      }
    );
  }

}
