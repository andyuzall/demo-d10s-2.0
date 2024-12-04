import { NextApiRequest, NextApiResponse } from 'next';
import { getGoogleSheetHomeData } from '../../lib/googleSheets';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session || !session.user?.email) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const userEmail = session.user.email; 
    const sheetDataHome = await getGoogleSheetHomeData(userEmail);
    res.status(200).json(sheetDataHome);
  } catch(error) {
    console.error('Error en el fetching de datos desde Google Sheets:', error);
    res.status(500).json({ error: 'Fallo en el fetch de datos' });

  }
}


