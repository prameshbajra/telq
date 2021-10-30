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
        this.countryResults = [{ "countryName": "Afghanistan", "testStatus": "Successful" }, { "countryName": "Albania", "testStatus": "Successful" }, { "countryName": "Algeria", "testStatus": "Successful" }, { "countryName": "Andorra", "testStatus": "Successful" }, { "countryName": "Angola", "testStatus": "Failed" }, { "countryName": "Armenia", "testStatus": "Successful" }, { "countryName": "Australia", "testStatus": "Failed" }, { "countryName": "Azerbaijan", "testStatus": "Successful" }, { "countryName": "Bahamas", "testStatus": "Failed" }, { "countryName": "Bahrain", "testStatus": "Successful" }, { "countryName": "Barbados", "testStatus": "Failed" }, { "countryName": "Belarus", "testStatus": "Failed" }, { "countryName": "Belgium", "testStatus": "Successful" }, { "countryName": "Belize", "testStatus": "Successful" }, { "countryName": "Benin", "testStatus": "Successful" }, { "countryName": "Burkina", "testStatus": "Successful" }, { "countryName": "Cambodia", "testStatus": "Failed" }, { "countryName": "Canada", "testStatus": "Successful" }, { "countryName": "Bolivia", "testStatus": "Failed" }, { "countryName": "Brazil", "testStatus": "Failed" }, { "countryName": "Comoros", "testStatus": "Failed" }, { "countryName": "Cyprus", "testStatus": "Failed" }, { "countryName": "China", "testStatus": "Failed" }, { "countryName": "Dominican Republic", "testStatus": "Failed" }, { "countryName": "Costa Rica", "testStatus": "Failed" }, { "countryName": "Colombia", "testStatus": "Failed" }, { "countryName": "Fiji", "testStatus": "Failed" }, { "countryName": "El Salvador", "testStatus": "Failed" }, { "countryName": "Georgia", "testStatus": "Failed" }, { "countryName": "Greece", "testStatus": "Successful" }, { "countryName": "Grenada", "testStatus": "Successful" }];
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
