import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this
import { importProvidersFrom } from '@angular/core'; // For including the module as a provider
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync(),
    MatDialogModule // Correct way to include BrowserAnimationsModule
  ]
}).catch((err) => console.error(err));
