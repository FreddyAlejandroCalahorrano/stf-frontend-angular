import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SharedModule} from './shared.module';
import {routes} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {
  ExternalAssetsConfig,
  ExternalAssetsModule,
} from '@pichincha/angular-sdk/external-assets';
import {HttpModule} from '@pichincha/angular-sdk/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from 'src/environments/environment';
import {HttpClientModule} from "@angular/common/http";

const assets: Array<ExternalAssetsConfig> = [
  {
    type: 'stylesheet',
    url: '/assets/bootstrap.css',
  },
  {
    type: 'stylesheet',
    url: '/assets/boxicons.min.css',
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: !isIframe ? 'enabled' : 'disabled', // Don't perform initial navigation in iframes
    }),
    HttpModule.forRoot({api_url: environment.apiUrl}),
    HttpClientModule,
    ExternalAssetsModule.forRoot(assets),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
