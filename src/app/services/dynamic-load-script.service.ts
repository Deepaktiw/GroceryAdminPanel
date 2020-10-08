import { Injectable } from '@angular/core';
declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadScriptService {

  loadScriptTag(path: string) {
    //load script
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = path;
      if (script.readyState) {  //IE
        script.onreadystatechange = () => {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            resolve({ loaded: true, status: 'Loaded' });
          }
        };
      } else {  //Others
          script.onload = () => {
            resolve({ loaded: true, status: 'Loaded' });
          };
      };
      script.onerror = (error: any) => resolve({ loaded: false, status: 'Loaded' });
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }

  loadLinkTag(path: string) {
    //load script
    return new Promise((resolve, reject) => {
      let script = document.createElement('link');
      script.rel = 'stylesheet';
      script.href = path;
      if (script.readyState) {  //IE
        script.onreadystatechange = () => {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            resolve({ loaded: true, status: 'Loaded' });
          }
        };
      } else {  //Others
          script.onload = () => {
            resolve({ loaded: true, status: 'Loaded' });
          };
      };
      script.onerror = (error: any) => resolve({ loaded: false, status: 'Loaded' });
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }
}
