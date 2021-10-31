import { Component, OnInit } from '@angular/core';
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
            const selectedNames = this.listOfSelectedCountries.map(country => country.name);
            response.forEach(country => {
                if (selectedNames.includes(country.name)) {
                    country.checked = true;
                }
            });
            this.listOfCountries = response;
            const totalCountryNames = this.listOfCountries.map(country => country.name);
            this.listOfSelectedCountries = this.listOfSelectedCountries.filter(country => totalCountryNames.includes(country.name));
            this.appStateService.updateSelectedCountries(this.listOfSelectedCountries);
        });
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

    private stopEventBubbling(event: any): void {
        try {
            event.preventDefault();
        } catch (error) {
            // Some events like matcheckbox event does not have a preventDetault menthod ... 
            console.error("This is intentional: ", error);
        }
    }

    public onCheckBoxChanged(event: any, element: Country): void {
        this.stopEventBubbling(event);
        element.checked = !element.checked;
        if (element.checked) {
            this.listOfSelectedCountries.push(element);
        } else {
            this.listOfSelectedCountries = this.listOfSelectedCountries.filter(country => country.name !== element.name);
        }
        this.appStateService.updateSelectedCountries(this.listOfSelectedCountries);
    }

    public getClass(row: Country): string {
        return row.checked ? "colored" : "";
    }

    public onRowClicked(event: Event, row: Country): void {
        this.onCheckBoxChanged(event, row);
    }

    private createMessage(type: string, message: string): void {
        this.message.create(type, message);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
