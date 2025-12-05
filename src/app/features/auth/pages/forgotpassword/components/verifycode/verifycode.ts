import { Component, inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Reusableinput } from '../../../../../../shared/ui/components/atoms/reusableinput/reusableinput';
import { FormButton } from '../../../../../../shared/ui/components/atoms/form-button/form-button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../../../../projects/auth-lib/src/lib/service/auth.service';

@Component({
  selector: 'app-verifycode',
  imports: [ReactiveFormsModule, Reusableinput, FormButton],
  templateUrl: './verifycode.html',
  styleUrl: './verifycode.scss',
})
export class Verifycode implements OnDestroy {
  @Input() email!: string;
  @Output() next = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  verifyCodeForm: FormGroup;
  private _authService = inject(AuthService);
  private _subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    this.verifyCodeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitCode() {
    if (this.verifyCodeForm.invalid) return;

    const code = this.verifyCodeForm.value.code;
    console.log('Submitting code:', code);
    const sub = this._authService
      .verifyCode({
        email: this.email,
        resetCode: code,
      })
      .subscribe({
        next: () => this.next.emit(code),
        error: (err) => console.error('Error verifying code', err),
      });

    this._subscription.add(sub);
  }

  resendCode() {
    const sub = this._authService.forgetPassword({ email: this.email }).subscribe({
      next: () => console.log('Code resent successfully'),
      error: (err) => console.error('Error resending code', err),
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
