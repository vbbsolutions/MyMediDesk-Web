import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { LoginComponent } from './components/login/login.component';
import { MakeAppointmentComponent } from './components/make-appointment/make-appointment.component';
import { ContactComponent } from './components/contact/contact.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { AboutComponent } from './components/about/about.component';
import { AmbulanceComponent } from './components/ambulance/ambulance.component';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { HealthInsuranceComponent } from './components/health-insurance/health-insurance.component';
import { ServicesComponent } from './components/services/services.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { CreateReportComponent } from './components/create-report/create-report.component';
import { SaveReportComponent } from './components/save-report/save-report.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { KycComponent } from './components/kyc/kyc.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { HospitalDashboardComponent } from './components/hospital-dashboard/hospital-dashboard.component';
import { HospitalMyPatientsComponent } from './components/hospital-my-patients/hospital-my-patients.component';
import { HospitalPatientListComponent } from './components/hospital-patient-list/hospital-patient-list.component';
import { HospitalArchievedListComponent } from './components/hospital-archieved-list/hospital-archieved-list.component';
import { DoctorLayoutComponent } from './components/doctor-layout/doctor-layout.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { SlotComponent } from './components/slot/slot.component';
import { SlotListComponent } from './components/slot-list/slot-list.component';
import { UserHospitalComponent } from './components/user-hospital/user-hospital.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { DoctorAuthenticateComponent } from './components/doctor-authenticate/doctor-authenticate.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { DoctorEditComponent } from './components/doctor-edit/doctor-edit.component';
import { UserProfileAuthenticateComponent } from './components/user-profile-authenticate/user-profile-authenticate.component';
import { HospitalProfileAuthenticateComponent } from './components/hospital-profile-authenticate/hospital-profile-authenticate.component';

