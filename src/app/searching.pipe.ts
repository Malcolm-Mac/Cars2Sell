import { Pipe, PipeTransform } from '@angular/core';
import { ListingsComponent } from './listings/listings.component';

@Pipe({
  name: 'searching'
})

export class SearchingPipe implements PipeTransform {

  Totallengths: any;
  PageNumber: number = 1;
  arr: any;

  constructor(private the: ListingsComponent) { }

  transform(items: any[], searchText: string) {
    if (items != null && searchText) {
       this.arr = items.filter(el => {

        var test = JSON.parse(JSON.stringify(el));
        delete test['url'];
        delete test['_id'];

        var testString = JSON.stringify(test);

        Object.keys(test).forEach(k => {
          testString = testString.replace(k, '');
        });

        let terms = searchText.replace(/[\s]+/gm, " ").replace(/^[\s]|[\s]$/gm, "").split(' ');
        let containCount = 0;

        terms.forEach(t => {
          if (testString.toLowerCase().indexOf(t.toLowerCase()) > -1) {
            ++containCount;
          }
        });

        return (containCount == terms.length);
      });

      this.the.totalLength = this.arr.length

      return this.arr;

    } else {

      this.the.totalLength = items.length

      return items;
    }
  }
}
