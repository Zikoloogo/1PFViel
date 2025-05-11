import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  authUser: Observable<any>;

  constructor(private router: Router, private authService: AuthService) {
    // Assign the auth user observable
    this.authUser = this.authService.authUser$;

    // Debug: Log the current user whenever it changes
    this.authUser.subscribe((user) => {
      console.log('Sidebar sees:', user);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
