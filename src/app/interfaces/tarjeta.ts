export interface TarjetaResponse {
  ok: boolean;
  tarjeta: Tarjeta;
}

export interface Tarjeta {
  idTarjeta?: string;
  descripcion?: string;
  codigo?: string;
  cupo?: number|0;
  confirmacion?: number;
  invitados?: Invitado[]; // Añadir esta propiedad
}

export interface Invitado {
  idInvitado?: number;
  nombre: string;
  idTarjeta: string | null;
}
