export const calcularPorcentaje = (compraTotal: number, queCantidad: number): string => {
    const porcentaje = (compraTotal / queCantidad) * 100;
    return `${porcentaje.toFixed(2)}%`;
  };