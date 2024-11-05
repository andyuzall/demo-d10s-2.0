import { NextApiRequest, NextApiResponse } from 'next';
import { insertRowToBigQuery } from '@/lib/bigQuery';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const producto = req.body;

    try {
      // Insertar la fila en BigQuery usando `insertRowToBigQuery`
      await insertRowToBigQuery([producto]); // Pasar el objeto en un array para mantener compatibilidad
      console.log(`Datos insertados en BigQuery:`, producto);
      res.status(200).json({ message: 'Datos guardados en BigQuery' });
    } catch (error) {
      console.error('Error al insertar datos en BigQuery:', error);
      res.status(500).json({ error: 'Error al guardar en BigQuery' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}