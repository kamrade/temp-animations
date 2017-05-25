import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SelectComponent } from './widgets/select/select.component';

import { AppComponent } from './app.component';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { rootRouting } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        rootRouting
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        SelectComponent,
        NotFoundComponent
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(public appRef: ApplicationRef) {}
    hmrOnInit(store) {
        // console.log('HMR store', store);
    }
    hmrOnDestroy(store) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }
}
