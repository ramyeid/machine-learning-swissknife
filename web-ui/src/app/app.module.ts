import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TimeSeriesAnalysisInputComponent } from './time-series-analysis/input/time-series-analysis-input.component';
import { HomeComponent } from './home/home.component';
import { TimeSeriesAnalysisOutputComponent } from './time-series-analysis/output/time-series-analysis-output.component';
import { TimeSeriesAnalysisComponent } from './time-series-analysis/time-series-analysis.component';

// TODO:
// 1. the port of the service is hardcoded
//     find a better way to pass the port.
// 2. Write tests

@NgModule({
  declarations: [
    AppComponent,
    TimeSeriesAnalysisComponent,
    TimeSeriesAnalysisOutputComponent,
    TimeSeriesAnalysisInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent },
      {path: 'time-series-analysis', component: TimeSeriesAnalysisComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]),
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
