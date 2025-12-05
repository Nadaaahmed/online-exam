import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Socialicons } from './socialicons/socialicons';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterLink, RouterOutlet, Socialicons],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {}
