import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import swal from "sweetalert";
import { environment } from '../../services/URL';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  @ViewChild('#myScrollableContainer') private myContainer: ElementRef<HTMLDivElement>;
  ImageURL: any;
  closeResult: any;
  openImageName: any;
  loginId: any;
  doctorList: any;
  searchItem: any;
  loadSymbol: any;

  constructor(
    private doctorService: DoctorService,
    private cookieService: CookieService,
    private router: Router,
    private modalService: NgbModal
  ) { }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (obj.data[0].Id);
    if (this.loginId) {
      this.getDoctorList();
    }
    this.ImageURL = environment.rootUrl + '/loadfile/doctors/';
  }
  getDoctorList() {
    this.doctorService.getDoctorsByHospitalId(this.loginId).subscribe((doctorListResponse: any) => {
      if (doctorListResponse.status.status == true && doctorListResponse.status.data.length > 0 && doctorListResponse.status.data.length != undefined && doctorListResponse.status.data.length != null) {
        this.doctorList = doctorListResponse.status.data;
        this.doctorList = this.doctorList.filter((item: { Status: any }) => item.Status == 'active')
      } else {
        this.doctorList = [];
      }
    });
  }
  editDoctor(editdoctorId: any) {
    this.cookieService.set('editdoctorId', editdoctorId);
    this.router.navigate(["/hospital/doctor/Edit"]);
  }
  deleteDoctor(deletedoctorId: any) {
    if (confirm("Are you sure to delete Doctor?")) {
      var deleteData: any = {}
      deleteData.id = deletedoctorId;
      this.doctorService.doctorDelete(deleteData, this.loginId).subscribe((deleteRes: any) => {
        if (deleteRes.status == true) {
          this.getDoctorList();
          swal({
            title: "Doctor Deleted Successfully!!!"
          });
        } else {
          swal({
            title: deleteRes.message
          });
        }
      });
    }
  }
  open(content: any, imageURL: any) {
    this.openImageName = imageURL;
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
}