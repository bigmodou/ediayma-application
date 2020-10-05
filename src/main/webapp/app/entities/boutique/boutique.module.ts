import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EdiaymaApplicationSharedModule } from 'app/shared/shared.module';
import { BoutiqueComponent } from './boutique.component';
import { BoutiqueDetailComponent } from './boutique-detail.component';
import { BoutiqueUpdateComponent } from './boutique-update.component';
import { BoutiqueDeleteDialogComponent } from './boutique-delete-dialog.component';
import { boutiqueRoute } from './boutique.route';

@NgModule({
  imports: [EdiaymaApplicationSharedModule, RouterModule.forChild(boutiqueRoute)],
  declarations: [BoutiqueComponent, BoutiqueDetailComponent, BoutiqueUpdateComponent, BoutiqueDeleteDialogComponent],
  entryComponents: [BoutiqueDeleteDialogComponent],
})
export class EdiaymaApplicationBoutiqueModule {}
