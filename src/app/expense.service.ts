import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

export interface expenseCategory{
  id?: string,
  expenseCategoryName: string,
  user: string,
}

export interface expenseDetail{
  id?: string
  date: string,
  category: string,
  amount: number,
  description: string,
  user: string,
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expenseDetail: expenseDetail;

  endPointURL: string = "https://miniproject-d3d61-default-rtdb.asia-southeast1.firebasedatabase.app/";
  ExpenseCategoryURL: string = this.endPointURL+'ExpenseCategoryURL.json';
  ExpenseDetailURL: string = this.endPointURL+'ExpenseDetailURL.json';
  constructor(private http: HttpClient, private authServ: AuthenticationService) { }

  addExpenseCategory(exCat: expenseCategory){
    return this.http.post<{name: string}>(this.ExpenseCategoryURL, exCat, {
      observe: 'response',
      responseType: 'json'
    });
  }
  
  addExpenseDetail(exDet: expenseDetail){
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
          if(responseData.hasOwnProperty(key) && this.authServ.email === responseData[key].user){
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
          if(responseData.hasOwnProperty(key) && this.authServ.email === responseData[key].user){
            postArray.push({...responseData[key], id: key})
          }
        }
        return postArray;
      })
    );
  }

  updateExpenseDetail(updatedData: expenseDetail){
    const data = { [updatedData.id] : {
      amount : updatedData.amount,
      category : updatedData.category,
      date : updatedData.date,
      description: updatedData.description,
      user: updatedData.user
    }}
    return this.http.patch(this.ExpenseDetailURL,data);
  }

  deleteExpenseDetail(deletedData: expenseDetail){
    let deleteExpenseURL = this.endPointURL+"ExpenseDetailURL/"+deletedData.id+".json";
    return this.http.delete(deleteExpenseURL);
  }
}
