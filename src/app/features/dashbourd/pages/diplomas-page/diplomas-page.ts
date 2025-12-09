import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  PLATFORM_ID,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DiplomaCard } from '../../components/diploma-card/diploma-card';
import { Diploma } from '../../models/diploma';
import { DiplomasService } from '../../services/diplomas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diplomas-page',
  imports: [CommonModule, DiplomaCard],
  templateUrl: './diplomas-page.html',
  styleUrls: ['./diplomas-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiplomasPage implements OnInit {
  diplomas: Diploma[] = [];
  isLoading = true;
  errorMessage = '';
  platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(private diplomasService: DiplomasService, private router: Router) {}

  ngOnInit() {
    // التأكد أن الكود يعمل فقط على المتصفح
    if (isPlatformBrowser(this.platformId)) {
      this.loadDiplomas();
    }
  }

  loadDiplomas() {
    this.isLoading = true;
    this.diplomasService.getSubjects().subscribe({
      next: (res) => {
        this.diplomas = res;
        this.isLoading = false;
        this.cdr.markForCheck(); // ✅ أجبر Angular يحدث العرض
      },
      error: (err) => {
        this.errorMessage = 'Failed to load diplomas';
        this.isLoading = false;
        this.cdr.markForCheck(); // ✅ أجبر العرض عند الخطأ
        console.error(err);
      },
    });
  }

  onDiplomaClick(diploma: Diploma) {
    this.router.navigate(['/dashboard/exams', diploma._id]);
  }
}
