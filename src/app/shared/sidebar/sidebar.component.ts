import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatSidenavModule, RouterLink],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  logout() {
    this.auth.logout();
  }

  private returnTo: string = '';
  async authenticate() {
    await this.route.queryParams.subscribe(params => {this.returnTo = params['returnUrl']});
    if (this.auth.login()) {
      this.router.navigateByUrl(this.returnTo);
    }
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) {}
}
