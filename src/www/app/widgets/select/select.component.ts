import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'vl-smart-select',
    template: `
        <h5 #caption (click)="onCaptionClick()" class="select-title">Select</h5>
        <div class="form-inline">
            <div #search class="form-group search-group">
                <input type="text" value="Selected" class="form-control select-el"/>
                <button (click)="onSearchConfirm()" type="submit" class="btn btn-default">OK</button>
            </div>
        </div>
    `,
    styles: [`
        .select-title {
            color: red;
            cursor: pointer;
            user-select: none;
        }

        .search-group {
            display: none;
        }
    `]
})

export class SelectComponent {

    @ViewChild('caption')
    caption;

    @ViewChild('search')
    search;

    onCaptionClick() {
        this.caption.nativeElement.style.display = "none";
        this.search.nativeElement.style.display = "block";
    }

    onSearchConfirm() {
        this.caption.nativeElement.style.display = "block";
        this.search.nativeElement.style.display = "none";
    }

}
