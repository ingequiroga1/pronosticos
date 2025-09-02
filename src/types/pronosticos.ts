export type PetPronostico = {
  idjornada: number;
  idusuario: string;
  pronosticos: { idpartido: number; pronostico: string }[];
};