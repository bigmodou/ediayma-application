import { IBoutique } from 'app/shared/model/boutique.model';

export interface IClient {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  boutiques?: IBoutique[];
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public telephone?: string,
    public boutiques?: IBoutique[]
  ) {}
}
