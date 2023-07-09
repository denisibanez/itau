import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { NgxsModule } from '@ngxs/store';

// State
import { LoaderState } from './loading/loading.state';
import { LoadingModule } from './loading/loading.module';
import { SnackbarState } from './snackbar/snackbar.state';
import { SnackbarStateModule } from './snackbar/snackbar.module';

@NgModule({
  exports: [LoadingModule, SnackbarStateModule],
  imports: [
    NgxsModule.forRoot([LoaderState, SnackbarState], {
      developmentMode: !environment.production,
    }),
  ],
})
export class StateModule {}
