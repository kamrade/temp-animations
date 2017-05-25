import { Component } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'vl-about-page',
    template: `
        <h2>I am the about-page</h2>
    `,
    animations: [ routerTransition() ],
    host: { '[@routerTransition]': '' }
})

export class AboutComponent {}
