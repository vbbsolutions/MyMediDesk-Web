import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { PatientReportService } from '../../services/PatientReport.service';


@Component({
  selector: 'app-save-report',
  templateUrl: './save-report.component.html',
  styleUrls: ['./save-report.component.css']
})
export class SaveReportComponent implements OnInit {
  submitted: boolean = false;
  uploadFileForm: FormGroup;
  uploadFileData: any;

  constructor(
    private formBuilder: FormBuilder,
    private patientReportService: PatientReportService,
  ) {

    this.uploadFileData = {
      uploadFile: ""
    }
  }
  ngOnInit(): void {
    this.uploadFileForm = this.formBuilder.group({
      uploadFile: ['', Validators.required]
    });
  }
  get uploadFileControl() {
    return this.uploadFileForm.controls;
  }
  reset() {
    this.submitted = false;
    this.uploadFileForm.reset();
  }
  uploadFileFun() {
    this.submitted = true;
    if (this.uploadFileForm.invalid) {
      return;
    }
    this.patientReportService.uploadFile({ data: this.uploadFileData }).subscribe((uploadDataRes: any) => {
      if (uploadDataRes.status == true) {
      }
    })
  }
}