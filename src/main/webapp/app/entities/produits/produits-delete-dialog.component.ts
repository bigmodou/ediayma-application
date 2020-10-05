import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProduits } from 'app/shared/model/produits.model';
import { ProduitsService } from './produits.service';

@Component({
  templateUrl: './produits-delete-dialog.component.html',
})
export class ProduitsDeleteDialogComponent {
  produits?: IProduits;

  constructor(protected produitsService: ProduitsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produitsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('produitsListModification');
      this.activeModal.close();
    });
  }
}
