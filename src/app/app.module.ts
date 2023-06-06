import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';
import { UpdateIncomeComponent } from './update-income/update-income.component';
import { ExpenseService } from './expense.service';
import { IncomeService } from './income.service';
import { AuthGuardService } from './auth-guard.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ExpenseComponent,
    IncomeComponent,
    UpdateExpenseComponent,
    UpdateIncomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, ExpenseService, IncomeService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
