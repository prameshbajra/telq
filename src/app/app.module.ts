import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { environment } from '../environments/environment';
import { AntDesignModule } from './ant-design/ant-design.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesComponent } from './components/countries/countries.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResultsComponent } from './components/results/results.component';
import { MaterialModule } from './material/material.module';


registerLocaleData(en);

const ngZorroConfig: NzConfig = {
    message: { nzMaxStack: 2 }
};

@NgModule({
    declarations: [
        AppComponent,
        CountriesComponent,
        NavbarComponent,
        ResultsComponent
    ],
    imports: [
        AntDesignModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_CONFIG, useValue: ngZorroConfig }],
    bootstrap: [AppComponent]
})
export class AppModule { }
