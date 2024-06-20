import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { TarjetaService } from '../tarjeta.service';
import { Invitado, Tarjeta, TarjetaResponse } from '../interfaces/tarjeta';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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

  mostrarFormulario: boolean = false;

  invitados: any[] = []; // Lista de invitados

  nombre: string | null = '';

  tarjeta: Tarjeta = {};

  ok: boolean = true;
  confirmForm: FormGroup;


  constructor(private activeRoute: ActivatedRoute, private tarjetaService: TarjetaService, private fb: FormBuilder, private router: Router) {
    this.confirmForm = this.fb.group({
      nombre: ['', Validators.required]    });
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

    // this.activeRoute.paramMap.subscribe(params => {
    //  // console.log(params);

    //   this.idTarjeta = params.get('idTarjeta');
    // });

    this.activeRoute.paramMap.subscribe(params => {
      this.idTarjeta = params.get('idTarjeta');
      console.log("Parametro recibido:", this.idTarjeta);
      if (this.idTarjeta==null){
        this.idTarjeta=localStorage.getItem('idTarjeta');

  console.log("revisara SI TIENE EL LOG ",this.idTarjeta);

  if(this.idTarjeta==null){
    this.router.navigate(['tarjeta/nodisponible']);
  }else{
    console.log("Cargaria");

  }

  //this.idTarjeta=localStorage.getItem('idTarjeta');
  //console.log(this.idTarjeta, "656");



      }




      console.log("-----", this.idTarjeta);

      // if (this.idTarjeta) {
      //   localStorage.setItem('idTarjeta', this.idTarjeta);



      //   if (params.keys.length > 0) {
      //     console.log("mayor");

      //   this.router.navigate(['/']);
      //   }else{
      //     console.log("esta sin parametros");

      //   }

      // }else{
      //   this.idTarjeta=localStorage.getItem('idTarjeta');

      //   console.log('desdeeeeee ', this.idTarjeta);


      // }

     // console.log('tarjeta:', this.tarjeta);

      if(this.idTarjeta){
        this.obtenerTarjetaData(this.idTarjeta);
      }


      // if (this.idTarjeta) {
      //   this.tarjetaService.getTarjetaData(this.idTarjeta).subscribe((response: TarjetaResponse) => {
      //     this.ok = response.ok;
      //     console.log("llegamos");




      //     if (response.tarjeta) {
      //       this.tarjeta = response.tarjeta;
      //       console.log(this.tarjeta, "s221215");

      //       if (this.tarjeta.cupo === 1) {
      //         this.setSingleInvitado();
      //       } else {
      //         this.setInvitadosForm(this.tarjeta.invitados!);
      //       }
      //     } else {
      //       this.tarjeta ={};
      //     }




      //     // this.tarjeta=response.tarjeta
      //     // console.log(this.tarjeta, 'llega');

      //   });
      // }
    });

    // this.route.paramMap.subscribe(params => {
    //   console.log(params);
    //   this.idTarjeta = params.get('idTarjeta');
    //   console.log(this.idTarjeta);
    // });
    this.initializeCountdown();


  }
  obtenerTarjetaData(idTarjeta: string): void {
    console.log("LLEGATO: " + idTarjeta);

    this.tarjetaService.getTarjetaData(idTarjeta).subscribe(
      (response: TarjetaResponse) => {
        this.ok = response.ok;
        console.log("Respuesta recibida:", response);

        if(!this.ok)this.router.navigate(['tarjeta/nodisponible']);;


        if (response.tarjeta) {
          this.tarjeta = response.tarjeta;




          if(this.tarjeta.idTarjeta)
          localStorage.setItem('idTarjeta', this.tarjeta.idTarjeta);




          console.log("Tarjeta obtenida:", this.tarjeta);

          console.log(this.tarjeta.descripcion);

          if (this.tarjeta.cupo === 1) {
            this.setSingleInvitado();
          } else {
            this.populateInvitados(this.tarjeta.invitados!);
          }
        } else {
          console.log('no tenemos tarjeta');

          this.tarjeta = {};
        }
      },
      (error) => {
        console.error("Error al obtener la tarjeta:", error);
      }
    );
  }


  setSingleInvitado(): void {
    this.invitados.push(this.fb.group({
      nombre: [this.tarjeta?.descripcion, Validators.required]
    }));
  }



  populateInvitados(invitados: any[]): void {
    this.invitados = invitados || [];
  }

  onSubmit(): void {
    if (this.confirmForm.valid) {
      this.addInvitado();
    }
  }

  // get invitados(): FormArray {
  //   return this.confirmForm.get('invitados') as FormArray;
  // }
  addInvitado(): void {
    const nombre = this.confirmForm.get('nombre')?.value;
    console.log(nombre, 'ypiiii');

    if (nombre.trim() === '') {
      console.error('Nombre del invitado no puede estar vacío');
      return;
    }

    const invitadoData = { nombre, idTarjeta: this.idTarjeta };
    this.tarjetaService.addInvitado(invitadoData).subscribe(
      response => {
        console.log('Invitado agregado:', response);
        this.invitados.push(invitadoData);
        this.confirmForm.reset();
      },
      error => {
        console.error('Error al agregar invitado:', error);
      }
    );
  }


  createInvitado(nombre: string): FormGroup {
    return this.fb.group({
      nombre: [nombre, Validators.required]
    });
  }


  removeInvitado(index: number): void {
    const invitado = this.invitados[index];
    if (!invitado.id) {
      this.invitados.splice(index, 1);
      return;
    }

    this.tarjetaService.deleteInvitado(invitado.id).subscribe(
      response => {
        console.log('Invitado eliminado:', response);
        this.invitados.splice(index, 1);
      },
      error => {
        console.error('Error al eliminar invitado:', error);
      }
    );
  }
  activarAgregarInvitados(): void {
    if (this.invitados.length === 0) {
      this.addInvitado();
    }
    this.mostrarFormulario = true;
    Swal.fire({

      title: 'Por favor, digite los nombres de los asistentes, uno por cada renglón. Si va solo, digite solo su nombre.',
      icon: 'info',
      confirmButtonText: 'Entendido',
      confirmButtonColor:'#996E6D'
    });
  }

  cancelarAsistencia(event: Event): void {
    event.preventDefault(); // Evita que el enlace siga su URL
    Swal.fire({
      title: '¿Estás seguro de que no podrás asistir?',
      // text: "¿Estás seguro de que no podrás asistir?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A3B1A2', // Color del botón de confirmación
      cancelButtonColor: '#996E6D',  // Color del botón de cancelación
      confirmButtonText: 'Sí, cancelar asistencia',
      cancelButtonText: 'Confirmare luego'
    }).then((result) => {
      if (result.isConfirmed) {
     //   const idTarjeta = '12345'; // Reemplaza esto con el valor correcto
        this.tarjetaService.confirmarAsistencia(this.tarjeta.idTarjeta!, -1).subscribe(
          (response: any) => {
            if (response.ok) {
              Swal.fire(
                'Cancelado',
                'Tu asistencia ha sido cancelada exitosamente.',
                'success'
              );
            } else {
              Swal.fire(
                'Error',
                'Hubo un problema al cancelar tu asistencia. Por favor, intenta nuevamente.',
                'error'
              );
            }
          },
          (error) => {
            console.error('Error:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al cancelar tu asistencia. Por favor, intenta nuevamente.',
              'error'
            );
          }
        );
      }
    });
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


  confirmarAsistencia(): void {
    // Lógica para confirmar la asistencia
    console.log('Asistencia confirmada');
  }







}
