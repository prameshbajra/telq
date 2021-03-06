import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NzButtonModule,
        NzSelectModule,
        NzTableModule,
        NzMessageModule
    ],
    exports: [
        NzButtonModule,
        NzSelectModule,
        NzTableModule,
        NzMessageModule
    ]
})
export class AntDesignModule { }
