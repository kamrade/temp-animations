import { Component } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'vl-home-page',
    templateUrl: './home.component.pug',
    styleUrls: ['./home.component.scss'],
    animations: [ routerTransition() ],
    host: { '[@routerTransition]': '' }
})

export class HomeComponent {}
