import { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleSheetHomeData } from '../../lib/googleSheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sheetDataHome = await getGoogleSheetHomeData();

    res.status(200).json(sheetDataHome);
  } catch(error) {
    console.error('Error en el fetching de datos desde Google Sheets:', error);
    res.status(500).json({ error: 'Fallo en el fetch de datos' });

  }
}


