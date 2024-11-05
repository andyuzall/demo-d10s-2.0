import { GoogleSpreadsheet } from 'google-spreadsheet';
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
}

const credentials = JSON.parse(fs.readFileSync('./config/credentials.json', 'utf-8'));

const privateKey = credentials.private_key.replace(/\\n/g,'\n');
const emailKey = credentials.client_email;

const proxyUrl = 'http://localhost:3000';
const proxyAgent = new HttpsProxyAgent(proxyUrl);


const serviceAccountAuth = new JWT({
  email: emailKey,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  additionalClaims: {
    agent: proxyAgent,
  }

});

export default async function getGoogleSheetData() {
  const doc = new GoogleSpreadsheet('11aNHxEm8y2CSMFrnVE_fN6pi_3crJOK5XYJ82G-whm8', serviceAccountAuth)

  try {
    await doc.loadInfo(); // Cargar información de la hoja

    const sheet = doc.sheetsByIndex[0]; // Obtener la primera hoja
    const rows = await sheet.getRows(); // Obtener todas las filas
    // Extraer los datos relevantes (modifica según tu estructura)
    const productos: Producto[] = rows.map(row => ({
      estado: row._rawData[0],
      trader: row._rawData[1],
      id: row._rawData[2],
      sdc: row._rawData[3],
      cliente: row._rawData[4],
      anunciante: row._rawData[5],
      campana: row._rawData[6],
      categoria: row._rawData[7],
      formato: row._rawData[8],
      fechaInicio: row._rawData[9],
      fechaFin: row._rawData[10],
      diasRestantes: row._rawData[11],
      kpiObjetivo: row._rawData[12],
      kpiEntregado: row._rawData[13],
      duracionCampana: row._rawData[14],
      objetivoTangible: row._rawData[15],
      objetivoCuantificable: row._rawData[16],
      compraDeAyer: row._rawData[17],
      compraTotal: row._rawData[18],
      cuantoDeberiamosIr: row._rawData[19],
      cuantoFaltaObjetivo: row._rawData[20],
      porcentajeObjetivo: row._rawData[21],
      inversionCampana: row._rawData[22],
      consumoCampana: row._rawData[23],
      cuantoConsumoDeberiamosIr: row._rawData[24],
      consumoDeAyer: row._rawData[25],
      cuantoFaltaConsumo: row._rawData[26],
      porcentaje: row._rawData[27],
      cuantoFaltaConsumo: row._rawData[28],
    }));

    return productos;
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
    throw error;
  }
}