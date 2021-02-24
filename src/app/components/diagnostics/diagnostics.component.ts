import { Component, OnInit } from '@angular/core';
declare var slide: any;

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.css']
})
export class DiagnosticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new slide('.doctor-slider', {
      dots: false,
      autoplay: false,
      infinite: true,
      variableWidth: true,
    });
  }

}
