import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FindPipe } from './find.pipe';

@NgModule({
  declarations: [FindPipe],
  imports: [CommonModule],
  exports: [FindPipe],
  providers: [],
})
export class FindPipeModule {}
