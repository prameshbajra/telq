import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    private BACKEND_URL = "https://https://interview.telqtele.com/";

    constructor(private http: HttpClient) { }

    public getCountriesList(): Observable<any> {
        return this.http.get(`${this.BACKEND_URL}countries`);
    }


}
