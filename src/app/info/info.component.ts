import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  info = '';

  /**
   * Class constructor.
   *
   * @param infoService InfoService
   */
  constructor(private infoService: InfoService) { }

  /**
   * Calls the InfoService and sets the result on view.
   */
  ngOnInit(): void {
    this.infoService.fetch((result) => {
      this.info = result;
    });
  }

}
