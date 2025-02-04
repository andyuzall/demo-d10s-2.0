export interface Product {
    estado: string;
    trader: string;
    id: string;
    sdc: string;
    cliente: string;
    anunciante: string;
    campana: string;
    categoria: string;
    formato: string;
    fechaInicio: string;
    fechaFin: string;
    diasRestantes: string;
    objetivoTangible: string;
    objetivoCuantificable: string;
    compraDeAyer: string;
    compraTotal: string;
    cuantoDeberiamosIr: string;
    cuantoFaltaObjetivo: string;
    porcentajeObjetivo: string;
    inversionCampana: string;
    consumoCampana: string;
    cuantoConsumoDeberiamosIr: string;
    consumoDeAyer: string;
    cuantoFaltaConsumo: string;
    porcentaje: string;
    queBuscamos: string;
    queCantidad: string;
    duracionCampana: string;
    idDV: string;
    accessDV: string;
    estadoCampana: string;
    campanaEspecial: string;
  };

export interface HomeData {
    mesActual: number;
    mesAnterior: number;
    campanasActivas: number;
    campanasProxFinalizar: number;
    campanasRecientes: number;
    campanasCritico: number;
    campanasDelicado: number;
    campanasOptimo: number;
  }

export interface Alarms {
    date: string;
    id: string;
    type: string;
    text: string;
    trader: string;
    year: string;
    month: string;
    day: string;
    dateFormmated: string;
    cliente: string;
    categoria: number;
}