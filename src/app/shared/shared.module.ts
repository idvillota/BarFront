import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';

// @NgModule({
//   declarations: [SuccessDialogComponent, ErrorDialogComponent],
//   imports: [
//     CommonModule,
//     MaterialModule,
//     FlexLayoutModule,
//     SuccessDialogComponent,
//     ErrorDialogComponent    
//   ],
//   exports:[
//     MaterialModule,
//     FlexLayoutModule,
//     SuccessDialogComponent,
//     ErrorDialogComponent
//   ],
//   entryComponents:[
//     SuccessDialogComponent,
//     ErrorDialogComponent
//   ]
// })
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ErrorDialogComponent,
    SuccessDialogComponent
],
  exports: [
    ErrorDialogComponent,
    SuccessDialogComponent
  ]
})
export class SharedModule { }
