import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { RequestCountry } from 'src/app/models/requestCountry';
import { ResponseCountry } from 'src/app/models/responseCountry';
import { AppStateService } from 'src/app/services/app-state.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

    public loading: boolean = false;
    public countryResults: ResponseCountry[] = [];
    private selectedCountries: Country[] = [];

    constructor(private httpService: HttpService, private appStateService: AppStateService) {

    }

    ngOnInit(): void {
        this.appStateService.getListOfSelectedCountries$.subscribe(response => {
            this.selectedCountries = response;
        }, (error) => {
            console.error(error);
            // TODO: Handle this error ..
        })
    }

    getClass(value: string): string {
        return value.toLowerCase() === "failed" ? "red" : "green";
    }

    onTestClick(): void {
        const selectedCountriesRequestBody: RequestCountry[] = this.selectedCountries.map(country => ({ "countryName": country.name }));
        this.httpService.sentTests(selectedCountriesRequestBody).subscribe(response => {
            this.countryResults = response;
        }, (error => {
            console.error(error);
            this.countryResults = [];
            // TODO: Handle error here ...
        }));
    }

}
