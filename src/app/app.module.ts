// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './views/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Services axios
import { ExampleService } from './services/axios/index';

// Services http request
import { httpInterceptorProviders } from './services/httpRequest/interceptor';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Router
import { AppRoutingModule } from './router/app-routing.module';

// Libs
import { MaterialModule } from './plugins/material.module';
import { IMaskModule } from 'angular-imask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt, 'pt');

// Store
import { StateModule } from './store/store.module';

// Views
import { LayoutComponent } from './views/layout/layout.component';
import { HomeComponent } from './views/home/home.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { DetailsComponent } from './views/details/details.component';

// components
import { HeaderComponent } from './components/header/header.component';
import { CustomLoaderComponent } from './components/custom-loader/custom-loader.component';
import { SnackbarModule } from './components/snackbar/snackbar.module';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    NotfoundComponent,
    HeaderComponent,
    CustomLoaderComponent,
    FormFieldComponent,
    FormSelectComponent,
    DataTableComponent,
    DetailsComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StateModule,
    CommonModule,
    IMaskModule,
    CurrencyMaskModule,
    FormsModule,
    SnackbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    ExampleService,
    HttpClientModule,
    httpInterceptorProviders,
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
