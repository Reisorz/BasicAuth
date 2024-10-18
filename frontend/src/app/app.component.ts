import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';


//app.module.ts is not use anymore in Angular 17 or higher. Now all components are standalone and you have to import other components.
//main.ts is the good one now. Don't touch it! In app.config.ts you have to place the providers, like provideHttpClient(withFetch()), provideToastr().


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
