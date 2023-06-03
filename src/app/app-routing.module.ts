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
import { AuthGuardService } from './auth-guard.service';
const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signUp', component: SignUpComponent
  },
  {
    path: 'expense', component: ExpenseComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'income', component: IncomeComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'updateIncome', component: UpdateIncomeComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'updateExpense', component: UpdateExpenseComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
