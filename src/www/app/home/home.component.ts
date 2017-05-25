import { Component } from '@angular/core';
import  { homeTransition } from './home.animations'

@Component({
    selector: 'vl-home-page',
    templateUrl: './home.component.pug',
    styleUrls: ['./home.component.scss'],
    animations: [ homeTransition() ]
    // host: { '[@homeTransition]': '' }
})

export class HomeComponent {

  showDescription = false;
  showSubsteps    = true;

  steps = [
    {
      title: "This is step 1",
      description: "",
      substeps: [
        {
          title: "This is substep 1"
        }
      ]
    }, {

    }
  ]

}
