import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { MatCardModule } from '@angular/material/card';
import { TicketsComponent } from './tickets.component';
import { MatIconModule } from '@angular/material/icon';
import { SeatsPipe } from 'src/app/shared/pipes/seats.pipe';
import { FsdatePipe } from 'src/app/shared/pipes/fsdate.pipe';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TicketsComponent,
    SeatsPipe,
    FsdatePipe
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TicketsModule { }
