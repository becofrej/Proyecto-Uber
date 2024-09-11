import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewDriverPage } from './new-driver.page';

describe('NewDriverPage', () => {
  let component: NewDriverPage;
  let fixture: ComponentFixture<NewDriverPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
