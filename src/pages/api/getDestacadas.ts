import { NextApiRequest, NextApiResponse } from 'next';
import { BigQuery } from '@google-cloud/bigquery';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

// Función para obtener las credenciales
async function getCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    // Estamos en producción, usar las credenciales de la variable de entorno
    return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  } else {
    // Estamos en desarrollo, usar Secret Manager
    const secretManagerClient = new SecretManagerServiceClient();
    try {
      const [version] = await secretManagerClient.accessSecretVersion({
        name: 'projects/369557868596/secrets/d10s-2-0/versions/latest',
      });

      const credentials = version.payload?.data?.toString();
      if (!credentials) {
        throw new Error('No se pudo obtener las credenciales del Secret Manager.');
      }

      return JSON.parse(credentials);
    } catch (error) {
      console.error('Error al acceder al Secret Manager:', error);
      throw error;
    }
  }
}

// Función para inicializar el cliente de BigQuery
async function initializeBigQueryClient() {
  const credentials = await getCredentials();

  return new BigQuery({
    projectId: 'forms-atomikos',
    credentials,
  });
}

// Función para inicializar el cliente de Google Sheets
async function initializeGoogleSheetsClient() {
  const credentials = await getCredentials();

  const { private_key, client_email } = credentials;
  const serviceAccountAuth = new JWT({
    email: client_email,
    key: private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);
}

// Handler para el endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const bigQueryClient = await initializeBigQueryClient();
      const datasetId = 'forms_atomikos';
      const tableId = 'destacadas';

      const query = `SELECT * FROM \`${datasetId}.${tableId}\``;
      const [rows] = await bigQueryClient.query({ query });

      // Inicializar el cliente de Google Sheets (aunque no se use en este endpoint, lo dejamos por si se necesita en el futuro)
      await initializeGoogleSheetsClient();

      res.status(200).json(rows);
    } catch (error) {
      console.error('Error al obtener campañas destacadas de BigQuery:', error);
      res.status(500).json({ error: 'Error al obtener campañas destacadas' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}