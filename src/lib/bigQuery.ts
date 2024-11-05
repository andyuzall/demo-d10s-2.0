import { BigQuery } from '@google-cloud/bigquery';

const bigQueryClient = new BigQuery({
    projectId: 'forms-atomikos',
    keyFilename: './config/credentials.json',
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