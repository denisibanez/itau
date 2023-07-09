import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../plugins/material.module';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

import { NgxsModule } from '@ngxs/store';

import { SnackbarState } from '../../store/snackbar/snackbar.state';
import { LoaderState } from '../../store/loading/loading.state';

// Service example
import { ExampleService } from '../../services/axios';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        NgxsModule.forRoot([SnackbarState, LoaderState]),
        RouterTestingModule,
        MaterialModule,
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
      ],
      providers: [ExampleService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
