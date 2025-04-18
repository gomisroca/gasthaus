import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "gasthaus-bb42f", appId: "1:1014010648331:web:39016c0682180803b9740e", storageBucket: "gasthaus-bb42f.firebasestorage.app", apiKey: "AIzaSyDa_wyAdg69NUGJ5H8rP4kwrl1MC_Dk5DE", authDomain: "gasthaus-bb42f.firebaseapp.com", messagingSenderId: "1014010648331", measurementId: "G-9WFT4PCLXN" })), provideAnalytics(() => getAnalytics()), ScreenTrackingService,
  ],
};
