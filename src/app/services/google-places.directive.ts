import { Directive, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

declare var google: any;

@Directive({
  selector: '[appGooglePlaces]'
})
export class GooglePlacesDirective {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(elRef: ElementRef, private router:Router) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
    if(this.router.url.includes('/vendor')) {
      this.options = {
        componentRestrictions: {'country':'us'},
      };
    }
    else {
      this.options = {
        componentRestrictions: {'country':'us'},
        types: ['(regions)']
      };
    }
  }

  options: any;

  getFormattedAddress(place) {
    //@params: place - Google Autocomplete place object
    //@returns: location_obj - An address object in human readable format
    let location_obj = {};
    for (let i in place.address_components) {
      let item = place.address_components[i];
      
      location_obj['formatted_address'] = place.formatted_address;
      location_obj['latitude'] = place.geometry.location.lat();
      location_obj['longitude'] = place.geometry.location.lng();
      // location_obj['short_line1'] = place.address_components[0].short_name;
      // location_obj['short_city'] = place.address_components[1].short_name;
      // location_obj['short_state'] = place.address_components[3].short_name;
      // location_obj['short_country'] = place.address_components[4].short_name;
      if(item['types'].indexOf("locality") > -1) {
        location_obj['locality'] = item['long_name']
      } else if (item['types'].indexOf("administrative_area_level_1") > -1) {
        location_obj['admin_area_l1'] = item['short_name']
      } else if (item['types'].indexOf("street_number") > -1) {
        location_obj['street_number'] = item['short_name']
      } else if (item['types'].indexOf("route") > -1) {
        location_obj['route'] = item['long_name']
      } else if (item['types'].indexOf("country") > -1) {
        location_obj['country'] = item['long_name']
      } else if (item['types'].indexOf("postal_code") > -1) {
        location_obj['postal_code'] = item['short_name']
      }    
    }
    return location_obj;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element, this.options);
    //Event listener to monitor place changes in the input
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      //Emit the new address object for the updated place
      this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
    });
  }
}
