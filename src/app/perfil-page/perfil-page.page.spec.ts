import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPagePage } from './perfil-page.page';

describe('PerfilPagePage', () => {
  let component: PerfilPagePage;
  let fixture: ComponentFixture<PerfilPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
