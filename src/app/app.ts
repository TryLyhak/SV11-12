import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';
@Component({
  selector: 'app-root',
  imports: [Footer, RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'ng_web';
}
