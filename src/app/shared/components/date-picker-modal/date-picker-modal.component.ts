import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker-modal',
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss'],
})
export class DatePickerModalComponent  implements OnInit {
  @Input() selectedDate: string = '';

  constructor(private modalController: ModalController) { }

    // Manejar el cambio de fecha
    onDateChange(event: any) {
      const selectedDate = event.detail.value;
      this.dismiss(selectedDate);
    }
  
    // Cerrar el modal y devolver la fecha seleccionada
    dismiss(date: string | null = null) {
      this.modalController.dismiss(date);
    }
    

  ngOnInit() {}

}
