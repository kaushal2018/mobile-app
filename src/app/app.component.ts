import { Component, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private titleService: Title,
    private router: Router,
    public authService: AuthService,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.title = event.url.substr(1) !== '' ? event.url.substr(1) : 'Home';
        this.titleService.setTitle('App-' + this.title);
        this.authService.afAuth.authState.subscribe(auth => {
          if (auth != null) {
            this.renderer.addClass(document.body, 'body-white');
          } else {
            this.renderer.removeClass(document.body, 'body-white');
          }
        });
      }
    });
  }
}
