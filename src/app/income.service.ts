import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

export interface incomeCategory{
  id?: string,
  incomeCategoryName: string,
  user: string
}

export interface incomeDetail{
  id?: string,
  date: string,
  category: string,
  amount: number,
  description: string,
  user: string,
}

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  incomeDetail: incomeDetail;

  endPointURL: string = "https://miniproject-d3d61-default-rtdb.asia-southeast1.firebasedatabase.app/";
  IncomeCategoryURL: string = this.endPointURL+'IncomeCategoryURL.json';
  IncomeDetailURL: string = this.endPointURL+'IncomeDetailURL.json';
  constructor(private http: HttpClient, private authServ: AuthenticationService) { }

  addIncomeCategory(inCat: incomeCategory){
    return this.http.post<{name: string}>(this.IncomeCategoryURL, inCat, {
      observe: 'response',
      responseType: 'json'
    });
  }

  addIncomeDetail(inDet: incomeDetail){
    return this.http.post<{date: string}>(this.IncomeDetailURL, inDet, {
      observe: 'response',
      responseType: 'json'
    });
  }

  fetchIncomeCategory(){
    return this.http.get<{[key: string] : incomeCategory}>(this.IncomeCategoryURL,{
    })
    .pipe(
      map( responseData =>{
        const postArray: incomeCategory[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key) && this.authServ.email === responseData[key].user){
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
          if(responseData.hasOwnProperty(key) && this.authServ.email === responseData[key].user){
            postArray.push({...responseData[key], id: key})
          }
        }
        return postArray;
      })
    );
  }

  updateIncomeDetail(updatedData: incomeDetail){
    const data = { [updatedData.id] : {
      amount : updatedData.amount,
      category : updatedData.category,
      date : updatedData.date,
      description: updatedData.description,
      user: updatedData.user
    }}
    return this.http.patch(this.IncomeDetailURL,data);
  }

  deleteIncomeDetail(deletedData: incomeDetail){
    let deleteIncomeURL = this.endPointURL+"IncomeDetailURL/"+deletedData.id+".json";
    return this.http.delete(deleteIncomeURL);
  }
}
