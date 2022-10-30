import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

//Material Components
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';



//Own Components
import { QuestionComponent } from './question/question.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppState } from './state/app.state';
import { ResultdashboardComponent } from './resultdashboard/resultdashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    DashboardComponent,
    ResultdashboardComponent,
  ],
  imports: [
    BrowserModule,
    NgxsModule,
    NgxsModule.forRoot([
      AppState
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    TextFieldModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
