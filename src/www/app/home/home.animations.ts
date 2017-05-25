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
    transition(':enter', [
      style({
        height: "0",
        opacity: "0"
      }),
      animate('350ms 0ms cubic-bezier(0.23, 1, 0.32, 1)', style({
        height: "*",
        opacity: "1"
      }))
    ]),
    transition(':leave', [
      style({
        height: "*",
        opacity: "1"
      }),
      animate('350ms 0ms cubic-bezier(0.23, 1, 0.32, 1)', style({
        height: "0",
        opacity: "0"
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
