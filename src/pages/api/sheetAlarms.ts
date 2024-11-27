import { NextApiRequest, NextApiResponse } from 'next';
import { getAlarms } from '../../lib/googleSheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sheetAlarms = await getAlarms();

    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - 20);

    const filteredAlarms = sheetAlarms.filter((alarm) => {
      const alarmDate = new Date(alarm.dateFormmated);
      const normalizedAlarmDate = new Date(alarmDate.getFullYear(), alarmDate.getMonth(), alarmDate.getDate());
      
      const normalizedDateLimit = new Date(dateLimit.getFullYear(), dateLimit.getMonth(), dateLimit.getDate());
      
      return normalizedAlarmDate >= normalizedDateLimit;

    });

    const count = filteredAlarms.length;

    const recentAlarms = filteredAlarms.slice(-5);

    res.status(200).json({ count, recentAlarms });

  } catch(error) {
    console.error('Error en el fetching de datos desde Google Sheets:', error);
    res.status(500).json({ error: 'Fallo en el fetch de datos' });

  }
}


