import { ICategorie } from 'app/shared/model/categorie.model';
import { IBoutique } from 'app/shared/model/boutique.model';

export interface IProduits {
  id?: number;
  title?: string;
  description?: string;
  prix?: number;
  categories?: ICategorie[];
  boutique?: IBoutique;
}

export class Produits implements IProduits {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public prix?: number,
    public categories?: ICategorie[],
    public boutique?: IBoutique
  ) {}
}
