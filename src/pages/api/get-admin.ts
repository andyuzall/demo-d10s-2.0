import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { NextApiRequest, NextApiResponse } from "next";

const filterExceptions = [
  "andy@atomik.pro",
  "alexandra@atomik.pro",
  "martina@atomik.pro",
  "agustin@atomik.pro",
  "programatica@atomik.pro",
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session || !session.user?.email) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
  const isEmailAdmin = session?.user?.email ? filterExceptions.includes(session.user.email) : false;
  console.log("Respuesta de la API:", isEmailAdmin);

  res.status(200).json({ isEmailAdmin });
} catch (error) {
  console.error('Error en el fetching de datos desde Google Sheets:', error);
  res.status(500).json({ error: 'Fallo en el fetch de datos' });
}
}