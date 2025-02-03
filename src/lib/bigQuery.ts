import { BigQuery } from '@google-cloud/bigquery';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

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

// Función para insertar filas destacadas en la tabla de BigQuery
export const insertRowToBigQuery = async (productos: any[]) => {
  const bigQueryClient = await initializeBigQueryClient();
  const datasetId = 'forms_atomikos';
  const tableId = 'destacadas';

  const currentDate = new Date().toISOString().split('T')[0];

  const rows = productos.map(producto => ({
    id: producto.id ?? '',
    cliente: producto.cliente ?? '',
    anunciante: producto.anunciante ?? '',
    formato: producto.formato ?? '',
    trader: producto.trader ?? '',
    inversion: producto.inversionCampana ?? '',
    consumo: producto.consumoCampana ?? '',
    objetivoTangible: producto.objetivoTangible ?? '',
    objetivoCuantificable: producto.objetivoCuantificable ?? '',
    compraTotal: producto.compraTotal ?? '',
    date: currentDate,
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

// Función para obtener los IDs existentes en la tabla de BigQuery
export const fetchExistingIds = async () => {
  const bigQueryClient = await initializeBigQueryClient();
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
