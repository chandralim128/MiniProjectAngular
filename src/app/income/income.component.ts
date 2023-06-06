import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../income.service';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  loadedInCats = [];
  date: string;
  isDisabled: boolean;
  constructor(private incomeService: IncomeService, private datePipe: DatePipe, private router: Router) { 
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.isDisabled = true;
  }

  ngOnInit(): void {
    this.onFetchCategory();
  }
  onAddCategory(exCat: { name: string;}) {
    // Send Http request
    this.incomeService.addIncomeCategory(exCat).subscribe(
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
  onAddIncomeDetail(inDet: {date: string; category: string; amount: number; description: string}){
    inDet.date = this.date;
    this.incomeService.addIncomeDetail(inDet).subscribe(
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
