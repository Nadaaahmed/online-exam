import { Component, inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Reusableinput } from '../../../../../../shared/ui/components/atoms/reusableinput/reusableinput';
import { FormButton } from '../../../../../../shared/ui/components/atoms/form-button/form-button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  passwordsMatchValidator,
  passwordPatternValidator,
} from '../../../../../../shared/utils/password-validators';
import { AuthService } from '../../../../../../../../projects/auth-lib/src/lib/service/auth.service';

@Component({
  selector: 'app-setpassword',
  imports: [ReactiveFormsModule, Reusableinput, FormButton],
  templateUrl: './setpassword.html',
  styleUrl: './setpassword.scss',
})
export class Setpassword implements OnDestroy {
  @Input() email!: string;
  @Output() back = new EventEmitter<void>();

  setPasswordForm: FormGroup;
  private _authService = inject(AuthService);
  private _subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    this.setPasswordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, passwordPatternValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator() }
    );
  }

  resetPassword() {
    if (this.setPasswordForm.invalid) return;

    const newPassword = this.setPasswordForm.value.newPassword;

    const sub = this._authService.resetPassword({ email: this.email, newPassword }).subscribe({
      next: () => console.log('Password reset successful!'),
      error: (err) => console.error('Error resetting password', err),
    });
    this._subscription.add(sub);
  }

  goBack() {
    this.back.emit();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
