import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajePagePage } from './viaje-page.page';

describe('ViajePagePage', () => {
  let component: ViajePagePage;
  let fixture: ComponentFixture<ViajePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
