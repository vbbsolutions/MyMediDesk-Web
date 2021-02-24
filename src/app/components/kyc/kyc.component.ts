import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator, FormControl } from '@angular/forms';
import { MustMatch } from './must-match-validator';
import { UserService } from '../../services/user.service';
import { PatientInsuranceService } from '../../services/patientInsurance.service';
import { PatientReportService } from '../../services/PatientReport.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import swal from "sweetalert";
import { getuid } from 'process';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../services/URL';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {
  submitted: boolean = false;
  insuranceDataForm: FormGroup;
  insuranceData: any;
  ConfirmPassword: any;
  loginId: any;
  userCodeResult: any;
  i: number = 0;
  //insuranceType: any = 'NonInsured';
  AppUser: any;
  url: any;
  patientInsuranceDetailsList: any;
  patientInsuranceDetailsListHistory: any;
  patientInsuranceDetails: any;
  loadSymbol: any;
  closeResult: string;
  imageFile: any;
  reportType: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private patientInsuranceService: PatientInsuranceService,
    private patientReportService: PatientReportService,
    private modalService: NgbModal
  ) {
    this.insuranceData = {
      _id: this.uuidv4(),
      Name: "",
      Relation: "",
      Gender: "",
      Age: "",
      aadharCard: "",
      InsuranceCard: "",
      MedicalHistory: ""
    }
    this.patientInsuranceDetails = [];
    this.patientInsuranceDetails.push({
      _id: this.uuidv4(),
      Name: "",
      Relation: "",
      Age: null,
      Gender: "",
      EmployeeId: "",
      CompanyName: "",
      InsuranceType: "Individual"
    });
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  ngOnInit(): void {
    this.AppUser = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (this.AppUser.data[0].Id);
    this.insuranceDataForm = this.formBuilder.group({
      Id: [],
      insuranceTypeIn_0: ['', Validators.required],
      Name_0: ['', Validators.required],
      Relationship_0: ['', Validators.required],
      Age_0: ['', Validators.required],
      Gender_0: ['', Validators.required],
      EmployeeId_0: [''],
      CompanyName_0: [''],
      aadharCard_0: [''],
      InsuranceCard_0: [''],
      MedicalHistory_0: [''],
      CorporateIdCard_0: ['']
    });
    this.getPatientInsurance();
  }
  allowOnlyChar(event: any) {
    return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode == 32)
  }
  numbersOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getControl(ctrlName: any, i: any) {
    return this.insuranceDataForm.controls[ctrlName + '_' + i];
  }
  onSelectFile(event: any, pInsu: any, reportType: any) {
    if (event.target.files && event.target.files[0]) {
      const file = ((event.target.files[0].size / 1024) / 1024);
      if (file > 1) {
        swal({
          title: "Uploaded document should not be greater than 1MB of Size"
        });
        return;
      }
      this.loadSymbol = true;
      const formData = new FormData();
      formData.append('report', event.target.files[0]);
      this.patientReportService.familyFiles(formData, this.loginId).subscribe((familyAadharFileURLRes: any) => {
        if (familyAadharFileURLRes.status == true) {
          if (reportType == 'MedicalHistory')
            pInsu.MedicalHistoryURL = familyAadharFileURLRes.data.ReportURL;
          if (reportType == 'Adhar')
            pInsu.AadharCardURL = familyAadharFileURLRes.data.ReportURL;
          if (reportType == 'Insurance')
            pInsu.InsuranceCardURL = familyAadharFileURLRes.data.ReportURL;
          if (reportType == 'CorporateCard')
            pInsu.CorporateIdCardURL = familyAadharFileURLRes.data.ReportURL;
          this.loadSymbol = false;
        } else {
          swal({
            title: "Upload file should be in PNG or JPEG Format!!!"
          });
          this.loadSymbol = false;
        }
      }, (err: any) => {
        swal({
          title: "There is a Network Issue Please check your Internet connection"
        });
        this.loadSymbol = false;
      });
    }
  }
  piCount: any = 0;
  savePatientInsurance() {
    this.piCount = 0;
    this.submitted = true;
    var activeCount = this.patientInsuranceDetailsList == null ? 0 : this.patientInsuranceDetailsList.filter(x => x.Status == 'Active').length;
    if (this.patientInsuranceDetails.length >= 6 || this.patientInsuranceDetails.length + activeCount >= 7) {
      swal({
        title: "You can not add more than 6 family members"
      });
      return;
    }
    if (this.insuranceDataForm.invalid) {
      return;
    }
    var isValid = true;
    for (var i = 0; i < this.patientInsuranceDetails.length; i++) {
      if (this.patientInsuranceDetails[i].AadharCardURL == "" || this.patientInsuranceDetails[i].AadharCardURL == null) {
        isValid = false;
        swal({
          title: "Please Enter Aadhar Card of " + this.patientInsuranceDetails[i].Name
        });
        return;
      }
      if (this.patientInsuranceDetails[i].InsuranceType == 'Individual' || this.patientInsuranceDetails[i].InsuranceType == 'Corporate') {
        if (this.patientInsuranceDetails[i].InsuranceCardURL == "" || this.patientInsuranceDetails[i].InsuranceCardURL == null) {
          isValid = false;
          swal({
            title: "Please Enter Insurance Card of " + this.patientInsuranceDetails[i].Name
          });
          return;
        }
      }
      if (this.patientInsuranceDetails[i].InsuranceType == 'Corporate') {
        if (this.patientInsuranceDetails[i].CorporateIdCardURL == "" || this.patientInsuranceDetails[i].CorporateIdCardURL == null) {
          isValid = false;
          swal({
            title: "Please Enter Company Id Card of " + this.patientInsuranceDetails[i].Name
          });
          return;
        }
      }
    }
    if (this.patientInsuranceDetails[this.piCount].InsuranceType) {
      this.loadSymbol = true;
      this.save(this.patientInsuranceDetails[this.piCount]);
    }
  }
  save(patInsu: any) {
    delete patInsu._id;
    patInsu.PatientId = this.loginId;
    patInsu.Status = 'Active';
    this.patientInsuranceService.save({ data: patInsu }, this.loginId).subscribe((patientReportRes: any) => {
      if (patientReportRes.status == true) {
        this.piCount++;
        if (this.piCount < this.patientInsuranceDetails.length) {
          this.save(this.patientInsuranceDetails[this.piCount]);
        }
        else {
          swal({
            title: "Patient insurance details saved successfully"
          });
          this.submitted = false;
          this.patientInsuranceDetails = [{
            InsuranceType: 'Individual'
          }];
          this.loadSymbol = false;
          this.getPatientInsurance();
        }
      } else {
        swal({
          title: "Problem in saving patient insurance details"
        });
        this.loadSymbol = false;
      }
    }, (err: any) => {
      swal({
        title: "There is a Network Issue Please check your Internet connection"
      });
      this.loadSymbol = false;
    });
  }
  addNewMember() {
    var activeCount = this.patientInsuranceDetailsList == null ? 0 : this.patientInsuranceDetailsList.filter(x => x.Status == 'Active').length;
    if (this.patientInsuranceDetails.length + activeCount >= 6) {
      swal({
        title: "You can not add more than 6 family members"
      });
      return;
    }
    else {
      this.insuranceDataForm.addControl('insuranceTypeIn_' + (this.patientInsuranceDetails.length), new FormControl('', Validators.required));
      this.insuranceDataForm.addControl('Name_' + (this.patientInsuranceDetails.length), new FormControl('', Validators.required));
      this.insuranceDataForm.addControl('Relationship_' + (this.patientInsuranceDetails.length), new FormControl('', Validators.required));
      this.insuranceDataForm.addControl('Age_' + (this.patientInsuranceDetails.length), new FormControl('', Validators.required));
      this.insuranceDataForm.addControl('Gender_' + (this.patientInsuranceDetails.length), new FormControl('', Validators.required));
      this.insuranceDataForm.addControl('EmployeeId_' + (this.patientInsuranceDetails.length), new FormControl(''));
      this.insuranceDataForm.addControl('CompanyName_' + (this.patientInsuranceDetails.length), new FormControl(''));
      this.insuranceDataForm.addControl('aadharCard_' + (this.patientInsuranceDetails.length), new FormControl(''));
      this.insuranceDataForm.addControl('InsuranceCard_' + (this.patientInsuranceDetails.length), new FormControl(''));
      this.insuranceDataForm.addControl('MedicalHistory_' + (this.patientInsuranceDetails.length), new FormControl(''));
      this.insuranceDataForm.addControl('CorporateIdCard_' + (this.patientInsuranceDetails.length), new FormControl(''));
      this.patientInsuranceDetails.push({
        _id: this.uuidv4(),
        Name: "",
        Relation: "",
        Age: null,
        Gender: "",
        EmployeeId: "",
        CompanyName: "",
        InsuranceType: "Individual"
      });
    }
  }
  removeMember(i: number) {
    this.patientInsuranceDetails.splice(i, 1);
  }

  changeInsuranceType(pInsu, type) {
    pInsu.InsuranceType = type;
  }

  getPatientInsurance() {
    this.patientInsuranceDetailsList = [];
    this.patientInsuranceDetailsListHistory = [];
    this.patientInsuranceService.getPatientInsuranceDetails(this.loginId).subscribe((patientInsuranceDetailsResponse: any) => {
      if (patientInsuranceDetailsResponse.status.status == true) {
        this.patientInsuranceDetailsList = patientInsuranceDetailsResponse.status.data.filter(x => x.Status == 'Active');
        this.patientInsuranceDetailsListHistory = patientInsuranceDetailsResponse.status.data.filter(x => x.Status == 'InActive');
      } else {
        swal({
          title: "List not Available"
        });
      }
    });
  }
  open(content: any, image: any, reportType: any) {
    this.imageFile = environment.rootUrl + '/loadfile/patientreports/' + image;
    this.reportType = reportType;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  editPInsurance(patient: any) {
    this.patientInsuranceDetails = [patient];
  }
  deletePInsurance(patient: any) {
    if (!confirm("Are you sure Do you want to delete Details?")) {
      return;
    }
    let patInsu = { Id: patient.Id, Status: 'InActive' }
    this.patientInsuranceService.save({ data: patInsu }, this.loginId).subscribe((patientReportRes: any) => {
      if (patientReportRes.status == true) {
        swal({
          title: "Patient insurance details Deleted successfully"
        });
        this.loadSymbol = false;
        this.getPatientInsurance();
        this.submitted = false;
      } else {
        swal({
          title: "Problem in Deleting patient insurance details"
        });
        this.loadSymbol = false;
      }
    }, (err: any) => {
      swal({
        title: "There is a Network Issue Please check your Internet connection"
      });
      this.loadSymbol = false;
    });
  }

}