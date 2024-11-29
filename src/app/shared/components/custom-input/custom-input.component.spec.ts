import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms'; // Importar FormControl

import { CustomInputComponent } from './custom-input.component';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomInputComponent],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;

    // Configurar el FormControl simulado
    component.control = new FormControl(''); // Crear un FormControl vacío
    component.type = 'text'; // Configurar el tipo de input para la prueba
    component.label = 'Test Label'; // Configurar un label de prueba
    component.icon = 'person-outline'; // Asignar un ícono de prueba

    fixture.detectChanges(); // Detectar cambios después de configurar los inputs
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    component.type = 'password';
    component.showOrHidePassword(); // Llamar al método
    expect(component.type).toBe('text'); // Debería cambiar a texto visible

    component.showOrHidePassword();
    expect(component.type).toBe('password'); // Debería regresar a oculto
  });
});