const routes: Routes = [
  { path: 'register', component: LoginLayoutComponent, children: [{ path: '', component: UserRegisterComponent }] },
  { path: 'user/authentication', component: LoginLayoutComponent, children: [{ path: '', component: AuthenticateComponent }] },
  { path: 'login', component: LoginLayoutComponent, children: [{ path: '', component: LoginComponent }] },
  { path: 'user/forgotPassword', component: LoginLayoutComponent, children: [{ path: '', component: ForgotPasswordComponent }] },


  { path: '', component: LoginLayoutComponent, children: [{ path: '', component: IndexComponent }] },
  { path: 'hospital/home', component: DoctorLayoutComponent, children: [{ path: '', component: IndexComponent }] },
  { path: 'user/home', component: UserLayoutComponent, children: [{ path: '', component: IndexComponent }] },

  { path: 'about', component: LoginLayoutComponent, children: [{ path: '', component: AboutComponent }] },
  { path: 'hospital/about', component: DoctorLayoutComponent, children: [{ path: '', component: AboutComponent }] },
  { path: 'user/about', component: UserLayoutComponent, children: [{ path: '', component: AboutComponent }] },

  { path: 'services', component: LoginLayoutComponent, children: [{ path: '', component: ServicesComponent }] },
  { path: 'hospital/services', component: DoctorLayoutComponent, children: [{ path: '', component: ServicesComponent }] },
  { path: 'user/services', component: UserLayoutComponent, children: [{ path: '', component: ServicesComponent }] },

  { path: 'ambulance', component: LoginLayoutComponent, children: [{ path: '', component: AmbulanceComponent }] },
  { path: 'hospital/ambulance', component: DoctorLayoutComponent, children: [{ path: '', component: AmbulanceComponent }] },
  { path: 'user/ambulance', component: UserLayoutComponent, children: [{ path: '', component: AmbulanceComponent }] },

  { path: 'pharmacy', component: LoginLayoutComponent, children: [{ path: '', component: PharmacyComponent }] },
  { path: 'hospital/pharmacy', component: DoctorLayoutComponent, children: [{ path: '', component: PharmacyComponent }] },
  { path: 'user/pharmacy', component: UserLayoutComponent, children: [{ path: '', component: PharmacyComponent }] },

  { path: 'diagnostics', component: LoginLayoutComponent, children: [{ path: '', component: DiagnosticsComponent }] },
  { path: 'hospital/diagnostics', component: DoctorLayoutComponent, children: [{ path: '', component: DiagnosticsComponent }] },
  { path: 'user/diagnostics', component: UserLayoutComponent, children: [{ path: '', component: DiagnosticsComponent }] },

  // { path: 'hospitals', component: LoginLayoutComponent, children: [{ path: '', component: HospitalsComponent }] },
  // { path: 'hospital/hospitals', component: DoctorLayoutComponent, children: [{ path: '', component: HospitalsComponent }] },
  // { path: 'user/hospitals', component: UserLayoutComponent, children: [{ path: '', component: HospitalsComponent }] },

  { path: 'healthInsurance', component: LoginLayoutComponent, children: [{ path: '', component: HealthInsuranceComponent }] },
  { path: 'hospital/healthInsurance', component: DoctorLayoutComponent, children: [{ path: '', component: HealthInsuranceComponent }] },
  { path: 'user/healthInsurance', component: UserLayoutComponent, children: [{ path: '', component: HealthInsuranceComponent }] },

  { path: 'hospitals', component: LoginLayoutComponent, children: [{ path: '', component: HospitalsComponent }] },
  { path: 'hospital/hospitals', component: DoctorLayoutComponent, children: [{ path: '', component: HospitalsComponent }] },
  { path: 'user/hospitals', component: UserLayoutComponent, children: [{ path: '', component: UserHospitalComponent }] },

  { path: 'contact', component: LoginLayoutComponent, children: [{ path: '', component: ContactComponent }] },
  { path: 'hospital/contact', component: DoctorLayoutComponent, children: [{ path: '', component: ContactComponent }] },
  { path: 'user/contact', component: UserLayoutComponent, children: [{ path: '', component: ContactComponent }] },

  { path: 'makeAppointment', component: LoginLayoutComponent, children: [{ path: '', component: MakeAppointmentComponent }] },
  { path: 'user/makeAppointment', component: UserLayoutComponent, children: [{ path: '', component: MakeAppointmentComponent }] },
  { path: 'user/editAppointment', component: UserLayoutComponent, children: [{ path: '', component: EditAppointmentComponent }] },

  { path: 'hospital/dashboard', component: DoctorLayoutComponent, children: [{ path: '', component: HospitalDashboardComponent }] },
  { path: 'user/dashboard', component: UserLayoutComponent, children: [{ path: '', component: UserDashboardComponent }] },

  { path: 'hospital/DoctorList', component: DoctorLayoutComponent, children: [{ path: '', component: DoctorListComponent }] },
  { path: 'hospital/doctor/Edit', component: DoctorLayoutComponent, children: [{ path: '', component: DoctorEditComponent }] },
  { path: 'hospital/doctorRegister', component: DoctorLayoutComponent, children: [{ path: '', component: DoctorRegisterComponent }] },

  { path: 'hospital/slot', component: DoctorLayoutComponent, children: [{ path: '', component: SlotComponent }] },
  { path: 'hospital/slotList', component: DoctorLayoutComponent, children: [{ path: '', component: SlotListComponent }] },

  { path: 'hospital/myPatients', component: DoctorLayoutComponent, children: [{ path: '', component: HospitalMyPatientsComponent }] },
  { path: 'hospital/emailVerfication', component: DoctorLayoutComponent, children: [{ path: '', component: DoctorAuthenticateComponent }] },
  { path: 'user/kyc', component: UserLayoutComponent, children: [{ path: '', component: KycComponent }] },

  { path: 'hospital/patientList', component: DoctorLayoutComponent, children: [{ path: '', component: HospitalPatientListComponent }] },
  { path: 'hospital/archievedList', component: DoctorLayoutComponent, children: [{ path: '', component: HospitalArchievedListComponent }] },

  { path: 'hospital/profile', component: DoctorLayoutComponent, children: [{ path: '', component: DoctorProfileComponent }] },
  { path: 'user/profile', component: UserLayoutComponent, children: [{ path: '', component: UserProfileComponent }] },
  { path: 'user/profile/authenticate', component: UserLayoutComponent, children: [{ path: '', component: UserProfileAuthenticateComponent }] },

  { path: 'hospital/updatePassword', component: DoctorLayoutComponent, children: [{ path: '', component: UpdatePasswordComponent }] },
  { path: 'user/updatePassword', component: UserLayoutComponent, children: [{ path: '', component: UpdatePasswordComponent }] },
  { path: 'hospital/profile/authenticate', component: DoctorLayoutComponent, children: [{ path: '', component: HospitalProfileAuthenticateComponent }] },

  { path: 'user/wallet', component: UserLayoutComponent, children: [{ path: '', component: WalletComponent }] },

  { path: 'user/createReport', component: UserLayoutComponent, children: [{ path: '', component: CreateReportComponent }] },
  { path: 'user/saveReport', component: UserLayoutComponent, children: [{ path: '', component: SaveReportComponent }] }

];

@NgModule({
  imports:
    [
      RouterModule.forRoot(routes),
      CommonModule,
      FormsModule,
      ReactiveFormsModule
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
