import { Component } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'vl-contact-page',
    template: `
        <h2>I am the contact-page</h2>
    `,
    animations: [ routerTransition() ],
    host: { '[@routerTransition]': '' }
})

export class ContactComponent {}
