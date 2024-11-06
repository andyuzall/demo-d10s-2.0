// pages/api/getDestacadas.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { BigQuery } from '@google-cloud/bigquery';

const bigQueryClient = new BigQuery({
  projectId: 'forms-atomikos',
  keyFilename: './config/credentials.json',
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
     try {
        const datasetId = 'forms_atomikos';
        const tableId = 'destacadas';

        const query = `SELECT * FROM \`${datasetId}.${tableId}\``;
        const [rows] = await bigQueryClient.query({ query });

        res.status(200).json(rows);
     } catch (error) {
        console.error('Error al obtener campañas destacadas de BigQuery:', error);
        res.status(500).json({ error: 'Error al obtener campañas destacadas' });
     }
  } else {
     res.status(405).json({ message: 'Método no permitido' });
  }
}