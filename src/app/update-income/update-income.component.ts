import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IncomeService, incomeDetail } from '../income.service';
import { DatePipe } from '@angular/common';
import swal from "sweetalert2";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.css']
})
export class UpdateIncomeComponent implements OnInit, AfterViewInit {

  loadedInCats = [];
  updateIncomeForm: FormGroup;
  incomeDetail: incomeDetail;
  
  constructor(private incomeService: IncomeService,private datePipe: DatePipe, private router: Router, private authServ: AuthenticationService) { }

  ngAfterViewInit(): void {
    this.updateIncomeForm.patchValue({
      'date': this.incomeDetail.date,
      'category': this.incomeDetail.category,
      'description': this.incomeDetail.description,
      'amount': this.incomeDetail.amount,
    });
  }

  ngOnInit(): void {
    this.onFetchCategory();
    this.incomeDetail = this.incomeService.incomeDetail;

    this.updateIncomeForm = new FormGroup({
      date: new FormControl({ value: null, disabled: true}, [Validators.required]),
      category: new FormControl({ value: null}, [Validators.required]),
      description: new FormControl({ value: null}, [Validators.required]),
      amount: new FormControl({ value: null}, [Validators.required]),
    });
  }

  onUpdateIncomeDetail(){
    this.incomeDetail = this.incomeService.incomeDetail;

    let updatedData: incomeDetail = {
      id: this.incomeDetail.id,
      date: this.updateIncomeForm.get('date').value,
      category: this.updateIncomeForm.get('category').value,
      description: this.updateIncomeForm.get('description').value,
      amount: this.updateIncomeForm.get('amount').value,
      user: this.authServ.email
    }

    this.incomeService.updateIncomeDetail(updatedData).subscribe(
      (response) =>{
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
    this.incomeService.fetchIncomeCategory().subscribe(
      (inCat) => {
        this.loadedInCats = inCat;
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
