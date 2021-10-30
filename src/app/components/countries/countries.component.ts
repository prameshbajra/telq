import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { interval, Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { AppStateService } from 'src/app/services/app-state.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss']
})

export class CountriesComponent implements OnInit {

    private subscription: Subscription;
    public listOfCountries: Country[] = [];
    public listOfSelectedCountries: Country[] = [];
    private source = interval(30000);

    constructor(private httpService: HttpService, private appStateService: AppStateService, private message: NzMessageService) {
        this.subscription = this.source.subscribe(val => {
            this.fetchListOfCountries();
        });
    }

    ngOnInit(): void {
        this.fetchListOfCountries();
        this.appStateService.getListOfCountries$.subscribe(response => {
            this.listOfCountries = response;
        });
        this.appStateService.getListOfSelectedCountries$.subscribe(response => {
            this.listOfSelectedCountries = response;
        });
    }

    public onSelectedCountryChange(countries: Country[]) {
        this.appStateService.updateSelectedCountries(countries);
    }

    private fetchListOfCountries(): void {
        this.httpService.getCountriesList().subscribe((response) => {
            this.appStateService.updateCountries(response);
        }, (error) => {
            console.error(error);
            this.appStateService.updateCountries([]);
            this.createMessage("error", "There was a problem getting data from server.");
        })
    }

    public onSelectFocus(): void {
        // this.subscription.unsubscribe();
    }

    public onSelectBlur(): void {
        // this.subscription = this.source.subscribe(val => {
        //     this.fetchListOfCountries();
        // });
    }

    private createMessage(type: string, message: string): void {
        this.message.create(type, message);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
