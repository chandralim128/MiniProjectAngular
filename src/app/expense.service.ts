import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { expenseCategory } from './expense/expenseCategory.model';
import { map, tap } from 'rxjs/operators';
import { expenseDetail } from './expense/expense.model';
import { incomeDetail } from './income/income.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  updateId: string;
  updateAmount: number;
  updateCategory: string;
  updateDescription: string;
  updateDate: string;
  endPointURL: string = "https://miniproject-d0674-default-rtdb.asia-southeast1.firebasedatabase.app/";
  ExpenseCategoryURL: string = this.endPointURL+'ExpenseCategoryURL.json';
  ExpenseDetailURL: string = this.endPointURL+'ExpenseDetailURL.json';
  constructor(private http: HttpClient) { }

  addExpenseCategory(exCat: expenseCategory){
    return this.http.post<{name: string}>(this.ExpenseCategoryURL, exCat, {
      observe: 'response',
      responseType: 'json'
    });
  }
  addExpenseDetail(exDet: expenseDetail){
    console.log(exDet);
    console.log(exDet.date);
    return this.http.post<{date: string}>(this.ExpenseDetailURL, exDet, {
      observe: 'response',
      responseType: 'json'
    });
  }
  fetchExpenseCategory(){
    return this.http.get<{[key: string] : expenseCategory}>(this.ExpenseCategoryURL,{
    })
    .pipe(
      map( responseData =>{
        const postArray: expenseCategory[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key})
          }
        }
        return postArray;
      })
    );
  }
  fetchExpenseDetails(){
    return this.http.get<{[key: string] : expenseDetail}>(this.ExpenseDetailURL,{
    })
    .pipe(
      map( responseData =>{
        const postArray: expenseDetail[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key})
          }
        }
        return postArray;
      })
    );
  }
  getUpdateData(exDet: expenseDetail){
    console.log(exDet);
    this.updateId = exDet.id;
    this.updateCategory = exDet.category;
    this.updateAmount = exDet.amount;
    this.updateDescription = exDet.description;
    this.updateDate = exDet.date;
  }
  updateExpenseDetail(updatedData: expenseDetail){
    console.log(updatedData.category);
    const data = { [updatedData.id] : {
      amount : updatedData.amount,
      category : updatedData.category,
      date : updatedData.date,
      description: updatedData.description
    }}
    return this.http.patch(this.ExpenseDetailURL,data);
  }
  deleteExpenseDetail(deletedData: expenseDetail){
    let deleteExpenseURL = this.endPointURL+"ExpenseDetailURL/"+deletedData.id+".json";
    console.log(deleteExpenseURL);
    return this.http.delete(deleteExpenseURL);
  }
}
