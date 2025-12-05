import { Component, OnInit } from '@angular/core';
import { Setpassword } from '../components/setpassword/setpassword';
import { Verifycode } from '../components/verifycode/verifycode';
import { EnterEmail } from '../components/enter-email/enter-email';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password-layout',
  imports: [CommonModule, Setpassword, Verifycode, EnterEmail],
  templateUrl: './forgot-password-layout.html',
  styleUrl: './forgot-password-layout.scss',
})
export class ForgotPasswordLayout implements OnInit {
  currentStep: 'email' | 'verify' | 'password' = 'email';
  email!: string;

  goToVerification(email: string) {
    console.log('Email for verification:', email);
    this.email = email;
    this.currentStep = 'verify';
  }

  goToSetPassword(code: string) {
    console.log('Code verified:', code); 
    this.currentStep = 'password';
  }

  goToEmail(): void {
    this.currentStep = 'email';
  }

  ngOnInit(): void {
    this.currentStep = 'email';
  }
}
