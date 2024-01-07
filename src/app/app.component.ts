import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoServiceService } from './service/seo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cars2sell';

  constructor(private router: Router, public _routerss: Router, private activatedRoute: ActivatedRoute, private _seoService: SeoServiceService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    )
      .subscribe((event) => {

        /* defaut tags */
        this._seoService.updateTitle(event['title']);
        this._seoService.updateDescription(event['metaTags'][0].content)

        /* og tags */
        this._seoService.updateOgType(event['metaTags'][3].content);
        this._seoService.updateOgTitle(event['metaTags'][1].content);
        this._seoService.updateOgDescription(event['metaTags'][2].content);


        /* twitter tags*/
        this._seoService.updateTwitterTitle(event['metaTags'][4].content);
        this._seoService.updateTwitterCard(event['metaTags'][5].content);
        this._seoService.updateTwitterDescription(event['metaTags'][6].content);

      });
  }

}
