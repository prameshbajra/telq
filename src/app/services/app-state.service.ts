import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Country } from '../models/country';
import { ResponseCountry } from '../models/responseCountry';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {

    private listOfCountries$: Subject<Country[]>;
    private listOfSelectedCountries$: Subject<Country[]>;

    constructor() {
        this.listOfCountries$ = new Subject<Country[]>();
        this.listOfSelectedCountries$ = new Subject<Country[]>();
    }

    get getListOfCountries$(): Observable<Country[]> {
        return this.listOfCountries$.asObservable();
    }

    public updateCountries(countries: Country[]) {
        this.listOfCountries$.next(countries);
    }

    get getListOfSelectedCountries$(): Observable<Country[]> {
        return this.listOfSelectedCountries$.asObservable();
    }

    public updateSelectedCountries(countries: Country[]) {
        this.listOfSelectedCountries$.next(countries);
    }
}
