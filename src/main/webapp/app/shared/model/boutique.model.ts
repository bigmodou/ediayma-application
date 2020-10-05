import { IProduits } from 'app/shared/model/produits.model';
import { ILocation } from 'app/shared/model/location.model';
import { IClient } from 'app/shared/model/client.model';

export interface IBoutique {
  id?: number;
  nom?: string;
  description?: string;
  adresse?: string;
  produits?: IProduits[];
  locations?: ILocation[];
  client?: IClient;
}

export class Boutique implements IBoutique {
  constructor(
    public id?: number,
    public nom?: string,
    public description?: string,
    public adresse?: string,
    public produits?: IProduits[],
    public locations?: ILocation[],
    public client?: IClient
  ) {}
}
