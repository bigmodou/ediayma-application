import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EdiaymaApplicationSharedModule } from 'app/shared/shared.module';
import { EdiaymaApplicationCoreModule } from 'app/core/core.module';
import { EdiaymaApplicationAppRoutingModule } from './app-routing.module';
import { EdiaymaApplicationHomeModule } from './home/home.module';
import { EdiaymaApplicationEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    EdiaymaApplicationSharedModule,
    EdiaymaApplicationCoreModule,
    EdiaymaApplicationHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EdiaymaApplicationEntityModule,
    EdiaymaApplicationAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class EdiaymaApplicationAppModule {}
