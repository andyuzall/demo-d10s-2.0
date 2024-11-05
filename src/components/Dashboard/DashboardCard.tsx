import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import axios from 'axios';

interface Product {
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
}

interface DashboardCardProps {
  productos: Product[];
  existingIds: string[];
}

const DashboardCard: React.FC<DashboardCardProps> = ({ productos, existingIds }) => {
  const [likedIds, setLikedIds] = useState<string[]>(existingIds);

  const handleSaveToBigQuery = async (producto: Product) => {
    try {
      await axios.post('/api/saveToBigQuery', producto);
      console.log('Datos guardados en BigQuery');
      setLikedIds([...likedIds, producto.id]);
    } catch (error) {
      console.error('Error al guardar en BigQuery:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Campañas">
        <TableHead>
          <TableRow>
            <TableCell><strong>Trader</strong></TableCell>
            <TableCell><strong>Estado</strong></TableCell>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Inversion</strong></TableCell>
            <TableCell><strong>Consumo</strong></TableCell>
            <TableCell><strong>Objetivo Tangible</strong></TableCell>
            <TableCell><strong>Objetivo Cuantificable</strong></TableCell>
            <TableCell><strong>Compra Total</strong></TableCell>
            <TableCell><strong>Guardar</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto, index) => (
            <TableRow key={index}>
              <TableCell>{producto.trader}</TableCell>
              <TableCell>{producto.estado}</TableCell>
              <TableCell>{producto.id}</TableCell>
              <TableCell>{producto.inversionCampana}</TableCell>
              <TableCell>{producto.consumoCampana}</TableCell>
              <TableCell>{producto.objetivoTangible}</TableCell>
              <TableCell>{producto.objetivoCuantificable}</TableCell>
              <TableCell>{producto.compraTotal}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleSaveToBigQuery(producto)}
                  disabled={likedIds.includes(producto.id)}
                  color="error"
                >
                  {likedIds.includes(producto.id) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardCard;
