export interface MapCallout {
  regionName: string;
  superRegionName: string;
  location: { x: number; y: number };
}

export interface ValorantMap {
  uuid: string;
  displayName: string;
  tacticalDescription?: string;
  coordinates?: string;
  callouts?: MapCallout[];
}

let cachedMaps: ValorantMap[] | null = null;

async function fetchMaps(): Promise<ValorantMap[]> {
  if (cachedMaps) return cachedMaps;
  const res = await fetch('https://valorant-api.com/v1/maps');
  const json = await res.json();
  cachedMaps = json.data;
  return cachedMaps!;
}

export async function getMapCallouts(mapName: string): Promise<{ map: string; callouts: string[] } | null> {
  const maps = await fetchMaps();
  const targetMap = maps.find(m => m.displayName.toLowerCase() === mapName.toLowerCase());
  
  if (!targetMap || !targetMap.callouts) return null;

  // Extract unique regions/callouts (e.g., A Heaven, B Long, Mid Doors)
  const uniqueCallouts = Array.from(new Set(targetMap.callouts.map(c => c.regionName)));

  return {
    map: targetMap.displayName,
    callouts: uniqueCallouts
  };
}