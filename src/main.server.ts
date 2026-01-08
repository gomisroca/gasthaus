import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';

import { config } from './app/app.config.server';
import { AppComponent } from './app/components/app.component';

export default function bootstrapServer(url?: string) {
  return renderApplication(
    (context) => bootstrapApplication(AppComponent, { ...config, ...context }),
    { url } // optional URL for SSR
  );
}
