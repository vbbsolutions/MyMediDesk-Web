import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, RequiredValidator } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { WalletService } from '../../services/wallet.service';
import swal from "sweetalert";
import { WalletRequestDetailsService } from '../../services/walletRequestDetails.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  submitted: boolean = false;
  bankForm: FormGroup;
  bankDetails: any;
  loginId: any;
  BankDocURL: any;
  walletRequestDetailsDataLength: any;
  walletRequestDetailsData: any;
  walletAmount: number;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private walletService: WalletService,
    private walletRequestDetailsService: WalletRequestDetailsService
  ) {
    this.bankDetails = {
      ACName: "",
      ACNumber: "",
      IFSC: "",
      Branch: "",
      Bank: "",
      Amount: "",
      Notes: ""
    }
  }
  ngOnInit(): void {
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (obj.data[0].Id);
    if (this.loginId) {
      this.getWalletAmount();
      this.getWalletRequestDetails();
    }
    var obj = JSON.parse(this.cookieService.get('AppUser'));
    this.loginId = (obj.data[0].Id);
    this.bankForm = this.formBuilder.group({
      ACName: ['', Validators.required],
      ACNumber: ['', Validators.required],
      IFSC: ['', Validators.required],
      Branch: ['', Validators.required],
      Bank: ['', Validators.required],
      Amount: ['', Validators.required],
      BankDocURL: ['', Validators.required],
      Notes: ['', Validators.required]
    });
  }
  get bankDetailsControl() {
    return this.bankForm.controls;
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
    this.bankForm.reset();
  }
  getWalletRequestDetails() {
    this.walletRequestDetailsService.getWalletRequestDetails(this.loginId).subscribe((walletRequestDetailsRes: any) => {
      if (walletRequestDetailsRes.status == true) {
        this.walletRequestDetailsData = walletRequestDetailsRes.data;
        this.walletRequestDetailsDataLength = walletRequestDetailsRes.data.length == undefined ? 0 : walletRequestDetailsRes.data.length;
      } else {
        swal({
          title: walletRequestDetailsRes.status
        });
      }
    }, (err: any) => {
      swal({
        title: "There is a Network Issue Please check your Internet connection"
      });
    });
  }
  onSelectFile(event: any) {
    if (this.loginId && this.loginId != undefined && this.loginId != null) {
      if (event.target.files && event.target.files[0]) {
        const walletRequestDetailsFile = new FormData();
        walletRequestDetailsFile.append('request', event.target.files[0]);
        this.walletRequestDetailsService.walletRequestDetailsFile(walletRequestDetailsFile, this.loginId).subscribe((walletRequestDetailsFileRes: any) => {
          if (walletRequestDetailsFileRes.status == true && walletRequestDetailsFileRes && walletRequestDetailsFileRes != null && walletRequestDetailsFileRes != undefined) {
            this.BankDocURL = walletRequestDetailsFileRes.data.RequestURL;
          } else {
            swal({
              title: "Upload file should be in PNG or JPEG Format!!!"
            });
          }
        }, (err: any) => {
          swal({
            title: "There is a Network Issue Please check your Internet connection"
          });
        });
      }
    }
  }
  submitWalletRequestDetailsData() {
    this.submitted = true;
    if (this.bankForm.invalid) {
      return;
    }
    if (this.loginId && this.loginId != null && this.loginId != undefined) {
      if (this.walletAmount >= this.bankDetails.Amount) {
        this.walletService.walletCreation({ data: { UserId: this.loginId } }, this.loginId).subscribe((walletCreationRes: any) => {
          if (walletCreationRes.status == true && walletCreationRes.data.Id && walletCreationRes.data.Id != null && walletCreationRes.data.Id != undefined) {
            this.bankDetails.WalletRequestId = walletCreationRes.data.Id;
            this.bankDetails.UserId = this.loginId;
            this.bankDetails.BankDocURL = this.BankDocURL;
            this.walletRequestDetailsService.walletRequestDetailsCreation({ data: this.bankDetails }, this.loginId).subscribe((walletRequestDetailsRes: any) => {
              if (walletRequestDetailsRes.status == true) {
                this.getWalletRequestDetails();
                swal({
                  title: walletRequestDetailsRes.message
                });
                this.bankDetails = {};
                this.submitted = false;
              } else {
                swal({
                  title: walletRequestDetailsRes.message
                });
              }
            }, (err: any) => {
              swal({
                title: "There is a Network Issue Please check your Internet connection"
              });
            });
          } else {
            swal({
              title: walletCreationRes.message
            });
          }
        }, (err: any) => {
          swal({
            title: "There is a Network Issue Please check your Internet connection"
          });
        });
      } else {
        swal({
          title: "Sorry, Insufficent Wallet Amount"
        });
      }
    } else {
      swal({
        title: "Login ID Error"
      });
    }
  }
  getWalletAmount() {
    this.walletService.getWalletAmount(this.loginId).subscribe((walletAmountRes: any) => {
      if (walletAmountRes.status == true) {
        this.walletAmount = walletAmountRes.data[0].TotalAmount;
      } else {
        swal({
          title: walletAmountRes.status
        });
      }
    }, (err: any) => {
      swal({
        title: "There is a Network Issue Please check your Internet connection"
      });
    });
  }
}