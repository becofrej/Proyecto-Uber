import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoPagePage } from './vehiculo-page.page';

describe('VehiculoPagePage', () => {
  let component: VehiculoPagePage;
  let fixture: ComponentFixture<VehiculoPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
