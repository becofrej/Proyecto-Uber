import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ActivatedRoute } from '@angular/router'; 
import { provideRouter } from '@angular/router'; 
import { of } from 'rxjs'; 

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        provideRouter([]), 
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ userEmail: 'test@example.com' }), 
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
