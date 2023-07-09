import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLoaderComponent } from './custom-loader.component';
import { MaterialModule } from '../../plugins/material.module';

describe('CustomLoaderComponent', () => {
  let component: CustomLoaderComponent;
  let fixture: ComponentFixture<CustomLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomLoaderComponent],
      imports: [MaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
