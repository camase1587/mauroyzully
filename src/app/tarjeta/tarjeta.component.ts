import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { TarjetaService } from '../tarjeta.service';
import { Invitado, Tarjeta, TarjetaResponse } from '../interfaces/tarjeta';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css', '../../assets/jquery.countdown.css']
})
export class TarjetaComponent implements OnInit {

  isNavbarActive: boolean = false;
  idTarjeta: string | null = null;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;


  nombre: string | null = '';

  tarjeta: Tarjeta={};

  ok: boolean = true;
  confirmForm: FormGroup;


  constructor(private activeRoute: ActivatedRoute, private tarjetaService: TarjetaService, private fb: FormBuilder) {
    this.confirmForm = this.fb.group({
      invitados: this.fb.array([])
    });
  }



  openConfirmModal() {
    // this.confirmModal.openModal();
  }

  handleConfirm() {
    alert('Asistencia confirmada. ¡Gracias!');
  }

  toggleNavbar() {
    this.isNavbarActive = !this.isNavbarActive;
  }

  ngOnInit(): void {
    console.log('entraaa');

    this.activeRoute.paramMap.subscribe(params => {
      this.nombre = params.get('name');
    });

    this.activeRoute.paramMap.subscribe(params => {
      this.nombre = params.get('name');
      if (this.nombre) {
        this.tarjetaService.getTarjetaData(this.nombre).subscribe((response: TarjetaResponse) => {
          this.ok = response.ok;



          if (response.tarjeta) {
            this.tarjeta = response.tarjeta;
            if (this.tarjeta.cupo === 1) {
              this.setSingleInvitado();
            } else {
              this.setInvitadosForm(this.tarjeta.invitados!);
            }
          } else {
            this.tarjeta ={};
          }




          // this.tarjeta=response.tarjeta
          // console.log(this.tarjeta, 'llega');

        });
      }
    });

    // this.route.paramMap.subscribe(params => {
    //   console.log(params);
    //   this.idTarjeta = params.get('idTarjeta');
    //   console.log(this.idTarjeta);
    // });
    this.initializeCountdown();


  }


  setSingleInvitado(): void {
    this.invitados.push(this.fb.group({
      nombre: [this.tarjeta?.descripcion, Validators.required]
    }));
  }


  setInvitadosForm(invitados: Invitado[]): void {
    const invitadosFGs = invitados.map(invitado => this.fb.group({
      nombre: [invitado.nombre, Validators.required]
    }));
    const invitadosFormArray = this.fb.array(invitadosFGs);
    this.confirmForm.setControl('invitados', invitadosFormArray);
  }

  onSubmit() {
    if (this.confirmForm.valid && this.tarjeta) {
      this.tarjetaService.submitInvitados(this.tarjeta.idTarjeta!, this.confirmForm.value.invitados)
        .subscribe(response => {
          console.log('Confirmación enviada:', response);
          // Manejar la respuesta del servidor aquí
        });
    }
  }


  get invitados(): FormArray {
    return this.confirmForm.get('invitados') as FormArray;
  }

  addInvitado(): void {
    this.invitados.push(this.fb.group({
      nombre: ['', Validators.required]
    }));
  }

  removeInvitado(index: number): void {
    this.invitados.removeAt(index);
  }

  traerTarjeta() {
    // Implementación de la lógica para traer la tarjeta
  }

  ngAfterViewInit() {

  }

  initializeCountdown() {
    const eventDate = new Date('2024-07-13T15:30:00').getTime();

    interval(1000).subscribe(() => {
      const currentDate = new Date().getTime();
      const distance = eventDate - currentDate;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    });
  }
}
