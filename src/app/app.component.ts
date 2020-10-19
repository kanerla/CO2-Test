import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>
  <app-header></app-header>
  <mat-tab-group id="tabContainer">
    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">info</mat-icon>
        Info
      </ng-template>
      <app-info></app-info>
    </mat-tab>

    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">delete</mat-icon>
        Waste
      </ng-template>
      Waste here
    </mat-tab>

    <mat-tab>
      <ng-template mat-tab-label>
        <mat-icon class="tab-icon">flight_takeoff</mat-icon>
        Travel
      </ng-template>
      Travel here
    </mat-tab>
  </mat-tab-group>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'co2-test';
}
