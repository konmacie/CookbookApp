import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _logger: LoggerService) {}

  ngOnInit(): void {
    this._logger.info('[HomeComponent]', 'initialized');
  }
}
