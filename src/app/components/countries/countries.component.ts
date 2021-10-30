import { Component, OnInit } from '@angular/core';
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

    constructor(private httpService: HttpService, private appStateService: AppStateService) {
        // TODO: Change this to 30000 ...
        const source = interval(10000);
        this.subscription = source.subscribe(val => {
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

    onSelectedCountryChange(countries: Country[]) {
        this.appStateService.updateSelectedCountries(countries);
    }

    private fetchListOfCountries(): void {
        this.httpService.getCountriesList().subscribe((response) => {
            this.appStateService.updateCountries(response);
        }, (error) => {
            this.appStateService.updateCountries([]);
            console.error(error);
            // TODO: Handle this properly ...
        })
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
