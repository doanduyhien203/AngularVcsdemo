import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer,SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'highlightSearch',
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: string, search: string): string {
    const valueStr = value + ''; // Ensure numeric values are converted to strings
    return valueStr.replace(
      
      new RegExp(
        '(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)',
        'gi'
      ),
      '<strong  class="your-class" >$1</strong>'
      
        
    );
  
  }
}
/*
 
  constructor(private _sanitizer: DomSanitizer) { }

  transform(list: any, searchText: string): any {

    if (!list) { return []; }
    if (!searchText) { return list; }

    const value = list.replace(
      searchText, `<span style='background-color:yellow'>${searchText}</span>` );
    console.log('value', value);

    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
  
}
 */