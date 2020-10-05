import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EdiaymaApplicationSharedModule } from 'app/shared/shared.module';
import { ProduitsComponent } from './produits.component';
import { ProduitsDetailComponent } from './produits-detail.component';
import { ProduitsUpdateComponent } from './produits-update.component';
import { ProduitsDeleteDialogComponent } from './produits-delete-dialog.component';
import { produitsRoute } from './produits.route';

@NgModule({
  imports: [EdiaymaApplicationSharedModule, RouterModule.forChild(produitsRoute)],
  declarations: [ProduitsComponent, ProduitsDetailComponent, ProduitsUpdateComponent, ProduitsDeleteDialogComponent],
  entryComponents: [ProduitsDeleteDialogComponent],
})
export class EdiaymaApplicationProduitsModule {}
