import { ICountry } from 'app/shared/model/country.model';
import { IBoutique } from 'app/shared/model/boutique.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  country?: ICountry;
  boutique?: IBoutique;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public country?: ICountry,
    public boutique?: IBoutique
  ) {}
}
