import { NextApiRequest, NextApiResponse } from 'next';
import { fetchEspecialExistingIds } from '../../lib/bigQuery';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
    if(req.method === 'GET') {
        try {
            const existingIds = await fetchEspecialExistingIds();
            res.status(200).json(existingIds);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los ids existentes' });
        }
    } else {    
        res.status(405).json({ error: 'Método no permitido' });
    }
};