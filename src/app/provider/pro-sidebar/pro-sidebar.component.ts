import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-pro-sidebar',
  templateUrl: './pro-sidebar.component.html',
  styleUrls: ['./pro-sidebar.component.css']
})
export class ProSidebarComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  // fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  // fillerContent = Array.from({length: 20}, () =>
  //   `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //   labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //   laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  //   voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  //   cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public httpCall: HttpCallService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
