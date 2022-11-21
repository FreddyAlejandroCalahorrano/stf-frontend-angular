import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { routes } from './app-routing.module';
import {
  ExternalAssetsModule,
  ExternalAssetsConfig,
} from '@pichincha/angular-sdk/external-assets';
import { HttpModule } from '@pichincha/angular-sdk/http';
import { environment } from 'src/environments/environment';
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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpModule.forRoot({
      api_url: environment.apiUrl,
    }),
    HttpClientModule,
    ExternalAssetsModule.forRoot(assets),
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MFModule {}
