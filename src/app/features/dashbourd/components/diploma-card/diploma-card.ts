import { Component, Input } from '@angular/core';
import { Diploma } from '../../models/diploma';

@Component({
  selector: 'app-diploma-card',
  imports: [],
  templateUrl: './diploma-card.html',
  styleUrl: './diploma-card.scss',
})
export class DiplomaCard {
  @Input() diploma!: Diploma;
}
