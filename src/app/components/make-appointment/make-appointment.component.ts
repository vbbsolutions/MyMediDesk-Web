import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { HospitalService } from '../../services/hospital.service';
import { SlotsService } from '../../services/Slots.service';
import { AppointmentService } from '../../services/appointment.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;
  appointmentData: any;
  public min = new Date();
  UserId: any;
  locationList: any;
  specializationList: any;
  doctorsList: any;
  hospitalId: any;
  specializationId: any;
  specializationAllList: any;
  DoctorId: any;
  slotDateList: any;
  slotTimeList: any;
  Hospital: any = "";
  Location: any = "";
  Specialization: any = "";
  Doctor: any = "";
  temp: any[];
  appointmentSlotId: any;
  appointmentResult: any;
  appointmenList: any;
  test1: any;
  hospitalList: any;
  SlotDate: any = "";
  slotDetailsList: any;
  ConsultationFee: any;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private cookieService: CookieService,
    private doctorService: DoctorService,
    private slotsService: SlotsService,
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    this.appointmentData = {
      SlotId: "",
      Notes: ""
    }
  }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.UserId = (obj.data[0].Id);
    if (this.UserId && this.UserId != undefined && this.UserId != null) {
      this.hospitalService.getHospitalList(this.UserId).subscribe((hospitalListResponse: any) => {
        var locationListVar = hospitalListResponse.status.data;
        let output = [];
        locationListVar.forEach((val: { City: any; }) => {
          var isExist = output.some(data => data.City == val.City);
          if (!isExist) output.push(val)
        })
        this.locationList = output;
      });
    }
    this.registerForm = this.formBuilder.group({
      Hospital: ['', Validators.required],
      Location: ['', Validators.required],
      ConsultationFee: ['', Validators.required],
      Specialization: ['', Validators.required],
      Doctor: ['', Validators.required],
      SlotDate: ['', Validators.required],
      SlotId: ['', Validators.required],
      Notes: ['', Validators.required]
    });
  }
  get register() {
    return this.registerForm.controls;
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
  reset() {
    this.specializationList = [];
    this.doctorsList = [];
    this.slotDateList = [];
  }
  OnLocationSelection(Location: any) {
    this.Hospital = "";
    this.hospitalList = [];
    this.Specialization = "";
    this.specializationList = [];
    this.Doctor = "";
    this.doctorsList = [];
    this.SlotDate = "";
    this.slotDateList = [];
    this.appointmentData.SlotId = "";
    this.slotTimeList = [];
    this.appointmentData.Notes = "";
    if (this.UserId && this.UserId != undefined && this.UserId != null) {
      this.hospitalService.getHospitalList(this.UserId).subscribe((hospitalListResponse: any) => {
        var hospitalvar = hospitalListResponse.status.data;
        this.hospitalList = hospitalvar.filter((item: { City: any; }) => item.City == Location);
      });
    }
  }
  OnHospitalSelection(hospitalId: any) {
    this.Specialization = "";
    this.specializationList = [];
    this.Doctor = "";
    this.doctorsList = [];
    this.SlotDate = "";
    this.slotDateList = [];
    this.appointmentData.SlotId = "";
    this.slotTimeList = [];
    this.appointmentData.Notes = "";
    this.hospitalId = hospitalId;
    this.hospitalService.getSpecializationByHospitalId(this.hospitalId, this.UserId).subscribe((specializationListResponse: any) => {
      this.specializationAllList = specializationListResponse.status.data;
      let output = [];
      this.specializationAllList.forEach((val: { SpecializationId: any; }) => {
        var isExist = output.some(data => data.SpecializationId === val.SpecializationId);
        if (!isExist) output.push(val)
      })
      this.specializationList = output;
    })
  }
  OnSpecializationSelection(specializationId: any) {
    this.Doctor = "";
    this.doctorsList = [];
    this.SlotDate = "";
    this.slotDateList = [];
    this.appointmentData.SlotId = "";
    this.slotTimeList = [];
    this.appointmentData.Notes = "";
    this.specializationId = specializationId;
    this.doctorService.getDoctorsBySpecializationId(this.hospitalId, this.specializationId, this.UserId).subscribe((doctorsListResponse: any) => {
      this.doctorsList = doctorsListResponse.status.data;
    })
  }
  OnDoctorSelection(DoctorId: any) {
    this.SlotDate = "";
    this.slotDateList = [];
    this.appointmentData.SlotId = "";
    this.slotTimeList = [];
    this.appointmentData.Notes = "";
    this.DoctorId = DoctorId;
    this.ConsultationFee = this.doctorsList.filter(x => x.DoctorId == DoctorId)[0].ConsultationFee;
    this.slotsService.getSlotsByDoctorId(this.DoctorId, this.UserId).subscribe((slotListResponse: any) => {
      if (slotListResponse.status.status == true) {
        this.slotDetailsList = (slotListResponse.status.data).filter((item: { Status: string; SlotTime: any }) => item.Status == 'active' && new Date(item.SlotTime).getTime() > new Date().getTime());
        var slotDateListVar = (slotListResponse.status.data).filter((item: { Status: string; SlotTime: any }) => item.Status == 'active' && new Date(item.SlotTime).getTime() > new Date().getTime());
        let output = [];
        slotDateListVar.forEach((val: { SlotTime: any; }) => {
          var isExist = output.some(data => this.datePipe.transform(new Date(data.SlotTime), 'dd-MM-yyyy') == this.datePipe.transform(new Date(val.SlotTime), 'dd-MM-yyyy'));
          if (!isExist) output.push(val)
        })
        this.slotDateList = output;
      }
    });
  }
  selectDate(slotDate: any) {
    this.appointmentData.SlotId = "";
    this.slotTimeList = [];
    this.appointmentData.Notes = "";
    this.slotTimeList = this.slotDetailsList.filter((item: { SlotTime: any; }) => this.datePipe.transform(new Date(item.SlotTime), 'dd-MM-yyyy') == this.datePipe.transform(new Date(slotDate), 'dd-MM-yyyy'));
  }
  selectTime() {
    this.appointmentData.Notes = "";
  }
  appointmentFun() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.appointmentData.UserId = this.UserId;
    this.appointmentData.CreatedBy = this.UserId;
    this.appointmentData.Status = "Active";
    // this.appointmentData.PatientStatus = "OP";
    this.appointmentData.ConsultationFee = this.ConsultationFee;
    this.appointmentData.CreatedDate = this.datePipe.transform(new Date(), 'MM-dd-yyyy HH:mm');
    this.appointmentService.appointmentData({ data: this.appointmentData }, this.UserId).subscribe((appointmentDataRes: any) => {
      if (appointmentDataRes.status == true) {
        this.router.navigate(["user/dashboard"]);
        swal({
          title: "Appointment Created Successfully"
        });
      } else {
        swal({
          title: "Appointment is already created by this User at the same time, Pls Change Time"
        });
        this.appointmentData.CreatedDate = "";
      }
    });
  }
}