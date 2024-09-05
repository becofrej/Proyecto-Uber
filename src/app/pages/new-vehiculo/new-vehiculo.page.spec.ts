import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewVehiculoPage } from './new-vehiculo.page';

describe('NewVehiculoPage', () => {
  let component: NewVehiculoPage;
  let fixture: ComponentFixture<NewVehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
