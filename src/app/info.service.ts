import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * InfoService is used to read data from a .txt file.
 */
@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private http: HttpClient;

  /**
   * Class constructor.
   *
   * @param http HttpClient
   */
  constructor(http: HttpClient) {
    this.http = http;
  }

  /**
   * Fetch data from info.txt.
   *
   * @param callBackFunction Called from InfoComponent. Returns a string of data.
   */
  fetch(callBackFunction: (result: string) => void): void {
    this.http.get('assets/info.txt', {responseType: 'text'})
    .subscribe(data => {
      callBackFunction(data);
    });
  }
}
