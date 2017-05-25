import { inject, TestBed } from '@angular/core/testing';
import { provideRoutes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('App', () => {
    let appComponent: AppComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [provideRoutes([])]
        });

        appComponent = new AppComponent();
    });

    it('title should be app-test', () => {
        expect(appComponent.title).toBe('app-test');
    });

});
