import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchRootComponent } from './search-root/search-root.component';
import { SearchService } from './../__services/search.service';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule
  ],
  declarations: [SearchRootComponent],
  providers: [
    SearchService
  ]
})
export class SearchModule { }
