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
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  submitted: boolean = false;
  registerForm: FormGroup;
  appointmentData: any;
  public min = new Date();
  UserId: any;
  hospitalList: any;
  specializationList: any;
  doctorsList: any;
  hospitalId: any;
  specializationId: any;
  specializationAllList: any;
  DoctorId: any;
  slotDetailsList: any;
  Hospital: any;
  Location: any;
  Specialization: any;
  Doctor: any;
  temp: any[];
  appointmentSlotId: any;
  appointmentResult: any;
  appointmentId: any;
  locationList: any;
  SlotDate: any = "";
  slotDateList: any[];
  slotTimeList: any[];
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
    this.appointmentSlotId = this.cookieService.get('appointmentSlotId');
    this.appointmentId = this.cookieService.get('appointmentId');
    if (this.UserId && this.appointmentSlotId) {
      this.slotsService.getSlotDetails(this.UserId).subscribe((slotDetailsResponse: any) => {
        var slotDetailsAllList = slotDetailsResponse.status.data;
        this.appointmentResult = slotDetailsAllList.filter(item => item.Id == this.appointmentSlotId);
        if (this.appointmentResult && this.appointmentResult.length > 0) {
          this.hospitalService.getHospitalList(this.UserId).subscribe((hospitalListResponse: any) => {
            var locationListVar = hospitalListResponse.status.data;
            let output = [];
            locationListVar.forEach((val: { City: any; }) => {
              var isExist = output.some(data => data.City == val.City);
              if (!isExist) output.push(val)
            })
            this.locationList = output;
            this.Location = this.appointmentResult[0].City;
            this.hospitalList = this.locationList;
            this.Hospital = this.appointmentResult[0].HospitalId;
            this.hospitalService.getSpecializationByHospitalId(this.appointmentResult[0].HospitalId, this.UserId).subscribe((specializationListResponse: any) => {
              this.specializationAllList = specializationListResponse.status.data;
              let output = [];
              this.specializationAllList.forEach((val: { SpecializationId: any; }) => {
                var isExist = output.some(data => data.SpecializationId == val.SpecializationId);
                if (!isExist) output.push(val)
              })
              this.specializationList = output;
              this.Specialization = this.appointmentResult[0].SpecializationId;
              this.doctorService.getDoctorsBySpecializationId(this.appointmentResult[0].HospitalId, this.appointmentResult[0].SpecializationId, this.UserId).subscribe((doctorsListResponse: any) => {
                this.doctorsList = doctorsListResponse.status.data;
                this.Doctor = this.appointmentResult[0].DoctorId;
                this.slotsService.getSlotDetails(this.UserId).subscribe((slotDetailsResponse: any) => {
                  this.appointmentService.getAppointmentList(this.UserId).subscribe((appointmentResponse: any) => {
                    var appointmentList = appointmentResponse.data;
                    appointmentList = appointmentList.filter(item => item.HospitalId == this.appointmentResult[0].HospitalId && item.SpecializationId == this.appointmentResult[0].SpecializationId && item.DoctorId == this.appointmentResult[0].DoctorId && item.SlotId == this.appointmentSlotId);
                    this.appointmentData = appointmentList[0];
                    this.ConsultationFee = this.appointmentData.ConsultationFee;
                  });
                  var slotDetailsAllList = slotDetailsResponse.status.data;
                  this.slotDetailsList = slotDetailsAllList.filter(item => item.Status == 'active' && item.HospitalId == this.appointmentResult[0].HospitalId && item.SpecializationId == this.appointmentResult[0].SpecializationId && item.DoctorId == this.appointmentResult[0].DoctorId && new Date(item.SlotTime).getTime() > new Date().getTime());
                  let output = [];
                  this.slotDetailsList.forEach((val: { SlotTime: any; }) => {
                    var isExist = output.some(data => this.datePipe.transform(new Date(data.SlotTime), 'dd-MM-yyyy') == this.datePipe.transform(new Date(val.SlotTime), 'dd-MM-yyyy'));
                    if (!isExist) output.push(val)
                  })

                  this.SlotDate = this.datePipe.transform(new Date(this.appointmentResult[0].SlotTime), 'dd-MM-yyyy');
                  this.slotDateList = output;
                  this.slotTimeList = this.slotDetailsList.filter((item: { SlotTime: any; }) => this.datePipe.transform(new Date(item.SlotTime), 'dd-MM-yyyy') == this.SlotDate);
                });
              })
            })
          });
        }
      });
    }
    this.registerForm = this.formBuilder.group({
      Hospital: ['', Validators.required],
      Location: ['', Validators.required],
      Specialization: ['', Validators.required],
      ConsultationFee: ['', Validators.required],
      Doctor: ['', Validators.required],
      SlotDate: ['', Validators.required],
      SlotId: ['', Validators.required],
      Notes: ['', Validators.required],
    });
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
      this.specializationAllList.forEach((val: { Id: any; }) => {
        var isExist = output.some(data => data.Id == val.Id);
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
    this.doctorService.getDoctorsBySpecializationId(this.appointmentResult[0].HospitalId, this.specializationId, this.UserId).subscribe((doctorsListResponse: any) => {
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
    this.slotTimeList = this.slotDetailsList.filter((item: { SlotTime: any; }) => this.datePipe.transform(new Date(item.SlotTime), 'dd-MM-yyyy') == slotDate);
  }
  selectTime() {
    this.appointmentData.Notes = "";
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
    this.submitted = false;
    this.registerForm.reset();
  }
  editAppointmentFun() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let tempAppointmentDate = {
      UserId: this.UserId,
      SlotId: this.appointmentData.SlotId,
      ConsultationFee: this.ConsultationFee,
      Notes: this.appointmentData.Notes
    };
    this.appointmentData.UserId = this.UserId;
    this.appointmentService.editAppointment({ data: tempAppointmentDate, id: this.appointmentId }, this.UserId).subscribe((appointmentDataRes: any) => {
      if (appointmentDataRes.status == true) {
        this.router.navigate(["user/dashboard"]);
        swal({
          title: "Appointment Updated Successfully"
        });
      } else {
        swal({
          title: "Appointment is already created by this User at the same time, Pls Change Time"
        });
      }
    });
  }
}