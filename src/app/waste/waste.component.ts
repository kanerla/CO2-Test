import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Co2Service } from '../co2.service';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.css']
})
export class WasteComponent implements OnInit {
  result = 0.0;
  submitted = false;

  /**
   * Class constructor.
   *
   * @param formBuilder FormBuilder
   * @param co2Service Co2Service
   */
  constructor(private formBuilder: FormBuilder, private co2Service: Co2Service) { }

  wasteForm = this.formBuilder.group({
    bioWaste: ['', Validators.required],
    carton: ['', Validators.required],
    electronic: ['', Validators.required],
    glass: ['', Validators.required],
    hazardous: ['', Validators.required],
    metal: ['', Validators.required],
    paper: ['', Validators.required],
    plastic: ['', Validators.required],
    amountEstimate: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  /**
   * Calls the CO2Service when WasteForm is submitted.
   * Sets the result on view after getting it as a response.
   */
  onFormSubmit() {
    this.submitted = true;

    this.co2Service.setWasteForm(this.wasteForm.value);

    this.co2Service.calculateWaste((result) => {
      this.result = result;
    });
  }

}
