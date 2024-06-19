export interface TarjetaResponse {
  ok: boolean;
  tarjeta: Tarjeta[];
}

export interface Tarjeta {
  idTarjeta: string;
  descripcion: string;
  codigo: string;
  cupo: number;
  confirmacion: string | null;
  invitados: Invitado[]; // Añadir esta propiedad
}

export interface Invitado {
  nombre: string;
}
