import { Component, inject, OnDestroy } from '@angular/core';
import { Reusableinput } from '../../../../shared/ui/components/atoms/reusableinput/reusableinput';
import { FormButton } from '../../../../shared/ui/components/atoms/form-button/form-button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  passwordsMatchValidator,
  passwordPatternValidator,
} from '../../../../shared/utils/password-validators';
import { AuthService } from '../../../../../../projects/auth-lib/src/lib/service/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, Reusableinput, FormButton],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnDestroy {
  private _authService = inject(AuthService);
  private router = inject(Router);
  private _subscription = new Subscription();

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, passwordPatternValidator()]],
        rePassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      },
      { validators: passwordsMatchValidator() }
    );
  }

signUp() {
  if (this.signUpForm.invalid) {
    this.signUpForm.markAllAsTouched();
    return;
  }

  const data = this.signUpForm.value; // include rePassword

  const sub = this._authService.register(data).subscribe({
    next: (res) => {
      console.log('REGISTER SUCCESS', res);
      this.router.navigate(['/auth/signin']);
    },
    error: (err) => {
      console.log('REGISTER ERROR', err);
    },
  });
  this._subscription.add(sub);
}


  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
