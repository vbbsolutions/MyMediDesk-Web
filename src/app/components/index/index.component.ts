import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HospitalService } from '../../services/hospital.service';
import { SpecializationService } from '../../services/specialization.service';


import swal from "sweetalert";
import * as $ from 'jquery';
declare var slide: any;
import { environment } from '../../services/URL';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  appUserData: any;
  loginStatus: any;
  hospitalList: any;
  ImageURL: any = environment.rootUrl + '/loadfile/hospitals/';
  specializationsList: any;

  constructor(
    private cookieService: CookieService,
    private hospitalService: HospitalService,
    private specializationService: SpecializationService
  ) { }

  ngOnInit(): void {
    // this.appUserData = JSON.parse(this.cookieService.get('AppUser'));
    this.loginStatus = this.cookieService.get('loginStatus');
    this.hospitalService.getHospitalListForHomePage().subscribe((hospitalListResponse: any) => {
      if (hospitalListResponse.status.status == true) {
        this.hospitalList = hospitalListResponse.status.data;
        setTimeout(() => {
          new slide('.doctor-slider', {
            dots: false,
            autoplay: false,
            infinite: true,
            variableWidth: true,
          });
        }, 100);
      } else {
        swal({
          title: hospitalListResponse.message
        });
      }
    }, (err: any) => {
      swal({
        title: "There is a Network Issue Please check your Internet connection"
      });
    });


    new slide('.features-slider', {
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 3,
      speed: 500,
      variableWidth: true,
      arrows: false,
      autoplay: false,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    this.getAllSpecialization();
  }
  getAllSpecialization() {
    this.specializationService.getSpecializationsForHomePage().subscribe((specializationsResponse: any) => {
      if (specializationsResponse.status == true) {
        this.specializationsList = specializationsResponse.data;
        setTimeout(() => {
          new slide('.specialities-slider', {
            dots: true,
            autoplay: false,
            infinite: true,
            variableWidth: true,
            prevArrow: false,
            nextArrow: false
          });
        }, 100);
      } else {
        swal({
          title: specializationsResponse.message
        });
      }
    }, (err: any) => {
      swal({
        title: "There is a Network Issue Please check your Internet connection"
      });
    });
  }
}