import { EnumCountry } from "../helpers/enums/common.enum";

export class MapPoint{
  lat: number = 0;
  lng: number = 0;
  address: string;
  home: string;
  street: string;
  postalCode: string;
  province: string;
  city: string;
  country: EnumCountry;

  public latlng() {
    return { lat: this.lat, lng: this.lng};
  }

  public extract(address_components: any) {
    this.home = this.extractFromAdress(address_components, 'street_number');
    this.street = this.extractFromAdress(address_components, 'route');
    this.city = this.extractFromAdress(address_components, 'locality');
    this.postalCode = this.extractFromAdress(address_components, 'postal_code');
    this.province = this.extractFromAdress(address_components, 'administrative_area_level_1');
    this.country = this.extractFromAdress(address_components, 'country');
  }

  private extractFromAdress(components, type){
    for (var i: number=0; i<parseInt(components.length); i++) {
        for (var j: number=0; j<parseInt(components[i].types.length); j++) {
          if (components[i].types[j]==type && type=='country') {
              return components[i].short_name;
            }
            if (components[i].types[j]==type) return components[i].long_name;
        }
    }
    return "";
  }
}
