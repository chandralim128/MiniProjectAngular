import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateIncomeComponent } from './update-income/update-income.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signUp', component: SignUpComponent
  },
  {
    path: 'expense', component: ExpenseComponent
  },
  {
    path: 'income', component: IncomeComponent
  },
  {
    path: 'updateIncome', component: UpdateIncomeComponent
  },
  {
    path: 'updateExpense', component: UpdateExpenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
