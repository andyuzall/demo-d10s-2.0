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
  estadoCampana: string;
  campanaEspecial: string;
  escenarioCampana: string;
}

interface HomeData {
  trader: string;
  mesActual: number;
  mesAnterior: number;
  campanasActivas: number;
  campanasProxFinalizar: number;
  campanasRecientes: number;
  campanasCritico: number;
  campanasDelicado: number;
  campanasOptimo: number;
}

interface Alarms {
  date: string;
  id: string;
  type: string;
  text: string;
  trader: string;
  year: string;
  month: string;
  day: string;
  dateFormmated: string;
  cliente: string;
  categoria: number;
}

const tradersAsign = [
  { email: "juan.alayon@atomik.pro", name: "Juan" },
  { email: "cynthia@atomik.pro", name: "Cynthia" },
  { email: "dalma@atomik.pro", name: "Dalma" },
  { email: "emmanuel@atomik.pro", name: "Emmanuel" },
  { email: "juan.roa@atomik.pro", name: "Juan Sebastian" },
  { email: "monica@atomik.pro", name: "Monica" },
  { email: "alexandra@atomik.pro", name: "admin" },
  { email: "andy@atomik.pro", name: "admin" },
  { email: "agustin@atomik.pro", name: "admin" },
  { email: "martina@atomik.pro", name: "admin" },
];

const filterExceptions = [
  "andy@atomik.pro", 
  "alexandra@atomik.pro",
  "martina@atomik.pro",
  "agustin@atomik.pro",
  "programatica@atomik.pro",
];

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
export async function getGoogleSheetData(userEmail: string): Promise<Producto[]> {
  const serviceAccountAuth = await initializeServiceAccountAuth();
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; 
    const rows = await sheet.getRows<Producto>();

    if(filterExceptions.includes(userEmail)) {

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
      estadoCampana: row.get('estadoCampana'),
      campanaEspecial: row.get('campanaEspecial'),
      escenarioCampana: row.get('escenarioCampana')
    }));
  }
  return rows
  .filter((row) => row.get('trader') === tradersAsign.find((t) => t.email === userEmail)?.name)
  .map((row: GoogleSpreadsheetRow<Producto>) => ({
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
    estadoCampana: row.get('estadoCampana'),
    campanaEspecial: row.get('campanaEspecial'),
    escenarioCampana: row.get('escenarioCampana')
  }));
  } catch (error) {
    console.error('Error al obtener los datos de Google Sheets:', error);
    throw error;
  }
};
// Obtenemos los datos de cantidad de campañas actuales y del mes anterior

export async function getGoogleSheetHomeData(userEmail: string): Promise<HomeData[]> {
  const serviceAccountAuth = await initializeServiceAccountAuth();
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);

  try {

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[4]; 
    const rows = await sheet.getRows<HomeData>();

    return rows
    .filter((row) => row.get('trader') === tradersAsign.find((t) => t.email === userEmail)?.name)
    .map((row: GoogleSpreadsheetRow<HomeData>) => ({
      trader: row.get('trader') || '',
      mesActual: Number(row.get('mesActual')) || 0,
      mesAnterior: Number(row.get('mesAnterior')) || 0,
      campanasActivas: Number(row.get('campanasActivas')) || 0,
      campanasProxFinalizar: Number(row.get('campanasProxFinalizar')) || 0,
      campanasRecientes: Number(row.get('campanasRecientes')) || 0,
      campanasCritico: Number(row.get('campanasCritico')) || 0,
      campanasDelicado: Number(row.get('campanasDelicado')) || 0,
      campanasOptimo: Number(row.get('campanasOptimo')) || 0,
    }));

  } catch (error) {
    console.error('Error al obtener los datos de Google Sheets:', error);
    throw error;
  }
};

// obtenemos los datos de las alarmas de la API de Google Sheets
export async function getAlarms(userEmail: string): Promise<Alarms[]> {
  const serviceAccountAuth = await initializeServiceAccountAuth();
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[5]; 
    const rows = await sheet.getRows<Alarms>();

    if (filterExceptions.includes(userEmail)){

      return rows
      .map((row: GoogleSpreadsheetRow<Alarms>) => ({
        date: row.get('date'),
        id: row.get('id'),
        type: row.get('type'),
        text: row.get('text'),
        trader: row.get('trader'),
        year: row.get('year'),
        month: row.get('month'),
        day: row.get('day'),
        dateFormmated: row.get('dateFormmated'),
        cliente: row.get('cliente'),
        categoria: row.get('categoria'),
      }));
    }
      
    return rows
    .filter((row) => row.get('trader') === tradersAsign.find((t) => t.email === userEmail)?.name)
    .map((row: GoogleSpreadsheetRow<Alarms>) => ({
      date: row.get('date'),
      id: row.get('id'),
      type: row.get('type'),
      text: row.get('text'),
      trader: row.get('trader'),
      year: row.get('year'),
      month: row.get('month'),
      day: row.get('day'),
      dateFormmated: row.get('dateFormmated'),
      cliente: row.get('cliente'),
      categoria: row.get('categoria'),
    }));
  } catch (error) {
    console.error('Error al obtener las alarmas de Google Sheets:', error);
    throw error;
  }
}
// Guarda la campaña especial en Google Sheets
export async function postEspecialCampaigns(productId: string): Promise<void> {

  const serviceAccountAuth = await initializeServiceAccountAuth();
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[6]; 

    await sheet.addRow({ id: productId, especial: 'Campaña destacada' });

  } catch (error) {
    console.error('Error al actualizar Google Sheets:', error);
    throw error;
  }
}
// Obtiene los IDs de las campañas especiales de Google Sheets
export async function getGoogleSheetEspecialIds(): Promise<{ id: string; especial: string }[]> {
  const serviceAccountAuth = await initializeServiceAccountAuth();
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[6]; 
    const rows = await sheet.getRows();

    const especialIds = rows
      .filter((row: GoogleSpreadsheetRow) => row.get('especial') === "Campaña destacada")
      .map((row: GoogleSpreadsheetRow) => ({
        id: row.get('id'),
        especial: row.get('especial'),
      }));

    return especialIds;
  } catch (error) {
    console.error('Error al obtener las campañas especiales:', error);
    throw error;
  }
}

// Guarda la campaña finalizada exitosamente en Google Sheets
export async function postFinalizadasExitosas(
  productId: string,
  cliente: string,
  anunciante: string,
  formato: string,
  trader: string,
  inversion: string,
  consumo: string,
  objetivoTangible: string,
  objetivoCuantificable: string,
  compraTotal: string
): Promise<void> {

  const serviceAccountAuth = await initializeServiceAccountAuth();
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);
  const currentDate = new Date().toISOString().split('T')[0];
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[7]; 

    await sheet.addRow({ 
      id: productId,
      cliente: cliente,
      anunciante: anunciante,
      formato: formato,
      trader: trader,
      inversion: inversion,
      consumo: consumo,
      objetivoTangible: objetivoTangible,
      objetivoCuantificable: objetivoCuantificable,
      compraTotal: compraTotal,
      date: currentDate,
     });

  } catch (error) {
    console.error('Error al insertar campaña finalizada exitosamente en Google Sheets:', error);
    throw error;
  }
}