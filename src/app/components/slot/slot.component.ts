import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { HospitalService } from '../../services/hospital.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { SlotsService } from '../../services/Slots.service';
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})

export class SlotComponent implements OnInit {
  // .setDate(new Date().getDate() + 1);
  submitted: boolean = false;
  createSlotForm: FormGroup;
  courseData: any;
  loginId: any;
  showButton = true;
  slotList: any = [];
  slotTimeList: any = [];
  slotDisplayList: any = [];
  morningStatus: boolean = false;
  eveningStatus: boolean = false;
  bothStatus: boolean = false;
  doctorList: any;
  i: number = 0;
  event: any;
  setDoctorId: any;
  specializationAllList: any;
  specializationList: any[];
  specializationId: any = "";
  min: Date;

  constructor(
    private formBuilder: FormBuilder,
    private slotsService: SlotsService,
    private doctorService: DoctorService,
    private datePipe: DatePipe,
    private router: Router,
    private cookieService: CookieService,
    private hospitalService: HospitalService
  ) {
    this.courseData = {
      DoctorId: "",
      FromDate: "",
      ToDate: "",
      SessionsPerDay: "",
      SlotDuration: "",
      BreakTime: "",
      dayStatus: "",
      MngStartTime: "",
      EvngStartTime: ""
    }
  }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (obj.data[0].Id);
    if (this.loginId) {
      this.getSpecializationByHospitalId();
    }
    var date = new Date();
    this.min = new Date(date.setDate(date.getDate() - 1));
    this.createSlotForm = this.formBuilder.group({
      DoctorId: ['', Validators.required],
      specializationId: ['', Validators.required],
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      SessionsPerDay: ['', Validators.required],
      SlotDuration: ['', Validators.required],
      BreakTime: ['', Validators.required],
      sessionShift: [''],
      MngStartTime: [''],
      EvngStartTime: ['']
    });
    $(".keyDisabled").keydown(function (event) {
      return false;
    });
  }
  keyDisable(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode >= 7 && charCode <= 222) {
      return false;
    }
    return true;
  }
  getSpecializationByHospitalId() {
    this.hospitalService.getSpecializationByHospitalId(this.loginId, this.loginId).subscribe((specializationListResponse: any) => {
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
    this.doctorList = this.specializationList.filter((item: { SpecializationId: any }) => item.SpecializationId == specializationId);
  }
  get slotControl() {
    return this.createSlotForm.controls;
  }
  morningFunction() {
    this.morningStatus = true;
    this.eveningStatus = false;
  }
  eveningFunction() {
    this.morningStatus = false;
    this.eveningStatus = true;
  }
  bothFunction() {
    this.morningStatus = true;
    this.eveningStatus = true;
  }
  clearRadioButtons() {
    this.morningStatus = false;
    this.eveningStatus = false;
    this.slotDisplayList = [];
    this.slotTimeList = [];
    this.slotList = [];
  }
  createSlots() {
    this.submitted = true;
    if (this.createSlotForm.invalid) {
      return;
    }
    this.setDoctorId = this.courseData.DoctorId;
    if (this.courseData.MngStartTime || this.courseData.EvngStartTime) {
      var k = 0;
      this.slotDisplayList = [];
      this.slotTimeList = [];
      this.slotList = [];
      var Difference_In_Time = new Date(this.courseData.ToDate).getTime() - new Date(this.courseData.FromDate).getTime();
      var noOfDays: number = Difference_In_Time / (1000 * 3600 * 24) + 1;
      for (let i = 1; i <= noOfDays; i++) {
        if (this.courseData.dayStatus == 'M' || this.courseData.dayStatus == 'E') {
          var fromDate: any = this.courseData.FromDate;
          if (this.courseData.dayStatus == 'M') {
            this.courseData.SlotDate = new Date(fromDate.setDate(fromDate.getDate() + (k)));
            let arr = this.courseData.MngStartTime.split(':');
            let hrs = parseInt(arr[0]);
            let mins = parseInt(arr[1]);
            fromDate.setHours(hrs);
            fromDate.setMinutes(mins);
          }
          if (this.courseData.dayStatus == 'E') {
            this.courseData.SlotDate = new Date(fromDate.setDate(fromDate.getDate() + (k)));
            let arr = this.courseData.EvngStartTime.split(':');
            let hrs = parseInt(arr[0]) + 12;
            let mins = parseInt(arr[1]);
            fromDate.setHours(hrs);
            fromDate.setMinutes(mins);
          }
          for (let j = 0; j < this.courseData.SessionsPerDay; j++) {
            var slot: any = {};
            slot.SlotDate = this.datePipe.transform(fromDate, 'dd-MMM-yyyy');
            slot.SlotTime = this.datePipe.transform(fromDate, 'HH:mm');
            slot.SlotTimeShow = this.datePipe.transform(fromDate, 'hh:mm a');
            fromDate.setMinutes(fromDate.getMinutes() + parseInt(this.courseData.SlotDuration));
            slot.SlotEndTime = this.datePipe.transform(fromDate, 'HH:mm');
            slot.SlotEndTimeShow = this.datePipe.transform(fromDate, 'hh:mm a');
            fromDate.setMinutes(fromDate.getMinutes() + parseInt(this.courseData.BreakTime));
            this.slotList.push(slot);
            if (i == 1) {
              this.slotTimeList.push(slot);
            }
          }
          this.courseData.Slots = this.slotList;
          this.slotDisplayList.push({ SlotDate: this.courseData.SlotDate, SlotTimings: this.slotTimeList });
          k = 1;
        } else {
          var fromDate: any = this.courseData.FromDate;
          this.courseData.SlotDate = new Date(fromDate.setDate(fromDate.getDate() + (k)));
          let arr = this.courseData.MngStartTime.split(':');
          let hrs = parseInt(arr[0]);
          let mins = parseInt(arr[1]);
          fromDate.setHours(hrs);
          fromDate.setMinutes(mins);
          for (let j = 0; j < this.courseData.SessionsPerDay; j++) {
            var slot: any = {};
            slot.SlotDate = this.datePipe.transform(fromDate, 'dd-MMM-yyyy');
            slot.SlotTime = this.datePipe.transform(fromDate, 'HH:mm');
            slot.SlotTimeShow = this.datePipe.transform(fromDate, 'hh:mm a');
            fromDate.setMinutes(fromDate.getMinutes() + parseInt(this.courseData.SlotDuration));
            slot.SlotEndTime = this.datePipe.transform(fromDate, 'HH:mm');
            slot.SlotEndTimeShow = this.datePipe.transform(fromDate, 'hh:mm a');
            fromDate.setMinutes(fromDate.getMinutes() + parseInt(this.courseData.BreakTime));
            this.slotList.push(slot);
            if (i == 1) {
              this.slotTimeList.push(slot);
            }
          }
          if (true) {
            // this.courseData.SlotDate = new Date(fromDate.setDate(fromDate.getDate() + (k)));
            let arr = this.courseData.EvngStartTime.split(':');
            let hrs = parseInt(arr[0]) + 12;
            let mins = parseInt(arr[1]);
            fromDate.setHours(hrs);
            fromDate.setMinutes(mins);
            for (let j = 0; j < this.courseData.SessionsPerDay; j++) {
              var slot: any = {};
              slot.SlotDate = this.datePipe.transform(fromDate, 'dd-MMM-yyyy');
              slot.SlotTime = this.datePipe.transform(fromDate, 'HH:mm');
              slot.SlotTimeShow = this.datePipe.transform(fromDate, 'hh:mm a');
              fromDate.setMinutes(fromDate.getMinutes() + parseInt(this.courseData.SlotDuration));
              slot.SlotEndTime = this.datePipe.transform(fromDate, 'HH:mm');
              slot.SlotEndTimeShow = this.datePipe.transform(fromDate, 'hh:mm a');
              fromDate.setMinutes(fromDate.getMinutes() + parseInt(this.courseData.BreakTime));
              this.slotList.push(slot);
              if (i == 1) {
                this.slotTimeList.push(slot);
              }
            }
            this.courseData.Slots = this.slotList;
            this.slotDisplayList.push({ SlotDate: this.courseData.SlotDate, SlotTimings: this.slotTimeList });
            k = 1;
          }
        }
      }
      // console.log(this.slotDisplayList);
      // console.log(this.slotTimeList);
      // console.log(this.slotList);
      this.specializationId = "";
      this.courseData.DoctorId = "";
      this.courseData.FromDate = null;
      this.courseData.ToDate = null;
      this.courseData.SessionsPerDay = "";
      this.courseData.SlotDuration = "";
      this.courseData.BreakTime = "";
      this.courseData.MngStartTime = null;
      this.courseData.EvngStartTime = null;
      this.courseData.dayStatus = "";
      this.morningStatus = false;
      this.eveningStatus = false;
      this.bothStatus = false;
      this.submitted = false;
    } else {
      alert("Please Select Shift and Time")
    }
  }
  onCreateSlot() {
    var slotTimes: any = {};
    if (this.i < this.slotList.length) {
      slotTimes.SlotTime = this.datePipe.transform(new Date(this.slotList[this.i].SlotDate + " " + this.slotList[this.i].SlotTime), 'yyyy-MM-dd HH:mm');
      slotTimes.DoctorId = this.setDoctorId;
      slotTimes.CreatedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm');
      slotTimes.Status = "Active";
      this.slotsService.slotData({ data: slotTimes }).subscribe((slotDataRes: any) => {
        if (slotDataRes.status == true) {
          this.i++;
          this.onCreateSlot();
        } else {
          swal({
            title: "Slot is already created by this doctor at the same time, Pls Change Time"
          });
        }
      });
    } else {
      this.router.navigate(["/hospital/slotList"]);
      swal({
        title: "Slot Created Successfully"
      });
    }
  }
}