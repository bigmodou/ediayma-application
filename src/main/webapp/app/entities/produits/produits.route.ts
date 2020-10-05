import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProduits, Produits } from 'app/shared/model/produits.model';
import { ProduitsService } from './produits.service';
import { ProduitsComponent } from './produits.component';
import { ProduitsDetailComponent } from './produits-detail.component';
import { ProduitsUpdateComponent } from './produits-update.component';

@Injectable({ providedIn: 'root' })
export class ProduitsResolve implements Resolve<IProduits> {
  constructor(private service: ProduitsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduits> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((produits: HttpResponse<Produits>) => {
          if (produits.body) {
            return of(produits.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Produits());
  }
}

export const produitsRoute: Routes = [
  {
    path: '',
    component: ProduitsComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ediaymaApplicationApp.produits.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProduitsDetailComponent,
    resolve: {
      produits: ProduitsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ediaymaApplicationApp.produits.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProduitsUpdateComponent,
    resolve: {
      produits: ProduitsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ediaymaApplicationApp.produits.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProduitsUpdateComponent,
    resolve: {
      produits: ProduitsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ediaymaApplicationApp.produits.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
