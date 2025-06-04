import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from "@angular/core";
import {
	ScreenTrackingService,
	UserTrackingService,
	getAnalytics,
	provideAnalytics,
} from "@angular/fire/analytics";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";

import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { environment } from "./env";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideAuth(() => getAuth()),
		provideAnalytics(() => getAnalytics()),
		ScreenTrackingService,
		UserTrackingService,
		provideFirestore(() => getFirestore()),
		{ provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
	],
};
