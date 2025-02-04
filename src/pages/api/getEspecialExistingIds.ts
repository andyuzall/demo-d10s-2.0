import { NextApiRequest, NextApiResponse } from 'next';
import {  } from '../../lib/bigQuery';
import { getGoogleSheetEspecialIds } from '@/lib/googleSheets';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
    if(req.method === 'GET') {
        try {
            const especialIds = await getGoogleSheetEspecialIds();

            const idsencontred = especialIds.map(item => item.id)
            res.status(200).json(idsencontred);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los ids existentes' });
        }
    } else {    
        res.status(405).json({ error: 'Método no permitido' });
    }
};