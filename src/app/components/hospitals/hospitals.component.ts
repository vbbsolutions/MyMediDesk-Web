import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { HospitalService } from '../../services/hospital.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {
  submitted: boolean = false;
  searchForm: FormGroup;
  hospitalDropDownList: any;
  UserId: any;
  totalHospitals: any;
  HospitalLocation: any = "";
  hospitalResultList: any;
  hospitalList: any;
  HospitalName: any;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      HospitalLocation: ['', Validators.required],
      HospitalName: ['', Validators.required]
    });

    this.hospitalService.getHospitalListForHomePage().subscribe((hospitalListResponse: any) => {
      if (hospitalListResponse.status.status == true) {
        this.hospitalDropDownList = hospitalListResponse.status.data;
        this.hospitalList = hospitalListResponse.status.data;
        this.totalHospitals = this.hospitalList.length;
      } else {
        swal({
          title: hospitalListResponse.message
        });
      }
    });
  }
  get searchControl() {
    return this.searchForm.controls;
  }

  searchHospitalLocation() {
    this.hospitalService.getHospitalListForHomePage().subscribe((hospitalListResponse: any) => {
      this.hospitalList = hospitalListResponse.status.data.filter(x => (x.Name) === this.HospitalLocation);
      this.totalHospitals = this.hospitalList.length;
    });
  }

  searchFun() {
    this.submitted = true;
    if (this.searchForm.invalid) {
    }
    return;
  }

  searchHospitalFind() {
    if (this.HospitalName) {
      this.hospitalList = this.hospitalList.filter(x => (x.Name).toLowerCase().startsWith(this.HospitalName));
      this.totalHospitals = this.hospitalList.length;
    }
    else {
      this.searchHospitalLocation();
    }
  }

  appointmentAlert() {
    alert("Please Login the User Account");
  }
}
