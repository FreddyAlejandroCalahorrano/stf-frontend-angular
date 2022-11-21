import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ExternalAssetsModule} from '@pichincha/angular-sdk/external-assets';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/**
 * Components
 */
import {AppComponent} from './app.component';
import {BaseComponent} from './components/base/base.component';
import {InputValueAcessorDirective} from './common/directives/input-value-accessor.directive';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MsalGuard, MsalModule, MsalRedirectComponent} from '@azure/msal-angular';
import {InteractionType, PublicClientApplication} from '@azure/msal-browser';
import {PageErrorComponent} from './components/page-error/page-error.component';
import {SidebarComponent} from "./components/base/sidebar/sidebar.component";
import {PersonasComponent} from "./components/personas/personas.component";
import {ListPersonsComponent} from './components/personas/list-persons/list-persons.component';
import {FormPersonasComponent} from "./components/personas/form-personas/form-personas.component";
import {FilterPersonPipe} from './pipes/filter-person.pipe';
import {PageAsignacionesComponent} from "./components/page-asignaciones/page-asignaciones.component";
import {UiModalComponent} from './components/ui-modal/ui-modal.component';
import {ProfilesPersonComponent} from "./components/personas/profiles-person/profiles-person.component";
import {PSelectComponent} from "./common/components/p-select/p-select.component";
import {ModalTestComponent} from './components/page-asignaciones/modal-test/modal-test.component';
import {BootstrapModalModule} from "./common/modal/bootstrap-modal.module";
import { SkillsPersonasComponent } from './components/personas/skills-personas/skills-personas.component';
import {FilterSkillPipe} from "./pipes/filter-skill.pipe";
import {ChapterPersonasComponent} from "./components/personas/chapter-personas/chapter-personas.component";


const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    InputValueAcessorDirective,
    HeaderComponent,
    FooterComponent,
    PageErrorComponent,
    SidebarComponent,
    PersonasComponent,
    ListPersonsComponent,
    FormPersonasComponent,
    FilterPersonPipe,
    PageAsignacionesComponent,
    UiModalComponent,
    ProfilesPersonComponent,
    PSelectComponent,
    SkillsPersonasComponent,
    ModalTestComponent,
    FilterSkillPipe,
    ChapterPersonasComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ExternalAssetsModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: '61d04daf-778c-4d6b-92de-d1eba0ac3274', // This is your client ID
          authority:
            'https://login.microsoftonline.com/f5b0d682-1497-4db0-9019-660035554e72', // This is your tenant ID
          redirectUri: 'http://localhost:4201/pg-error', // This is your redirect URI
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      }),
      {
        interactionType: InteractionType.Redirect,
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([]),
      }
    ),
  ],
  providers: [
    MsalGuard, // MsalGuard added as provider here
  ],
  exports: [AppComponent, BaseComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [MsalRedirectComponent],
})
export class SharedModule {
}
