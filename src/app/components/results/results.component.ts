import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
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

    constructor(private httpService: HttpService, private appStateService: AppStateService, private message: NzMessageService) {

    }

    ngOnInit(): void {
        this.appStateService.getListOfSelectedCountries$.subscribe(response => {
            this.selectedCountries = response;
        }, (error) => {
            console.error(error);
            this.createMessage("error", "There was a problem during fetching data.");
        });
    }

    getClass(value: string): string {
        return value.toLowerCase() === "failed" ? "red" : "green";
    }

    onTestClick(): void {
        this.loading = true;
        const selectedCountriesRequestBody: RequestCountry[] = this.selectedCountries.map(country => ({ "countryName": country.name }));
        if (selectedCountriesRequestBody.length === 0) {
            this.loading = false;
            this.createMessage("warning", "No country selected.")
        } else {
            this.httpService.sentTests(selectedCountriesRequestBody).subscribe(response => {
                this.countryResults = response;
                this.loading = false;
            }, (error => {
                console.error(error);
                this.countryResults = [];
                this.loading = false;
                this.createMessage("error", "There was a problem in fetching the results.")
            }));
        }
    }

    private createMessage(type: string, message: string): void {
        this.message.create(type, message);
    }

}
