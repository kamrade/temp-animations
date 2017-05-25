import { Component } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'vl-not-found-page',
    template: `
        <h2>Not found</h2>
    `,
    animations: [ routerTransition() ],
    host: { '[@routerTransition]': '' }
})

export class NotFoundComponent {}
