import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { PatientReportService } from '../../services/PatientReport.service';
import swal from "sweetalert";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {
  submitted: boolean = false;
  createReportForm: FormGroup;
  reportData: any;
  AppUser: any;
  loginId: any;

  constructor(
    private formBuilder: FormBuilder,
    private patientReportService: PatientReportService,
    private cookieService: CookieService

  ) {
    this.reportData = {
      PatientId: "",
      ReportTypeId: ""
    }
  }
  ngOnInit(): void {
    this.AppUser = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (this.AppUser.data[0].Id);
    this.createReportForm = this.formBuilder.group({
      PatientId: ['', Validators.required],
      ReportTypeId: ['', Validators.required]
    });
  }
  get reportControl() {
    return this.createReportForm.controls;
  }
  reset() {
    this.submitted = false;
    this.createReportForm.reset();
  }
  reportFormFun() {
    this.submitted = true;
    if (this.createReportForm.invalid) {
      return;
    }
    this.patientReportService.createPatientReport({ data: this.reportData }, this.loginId).subscribe((reportDataRes: any) => {
      if (reportDataRes.status == true) {
        swal({
          title: "Patient Report Created Successfully"
        });
        this.reset();
      }
    })
  }
}


