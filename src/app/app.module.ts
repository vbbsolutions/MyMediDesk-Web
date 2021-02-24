import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './network/http.servie';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { CreateReportComponent } from './components/create-report/create-report.component';
import { SaveReportComponent } from './components/save-report/save-report.component';
import { DatePipe } from "@angular/common";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { KycComponent } from './components/kyc/kyc.component';
import { IndexComponent } from './components/index/index.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginComponent } from './components/login/login.component';
import { MakeAppointmentComponent } from './components/make-appointment/make-appointment.component';
import { LoginHeaderComponent } from './components/login-header/login-header.component';
import { AppDoctorSidebarComponent } from './components/app-doctor-sidebar/app-doctor-sidebar.component';
import { HospitalDashboardComponent } from './components/hospital-dashboard/hospital-dashboard.component';
import { HospitalMyPatientsComponent } from './components/hospital-my-patients/hospital-my-patients.component';
import { HospitalPatientListComponent } from './components/hospital-patient-list/hospital-patient-list.component';
import { HospitalArchievedListComponent } from './components/hospital-archieved-list/hospital-archieved-list.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { DoctorLayoutComponent } from './components/doctor-layout/doctor-layout.component';
import { DoctorHeaderComponent } from './components/doctor-header/doctor-header.component';
import { ContactComponent } from './components/contact/contact.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { AboutComponent } from './components/about/about.component';
import { AmbulanceComponent } from './components/ambulance/ambulance.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { MedicalsComponent } from './components/medicals/medicals.component';
import { HealthInsuranceComponent } from './components/health-insurance/health-insurance.component';
import { ServicesComponent } from './components/services/services.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { SlotComponent } from './components/slot/slot.component';
import { SlotListComponent } from './components/slot-list/slot-list.component';
import { UserHospitalComponent } from './components/user-hospital/user-hospital.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { DoctorAuthenticateComponent } from './components/doctor-authenticate/doctor-authenticate.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DoctorEditComponent } from './components/doctor-edit/doctor-edit.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileAuthenticateComponent } from './components/user-profile-authenticate/user-profile-authenticate.component';
import { HospitalProfileAuthenticateComponent } from './components/hospital-profile-authenticate/hospital-profile-authenticate.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FilterPipe } from './pipes/filter.pipe';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ServicesComponent,
    HealthInsuranceComponent,
    MedicalsComponent,
    DiagnosticsComponent,
    PharmacyComponent,
    AmbulanceComponent,
    HospitalsComponent,
    ContactComponent,
    ForgotPasswordComponent,
    LoginComponent,
    AppComponent,
    UserLayoutComponent,
    AppFooterComponent,
    AuthenticateComponent,
    UpdatePasswordComponent,
    CreateReportComponent,
    SaveReportComponent,
    UserDashboardComponent,
    AppSidebarComponent,
    UserProfileComponent,
    WalletComponent,
    KycComponent,
    AboutComponent,
    MakeAppointmentComponent,
    UserRegisterComponent,
    LoginLayoutComponent,
    LoginHeaderComponent,
    AppDoctorSidebarComponent,
    HospitalDashboardComponent,
    HospitalMyPatientsComponent,
    HospitalPatientListComponent,
    HospitalArchievedListComponent,
    UserHeaderComponent,
    DoctorLayoutComponent,
    DoctorHeaderComponent,
    DoctorProfileComponent,
    SlotComponent,
    SlotListComponent,
    UserHospitalComponent,
    EditAppointmentComponent,
    DoctorRegisterComponent,
    DoctorAuthenticateComponent,
    DoctorListComponent,
    DoctorEditComponent,
    UserProfileAuthenticateComponent,
    HospitalProfileAuthenticateComponent,
    FilterPipe,
    IndexComponent

  ],
  imports: [
    NgxMaterialTimepickerModule,
    DateTimePickerModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    Ng2SearchPipeModule,
    JwPaginationModule,
    NgbModule,
    MatDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    AutocompleteLibModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [MatInputModule],
  providers: [HttpService, CookieService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
