import * as pdf from 'html-pdf'; // Import pdf from html-pdf
import * as ejs from 'ejs'; // Import ejs
import { Readable } from 'stream';
import { FlightLog } from '../models/Flightlog';
import puppeteer from 'puppeteer';
import fs from 'fs';

const getAllFlightLogs = async() => {
    return FlightLog.find();
}

const getFlightLogs = async (droneId: string) => {
  return FlightLog.find({ drone_id: droneId });
};

export const generatePDFForAllFlightLogs = async (): Promise<Readable> => {
    const flightLogs = await getAllFlightLogs();

  if (flightLogs.length === 0) {
    throw new Error('No flight logs found');
  }

    const html = generateHTMLForFlightLogs(flightLogs);

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const pdfBuffer = await page.pdf({
        path: 'result.pdf',
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });

    await browser.close();
    
    return Readable.from(pdfBuffer);
};

export const generatePDFForFlightLogs = async (droneId: string): Promise<Readable> => {
    const flightLogs = await getFlightLogs(droneId);

  if (flightLogs.length === 0) {
    throw new Error('No flight logs found');
  }

    const html = generateHTMLForFlightLogs(flightLogs);

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const pdfBuffer = await page.pdf({
        path: 'result.pdf',
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    });

    await browser.close();
    
    return Readable.from(pdfBuffer);
};

interface Waypoint {
  time?: number; 
  alt: number; 
  lat: number; 
  lng: number; 
}

const generateHTMLForFlightLogs = (flightLogs: any[]): string => {
  return `
    <html>
      <head>
        <title>Flight Logs</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
          h1 {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>Flight Logs</h1>
        <table>
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Drone ID</th>
              <th>Mission Name</th>
              <th>Speed (km/h)</th>
              <th>Distance (km)</th>
              <th>Execution Start</th>
              <th>Execution End</th>
              <th>Waypoints</th>
            </tr>
          </thead>
          <tbody>
            ${flightLogs.map(log => `
              <tr>
                <td>${log.flight_id}</td>
                <td>${log.drone_id}</td>
                <td>${log.mission_name}</td>
                <td>${log.speed}</td>
                <td>${log.distance.toFixed(2)}</td>
                <td>${log.execution_start ? new Date(log.execution_start).toLocaleString() : 'N/A'}</td>
                <td>${log.execution_end ? new Date(log.execution_end).toLocaleString() : 'N/A'}</td>
                <td>
                  ${log.waypoints.map((waypoint: Waypoint) => `
                    <div>Time: ${waypoint.time ? waypoint.time.toFixed(3) : 'N/A'}s, 
                          Altitude: ${waypoint.alt}m, 
                          Latitude: ${waypoint.lat}, 
                          Longitude: ${waypoint.lng}</div>
                  `).join('<br/>')}
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;
};

export default {
    generatePDFForAllFlightLogs,
    generatePDFForFlightLogs,
    getAllFlightLogs,
    getFlightLogs,
};
