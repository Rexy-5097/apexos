import type { CctvCamera } from './types';

/** Windy embed helper — iframe only, no broken image URLs */
function windy(id: string): Pick<CctvCamera, 'stream_url' | 'stream_type' | 'external_url' | 'source'> {
  return {
    stream_url: `https://www.windy.com/webcams/${id}/embed`,
    stream_type: 'iframe',
    external_url: `https://www.windy.com/webcams/${id}`,
    source: 'Windy',
  };
}

const ITALY_CAMERAS: CctvCamera[] = [
  // Rome
  {
    id: 'it-rome-colosseum',
    lat: 41.8902, lng: 12.4922,
    name: 'Roma - Colosseum',
    city: 'Rome', country: 'Italy',
    ...windy('1586955498'),
  },
  {
    id: 'it-rome-pantheon',
    lat: 41.8986, lng: 12.4769,
    name: 'Roma - Pantheon / Piazza della Rotonda',
    city: 'Rome', country: 'Italy',
    ...windy('1363017757'),
  },
  {
    id: 'it-rome-st-peters',
    lat: 41.9022, lng: 12.4539,
    name: 'Roma - St. Peter\'s Basilica',
    city: 'Rome', country: 'Italy',
    ...windy('1415100696'),
  },
  // Venice
  {
    id: 'it-venice-rialto',
    lat: 45.438, lng: 12.336,
    name: 'Venezia - Rialto Bridge',
    city: 'Venice', country: 'Italy',
    ...windy('1340720365'),
  },
  {
    id: 'it-venice-stmark',
    lat: 45.4341, lng: 12.339,
    name: 'Venezia - St. Mark\'s Square',
    city: 'Venice', country: 'Italy',
    ...windy('1363852427'),
  },
  // Milan
  {
    id: 'it-milan-duomo',
    lat: 45.4642, lng: 9.1900,
    name: 'Milano - Duomo Cathedral',
    city: 'Milan', country: 'Italy',
    ...windy('1586862002'),
  },
  // Naples / Vesuvius
  {
    id: 'it-naples-vesuvius',
    lat: 40.8518, lng: 14.2681,
    name: 'Napoli - Mount Vesuvius',
    city: 'Naples', country: 'Italy',
    ...windy('1442453557'),
  },
  {
    id: 'it-naples-harbor',
    lat: 40.835, lng: 14.261,
    name: 'Napoli - Harbor / Castel dell\'Ovo',
    city: 'Naples', country: 'Italy',
    ...windy('1502972244'),
  },
  // Florence
  {
    id: 'it-florence-duomo',
    lat: 43.7731, lng: 11.2560,
    name: 'Firenze - Duomo / Piazza del Duomo',
    city: 'Florence', country: 'Italy',
    ...windy('1546268098'),
  },
  // Amalfi Coast
  {
    id: 'it-amalfi-coast',
    lat: 40.6340, lng: 14.6027,
    name: 'Amalfi Coast - Panoramic View',
    city: 'Amalfi', country: 'Italy',
    ...windy('1523789742'),
  },
  // Sardinia
  {
    id: 'it-cagliari-port',
    lat: 39.2181, lng: 9.1109,
    name: 'Cagliari - Port & Marina',
    city: 'Cagliari', country: 'Italy',
    ...windy('1588063754'),
  },
  // Sicily - Mount Etna
  {
    id: 'it-etna-volcano',
    lat: 37.7510, lng: 14.9934,
    name: 'Mount Etna - Volcano',
    city: 'Catania', country: 'Italy',
    ...windy('1283466604'),
  },
];

export async function fetchItalyCameras(): Promise<CctvCamera[]> {
  return ITALY_CAMERAS;
}

export default ITALY_CAMERAS;
