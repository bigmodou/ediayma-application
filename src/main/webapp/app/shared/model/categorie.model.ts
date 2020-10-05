import { IProduits } from 'app/shared/model/produits.model';

export interface ICategorie {
  id?: number;
  titre?: string;
  description?: number;
  produits?: IProduits;
}

export class Categorie implements ICategorie {
  constructor(public id?: number, public titre?: string, public description?: number, public produits?: IProduits) {}
}
