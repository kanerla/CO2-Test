import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

/**
 * CO2Service is used to fetch data from ilmastodieetti.ymparisto.fi/ilmastodieetti/calculatorapi.
 */
@Injectable({
  providedIn: 'root'
})
export class Co2Service {
  private http: HttpClient;
  private wasteBase = 'https://ilmastodieetti.ymparisto.fi/ilmastodieetti/calculatorapi/v1/WasteCalculator';
  private wasteUrl = 'https://ilmastodieetti.ymparisto.fi/ilmastodieetti/calculatorapi/v1/WasteCalculator';
  private travelUrl = 'https://ilmastodieetti.ymparisto.fi/ilmastodieetti/calculatorapi/v1/TransportCalculator';
  private travelBase = 'https://ilmastodieetti.ymparisto.fi/ilmastodieetti/calculatorapi/v1/TransportCalculator';
  headers;
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';
  private waste;
  private wasteForm;
  private travelForm;

  /**
   * Class constructor.
   *
   * @param http HttpClient
   */
  constructor(http: HttpClient) {
    this.http = http;
    this.headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  }

  /**
   * Setter for WasteForm data.
   *
   * @param formValue The values submitted in WasteForm.
   */
  setWasteForm(formValue): void {
    this.wasteForm = formValue;
  }

  /**
   * Setter for TravelForm data.
   *
   * @param formValue The values submitted in TravelForm.
   */
  setTravelForm(formValue): void {
    this.travelForm = formValue;
  }

  /**
   * Fills in the URL and fetches the CO2 calculation from WasteCalculator.
   *
   * @param callBackFunction Called from WasteComponent. Returns the amount of CO2 emitted in kilograms as a number.
   */
  calculateWaste(callBackFunction: (result: number) => void): void {
    for (const key in this.wasteForm) {
      if (key === 'bioWaste') {
        this.wasteUrl += '?query.bioWaste=' + this.wasteForm[key];
      } else {
        this.wasteUrl += '&query.' + key + '=' + this.wasteForm[key];
      }
    }

    this.http.get(this.proxyurl + this.wasteUrl, {headers: this.headers}).subscribe(result => {
      this.waste = result;
      callBackFunction(this.waste);
    });

    this.wasteUrl = this.wasteBase;
  }

  /**
   * Fills in the URL and fetches the CO2 calculation from TransportCalculator.
   *
   * @param callBackFunction Called from TravelComponent. Returns JSON data.
   */
  calculateTravel(callBackFunction: (result: Object) => void): void {
    for (const key in this.travelForm) {
      if (key === 'canaryFlights') {
        this.travelUrl += '?query.canaryFlights=' + this.travelForm[key];
      } else {
        this.travelUrl += '&query.' + key + '=' + this.travelForm[key];
      }
    }

    this.http.get(this.proxyurl + this.travelUrl, {headers: this.headers}).subscribe(json => {
      callBackFunction(json);
    });

    this.travelUrl = this.travelBase;
  }
}
