import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NavRoute } from '../../models/navRoute.model';

import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-nav-route',
  templateUrl: './nav-route.component.html',
  styleUrls: ['./nav-route.component.sass']
})
export class NavRouteComponent implements OnInit {
  private subscription: Subscription;
  public item: NavRoute = null;

  constructor(private _layoutService: LayoutService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.subscription = this._layoutService.pageNavRouteObs.subscribe((i) => {
        this.item = i;
    });
  }
}
