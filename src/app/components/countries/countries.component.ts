import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-countries',
    templateUrl: './countries.component.html',
    styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

    public listOfOption: string[] = [];
    public listOfSelectedValue = ['a10', 'c12'];


    constructor() {
        const children: string[] = [];
        for (let i = 10; i < 36; i++) {
            children.push(`${i.toString(36)}${i}`);
        }
        this.listOfOption = children;
    }

    ngOnInit(): void {
    }

}
