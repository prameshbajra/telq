import { Component, OnInit } from '@angular/core';
import { ResponseCountry } from 'src/app/models/responseCountry';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

    public loading: boolean = false;
    public countryResults: ResponseCountry[];

    constructor() {
        this.countryResults = [
            {
                "countryName": "Nepal",
                "testStatus": "Failed"
            },
            {
                "countryName": "India",
                "testStatus": "Failed"
            },
            {
                "countryName": "Germany",
                "testStatus": "Successful"
            }
        ];
    }

    ngOnInit(): void {
    }

    onTestClick(): void {
    }

}
