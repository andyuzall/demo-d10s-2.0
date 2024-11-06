import { BigQuery } from '@google-cloud/bigquery';
import fs from 'fs';
import path from 'path';


// Ruta temporal para el archivo de credenciales
const credentialsPath = path.join('/config', 'credentials.json');

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

export const insertRowToBigQuery = async (productos: any[]) => {
    const datasetId = 'forms_atomikos';
    const tableId = 'destacadas';

    const rows = productos.map(producto => ({
        id: producto.id ?? '',
        trader: producto.trader ?? '',
        inversion: producto.inversionCampana ?? '',
        consumo: producto.consumoCampana ?? '',
        objetivoTangible: producto.objetivoTangible ?? '',
        objetivoCuantficable: producto.objetivoCuantificable ?? '',
        compraTotal: producto.compraTotal ?? '',
      }));
    
      try {
        await bigQueryClient.dataset(datasetId).table(tableId).insert(rows);
        console.log(`Datos insertados correctamente en ${tableId}`);
      } catch (error: any) {
        console.error('Error al insertar datos en BigQuery:', error);
        if (error.name === 'PartialFailureError') {
          error.errors?.forEach((err: any) => {
            console.error('Detalles del error por fila:', err.row);
            console.error('Errores específicos:', err.errors);
          });
        }
      }
    };

// obtenemos los idExistentes

export const fetchExistingIds = async () => {
    const datasetId = 'forms_atomikos';
    const tableId = 'destacadas';

    try {
      const [rows] = await bigQueryClient
        .dataset(datasetId)
        .table(tableId)
        .getRows();

      return rows.map((row) => row.id);
    } catch (error) {
      console.error('Error al obtener los ids existentes:', error);
      return [];
    }
};