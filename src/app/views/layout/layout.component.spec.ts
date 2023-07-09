import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { LoaderState } from '../../../../src/app/store/loading/loading.state';
import { SnackbarState } from '../../../../src/app/store/snackbar/snackbar.state';
import { MaterialModule } from '../../../app/plugins/material.module';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  const stubs = ['router-outlet'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [
        NgxsModule.forRoot([LoaderState, SnackbarState]),
        MaterialModule,
        RouterModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
