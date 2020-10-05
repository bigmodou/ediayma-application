import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EdiaymaApplicationTestModule } from '../../../test.module';
import { BoutiqueDetailComponent } from 'app/entities/boutique/boutique-detail.component';
import { Boutique } from 'app/shared/model/boutique.model';

describe('Component Tests', () => {
  describe('Boutique Management Detail Component', () => {
    let comp: BoutiqueDetailComponent;
    let fixture: ComponentFixture<BoutiqueDetailComponent>;
    const route = ({ data: of({ boutique: new Boutique(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EdiaymaApplicationTestModule],
        declarations: [BoutiqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BoutiqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BoutiqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load boutique on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.boutique).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
