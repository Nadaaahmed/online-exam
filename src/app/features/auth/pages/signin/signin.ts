import { AuthService } from './../../../../../../projects/auth-lib/src/lib/service/auth.service';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reusableinput } from '../../../../shared/ui/components/atoms/reusableinput/reusableinput';
import { FormButton } from '../../../../shared/ui/components/atoms/form-button/form-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, RouterLink, Reusableinput, ReactiveFormsModule, FormButton],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin implements OnDestroy {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _subscription = new Subscription();

  loading = false;
  errorMessage = '';

  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  login() {
    if (this.signInForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const body = this.signInForm.value;

    const sub = this._authService.login(body).subscribe({
      next: () => {
        this.loading = false;
        this._router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Invalid email or password';
      },
    });

    this._subscription.add(sub);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
