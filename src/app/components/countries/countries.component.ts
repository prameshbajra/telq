import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Country } from 'src/app/models/country';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss']
})

export class CountriesComponent implements OnInit {

    private subscription: Subscription;
    public listOfCountries: Country[] = [];
    public listOfSelectedCountries = [];


    constructor(private httpService: HttpService) {
        // TODO: Change this to 30000 ...
        const source = interval(10000);
        this.subscription = source.subscribe(val => {
            this.fetchListOfCountries();
        });
    }

    ngOnInit(): void {
        this.fetchListOfCountries();
    }

    private fetchListOfCountries(): void {
        this.httpService.getCountriesList().subscribe((response) => {
            this.listOfCountries = response;
        }, (error) => {
            this.listOfCountries = [];
            console.error(error);
            // TODO: Handle this properly ...
        })
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
