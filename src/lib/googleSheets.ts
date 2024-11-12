import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

interface Producto {
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
  kpiObjetivo: string;
  kpiEntregado: string;
  duracionCampana: string;
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
  queBuscamos: string;
  queCantidad: string;
  idDV: string;
  accessDV: string;
}

// Función para obtener las credenciales desde Secret Manager
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

// Función para inicializar la autenticación con JWT
async function initializeServiceAccountAuth() {
  const credentials = await getCredentials();

  const { client_email, private_key } = credentials;
  if (!client_email || !private_key) {
    throw new Error('Credenciales inválidas: client_email o private_key no encontrados.');
  }

  const serviceAccountAuth = new JWT({
    email: client_email,
    key: private_key.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return serviceAccountAuth;
}

// Función para obtener los datos desde Google Sheets
export default async function getGoogleSheetData(): Promise<Producto[]> {
  const serviceAccountAuth = await initializeServiceAccountAuth();
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; 
    const rows = await sheet.getRows<Producto>();

    return rows.map((row: GoogleSpreadsheetRow<Producto>) => ({
      estado: row.get('estado'),
      trader: row.get('trader'),
      id: row.get('id'),
      sdc: row.get('sdc'),
      cliente: row.get('cliente'),
      anunciante: row.get('anunciante'),
      campana: row.get('campana'),
      categoria: row.get('categoria'),
      formato: row.get('formato'),
      fechaInicio: row.get('fechaInicio'),
      fechaFin: row.get('fechaFin'),
      diasRestantes: row.get('diasRestantes'),
      kpiObjetivo: row.get('kpiObjetivo'),
      kpiEntregado: row.get('kpiEntregado'),
      duracionCampana: row.get('duracionCampana'),
      objetivoTangible: row.get('objetivoTangible'),
      objetivoCuantificable: row.get('objetivoCuantificable'),
      compraDeAyer: row.get('compraDeAyer'),
      compraTotal: row.get('compraTotal'),
      cuantoDeberiamosIr: row.get('cuantoDeberiamosIr'),
      cuantoFaltaObjetivo: row.get('cuantoFaltaObjetivo'),
      porcentajeObjetivo: row.get('porcentajeObjetivo'),
      inversionCampana: row.get('inversionCampana'),
      consumoCampana: row.get('consumoCampana'),
      cuantoConsumoDeberiamosIr: row.get('cuantoConsumoDeberiamosIr'),
      consumoDeAyer: row.get('consumoDeAyer'),
      cuantoFaltaConsumo: row.get('cuantoFaltaConsumo'),
      porcentaje: row.get('porcentaje'),
      queBuscamos: row.get('queBuscamos'),
      queCantidad: row.get('queCantidad'),
      idDV: row.get('idDV'),
      accessDV: row.get('accessDV'),
    }));
  } catch (error) {
    console.error('Error al obtener los datos de Google Sheets:', error);
    throw error;
  }
}
