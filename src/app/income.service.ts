import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { incomeCategory } from './income/incomeCategory.model';
import { incomeDetail } from './income/income.model';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  updateId: string;
  updateAmount: number;
  updateCategory: string;
  updateDescription: string;
  updateDate: string;
  endPointURL: string = "https://miniproject-d0674-default-rtdb.asia-southeast1.firebasedatabase.app/";
  IncomeCategoryURL: string = this.endPointURL+'IncomeCategoryURL.json';
  IncomeDetailURL: string = this.endPointURL+'IncomeDetailURL.json';
  constructor(private http: HttpClient) { }

  addIncomeCategory(inCat: incomeCategory){
    this.http.post<{name: string}>(this.IncomeCategoryURL, inCat, {
      observe: 'response',
      responseType: 'json'
    }).subscribe(
      (data) => {
        console.log(data);
      },
      (error) =>{
        console.log(error);
      }
    );
  }
  addIncomeDetail(inDet: incomeDetail){
    console.log(inDet);
    console.log(inDet.date);
    this.http.post<{date: string}>(this.IncomeDetailURL, inDet, {
      observe: 'response',
      responseType: 'json'
    }).subscribe(
      (data) => {
        console.log(data);
      },
      (error) =>{
        console.log(error);
      }
    );
  }
  fetchIncomeCategory(){
    return this.http.get<{[key: string] : incomeCategory}>(this.IncomeCategoryURL,{
    })
    .pipe(
      map( responseData =>{
        const postArray: incomeCategory[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key})
          }
        }
        return postArray;
      })
    );
  }
  fetchIncomeDetails(){
    return this.http.get<{[key: string] : incomeDetail}>(this.IncomeDetailURL,{
    })
    .pipe(
      map( responseData =>{
        const postArray: incomeDetail[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key})
          }
        }
        return postArray;
      })
    );
  }
  updateIncomeDetail(updatedData: incomeDetail){
    console.log(updatedData.category);
    const data = { [updatedData.id] : {
      amount : updatedData.amount,
      category : updatedData.category,
      date : updatedData.date,
      description: updatedData.description
    }}
    return this.http.patch(this.IncomeDetailURL,data).subscribe(
      (response) =>{
        console.log(response);
        alert("Data Updated!");
      },
      error => {
        console.log(error)
        alert("Error Update!");
      }
    )
  }
  getUpdateData(inDet: incomeDetail){
    console.log(inDet);
    this.updateId = inDet.id;
    this.updateCategory = inDet.category;
    this.updateAmount = inDet.amount;
    this.updateDescription = inDet.description;
    this.updateDate = inDet.date;
  }
  deleteIncomeDetail(deletedData: incomeDetail){
    let deleteIncomeURL = this.endPointURL+"IncomeDetailURL/"+deletedData.id+".json";
    console.log(deleteIncomeURL);
    return this.http.delete(deleteIncomeURL).subscribe(
      (response) =>{
        console.log(response);
      },
      error => {
        console.log(error)
      }
    )
  }
}
