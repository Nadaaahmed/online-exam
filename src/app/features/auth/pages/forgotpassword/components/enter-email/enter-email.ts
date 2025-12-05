import { Component, Output, EventEmitter, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reusableinput } from '../../../../../../shared/ui/components/atoms/reusableinput/reusableinput';
import { FormButton } from '../../../../../../shared/ui/components/atoms/form-button/form-button';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../../../../projects/auth-lib/src/lib/service/auth.service';

@Component({
  selector: 'app-enter-email',
  imports: [ReactiveFormsModule, Reusableinput, FormButton],
  templateUrl: './enter-email.html',
  styleUrl: './enter-email.scss',
})
export class EnterEmail implements OnDestroy {
  emailForm: FormGroup;
  private _authService = inject(AuthService);
  private _subscription = new Subscription();
  @Output() next = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendCode() {
    if (this.emailForm.invalid) return;

    const email = this.emailForm.value.email;
    console.log('Sending email:', email);

    const sub = this._authService.forgetPassword({ email }).subscribe({
      next: () => this.next.emit(email), 
      error: (err) => console.log('Error sending code', err),
    });
    this._subscription.add(sub);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
