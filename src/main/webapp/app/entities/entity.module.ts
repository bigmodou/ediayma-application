import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region',
        loadChildren: () => import('./region/region.module').then(m => m.EdiaymaApplicationRegionModule),
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.EdiaymaApplicationCountryModule),
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.EdiaymaApplicationLocationModule),
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.EdiaymaApplicationClientModule),
      },
      {
        path: 'boutique',
        loadChildren: () => import('./boutique/boutique.module').then(m => m.EdiaymaApplicationBoutiqueModule),
      },
      {
        path: 'produits',
        loadChildren: () => import('./produits/produits.module').then(m => m.EdiaymaApplicationProduitsModule),
      },
      {
        path: 'categorie',
        loadChildren: () => import('./categorie/categorie.module').then(m => m.EdiaymaApplicationCategorieModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EdiaymaApplicationEntityModule {}
