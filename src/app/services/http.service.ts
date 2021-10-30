import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';
import { RequestCountry } from '../models/requestCountry';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    private BACKEND_URL = "https://interview.telqtele.com/";

    constructor(private http: HttpClient) { }

    public getCountriesList(): Observable<any> {
        return this.http.get(`${this.BACKEND_URL}countries`);
    }

    public sentTests(countries: RequestCountry[]): Observable<any> {
        return this.http.post(`${this.BACKEND_URL}test`, countries);
    }


}
