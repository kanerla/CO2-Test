import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Co2Service } from '../co2.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  cruise = 0.0;
  flight = 0.0;
  total = 0.0;
  submitted = false;

  /**
   * Class constructor.
   *
   * @param formBuilder FormBuilder
   * @param co2Service CO2Service
   */
  constructor(private formBuilder: FormBuilder, private co2Service: Co2Service) { }

  travelForm = this.formBuilder.group({
    canaryFlights: ['', Validators.required],
    europeanFlights: ['', Validators.required],
    finlandFlights: ['', Validators.required],
    transContinentalFlights: ['', Validators.required],
    germanyCruises: ['', Validators.required],
    estoniaCruises: ['', Validators.required],
    swedenCruises: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  /**
   * Calls CO2Service when TravelForm is submitted.
   * Sets the results on view after getting a response.
   *
   * @param formData User submitted data from the form.
   */
  onFormSubmit(formData) {
    this.submitted = true;

    this.co2Service.setTravelForm(formData);

    this.co2Service.calculateTravel((result) => {
      for (const key in result) {
        if (key === 'Flight') {
          this.flight = result[key];
        } else if (key === 'Cruise') {
          this.cruise = result[key];
        } else if (key === 'Total') {
          this.total = result[key];
        }
      }
    });
  }

}
