import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBoutique, Boutique } from 'app/shared/model/boutique.model';
import { BoutiqueService } from './boutique.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';

@Component({
  selector: 'jhi-boutique-update',
  templateUrl: './boutique-update.component.html',
})
export class BoutiqueUpdateComponent implements OnInit {
  isSaving = false;
  clients: IClient[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    description: [],
    adresse: [],
    client: [],
  });

  constructor(
    protected boutiqueService: BoutiqueService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ boutique }) => {
      this.updateForm(boutique);

      this.clientService.query().subscribe((res: HttpResponse<IClient[]>) => (this.clients = res.body || []));
    });
  }

  updateForm(boutique: IBoutique): void {
    this.editForm.patchValue({
      id: boutique.id,
      nom: boutique.nom,
      description: boutique.description,
      adresse: boutique.adresse,
      client: boutique.client,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const boutique = this.createFromForm();
    if (boutique.id !== undefined) {
      this.subscribeToSaveResponse(this.boutiqueService.update(boutique));
    } else {
      this.subscribeToSaveResponse(this.boutiqueService.create(boutique));
    }
  }

  private createFromForm(): IBoutique {
    return {
      ...new Boutique(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      description: this.editForm.get(['description'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoutique>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IClient): any {
    return item.id;
  }
}
