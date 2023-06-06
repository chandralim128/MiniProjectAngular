import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IncomeService, incomeCategory, incomeDetail } from '../income.service';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit, AfterViewInit {
  loadedInCats = [];
  date: string;
  incomeDetailForm: FormGroup;
  
  constructor(private incomeService: IncomeService, private datePipe: DatePipe, private router: Router, private authServ: AuthenticationService) { 
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngAfterViewInit(): void {
    this.incomeDetailForm.patchValue({
      'date': this.date
    });
  }

  ngOnInit(): void {
    this.onFetchCategory();

    this.incomeDetailForm = new FormGroup({
      date: new FormControl({ value: null, disabled: true}, [Validators.required]),
      category: new FormControl({ value: null}, [Validators.required]),
      description: new FormControl({ value: null}, [Validators.required]),
      amount: new FormControl({ value: null}, [Validators.required]),
    });
  }

  onAddCategory(nameCtg) {
    const exCat: incomeCategory = {
      incomeCategoryName: nameCtg.incomeCategoryName,
      user: this.authServ.email
    }
    // Send Http request
    this.incomeService.addIncomeCategory(exCat).subscribe(
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

  onAddIncomeDetail(){
    const newIncome: incomeDetail = {
      date: this.date,
      category: this.incomeDetailForm.get('category').value,
      description: this.incomeDetailForm.get('description').value,
      amount: this.incomeDetailForm.get('amount').value,
      user: this.authServ.email
    }
    this.incomeService.addIncomeDetail(newIncome).subscribe(
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
    this.incomeService.fetchIncomeCategory().subscribe(
      (exCat) => {
        this.loadedInCats = exCat;
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
