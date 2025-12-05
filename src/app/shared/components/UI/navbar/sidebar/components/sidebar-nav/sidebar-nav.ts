import { Component, Input } from '@angular/core';
import { SidebarLink } from '../../models/sidebar-link';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar-nav',
  imports: [RouterLink, NgClass],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.scss',
})
export class SidebarNav {
  @Input() links: SidebarLink[] = [];
}
