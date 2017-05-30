import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (items.length == 0) {
      console.log("no items to filter");
      return [];
    }
    return items.filter(it => it[field]["license"].includes(value));
  }
}

