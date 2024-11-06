import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import { HttpsProxyAgent } from 'https-proxy-agent';

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
}

const credentials = JSON.parse(fs.readFileSync('./config/credentials.json', 'utf-8'));

const privateKey = credentials.private_key.replace(/\\n/g, '\n');
const emailKey = credentials.client_email;

const proxyUrl = 'http://localhost:3000';
const proxyAgent = new HttpsProxyAgent(proxyUrl);

const serviceAccountAuth = new JWT({
  email: emailKey,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  additionalClaims: {
    agent: proxyAgent,
  },
});

// Cambia el tipo de la función para que devuelva `Producto[]`
export default async function getGoogleSheetData(): Promise<Producto[]> {
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth);

  try {
    await doc.loadInfo(); // Cargar información de la hoja

    const sheet = doc.sheetsByIndex[0]; // Obtener la primera hoja
    const rows = await sheet.getRows<Producto>(); // Obtener las filas con el tipo Producto

    // Mapear las filas a productos
    const productos: Producto[] = rows.map((row: GoogleSpreadsheetRow<Producto>) => ({
      estado: row.get('estado'), // Asegúrate de que la propiedad existe
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
    }));

    return productos;
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
    throw error;
  }
}