import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [SortPipe],
  imports: [CommonModule],
  exports: [SortPipe],
  providers: [],
})
export class SortPipeModule {}
