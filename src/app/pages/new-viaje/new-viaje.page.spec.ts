import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewViajePage } from './new-viaje.page';

describe('NewViajePage', () => {
  let component: NewViajePage;
  let fixture: ComponentFixture<NewViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
