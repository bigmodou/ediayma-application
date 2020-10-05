import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBoutique } from 'app/shared/model/boutique.model';

@Component({
  selector: 'jhi-boutique-detail',
  templateUrl: './boutique-detail.component.html',
})
export class BoutiqueDetailComponent implements OnInit {
  boutique: IBoutique | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ boutique }) => (this.boutique = boutique));
  }

  previousState(): void {
    window.history.back();
  }
}
