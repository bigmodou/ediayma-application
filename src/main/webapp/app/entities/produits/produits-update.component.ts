import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduits, Produits } from 'app/shared/model/produits.model';
import { ProduitsService } from './produits.service';
import { IBoutique } from 'app/shared/model/boutique.model';
import { BoutiqueService } from 'app/entities/boutique/boutique.service';

@Component({
  selector: 'jhi-produits-update',
  templateUrl: './produits-update.component.html',
})
export class ProduitsUpdateComponent implements OnInit {
  isSaving = false;
  boutiques: IBoutique[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    prix: [],
    boutique: [],
  });

  constructor(
    protected produitsService: ProduitsService,
    protected boutiqueService: BoutiqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produits }) => {
      this.updateForm(produits);

      this.boutiqueService.query().subscribe((res: HttpResponse<IBoutique[]>) => (this.boutiques = res.body || []));
    });
  }

  updateForm(produits: IProduits): void {
    this.editForm.patchValue({
      id: produits.id,
      title: produits.title,
      description: produits.description,
      prix: produits.prix,
      boutique: produits.boutique,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produits = this.createFromForm();
    if (produits.id !== undefined) {
      this.subscribeToSaveResponse(this.produitsService.update(produits));
    } else {
      this.subscribeToSaveResponse(this.produitsService.create(produits));
    }
  }

  private createFromForm(): IProduits {
    return {
      ...new Produits(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      prix: this.editForm.get(['prix'])!.value,
      boutique: this.editForm.get(['boutique'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduits>>): void {
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

  trackById(index: number, item: IBoutique): any {
    return item.id;
  }
}
