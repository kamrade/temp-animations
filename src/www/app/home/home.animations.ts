import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export function homeTransition() {
  return melting();
}

function melting() {
  return trigger('homeTransition', [
    state('void', style({
      height: 0
    })),
    state('*', style({
      height: "100%"
    })),
    transition(':enter', [
      style({
        height: "0"
      }),
      animate('500ms 0ms ease-in', style({
        height: "100%"
      }))
    ]),
    transition(':leave', [
      style({
        height: "100%"
      }),
      animate('500ms 0ms ease-out', style({
        height: "0"
      }))
    ])
  ])
}

/*
function melting() {
  return trigger('homeTransition', [
    state('void', style({
      height: 0,
      overflow: "hidden"
    })),
    state('*', style({
      height: "100px",
      overflow: "hidden"
    })),
    transition(':enter', [
      style({
        height: 0,
        overflow: "hidden"
      }),
      animate('500ms 0ms ease-in', style({
        height: "100px",
        overflow: "hidden"
      }))
    ]),
    transition(':leave', [
      style({
        height: "100px",
        overflow: "hidden"
      }),
      animate('500ms 0ms ease-out', style({
        height: 0,
        overflow: "hidden"
      }))
    ])
  ])
}
*/
