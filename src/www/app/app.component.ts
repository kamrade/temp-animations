import { Component } from '@angular/core';
import '../style/app.scss';

@Component({
    selector: 'cp-app',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title: String = 'app-test';
    constructor() {}
}
