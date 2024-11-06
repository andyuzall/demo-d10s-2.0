// pages/api/getDestacadas.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { BigQuery } from '@google-cloud/bigquery';
import fs from 'fs';
import path from 'path';


// Ruta temporal para el archivo de credenciales
const credentialsPath = path.join('/tmp', 'credentials.json');

// Verificar si el archivo ya existe antes de crearlo
if (!fs.existsSync(credentialsPath)) {
  const credentials = {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  };
  fs.writeFileSync(credentialsPath, JSON.stringify(credentials));
}


const bigQueryClient = new BigQuery({
  projectId: 'forms-atomikos',
  keyFilename: credentialsPath,
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