import { NextApiRequest, NextApiResponse } from 'next';
import { postFinalizadasExitosas } from '../../lib/googleSheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
   if (req.method === 'POST') {
      const { id, cliente, anunciante, formato, trader, inversion, consumo, objetivoTangible, objetivoCuantificable, compraTotal } = req.body;
      try {
        await postFinalizadasExitosas(
            id,
            cliente,
            anunciante,
            formato,
            trader,
            inversion,
            consumo,
            objetivoTangible,
            objetivoCuantificable,
            compraTotal  
        );
        res.status(200).json({ message: 'Datos guardados en Google Sheet' });
      } catch (error) {
        console.error('Error al insertar datos en Google Sheet:', error);
        res.status(500).json({ error: 'Error al guardar en Google Sheet' });
      }
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
}

