"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMapCallouts = getMapCallouts;
let cachedMaps = null;
async function fetchMaps() {
    if (cachedMaps)
        return cachedMaps;
    const res = await fetch('https://valorant-api.com/v1/maps');
    const json = await res.json();
    cachedMaps = json.data;
    return cachedMaps;
}
async function getMapCallouts(mapName) {
    const maps = await fetchMaps();
    const targetMap = maps.find(m => m.displayName.toLowerCase() === mapName.toLowerCase());
    if (!targetMap || !targetMap.callouts)
        return null;
    // Extract unique regions/callouts (e.g., A Heaven, B Long, Mid Doors)
    const uniqueCallouts = Array.from(new Set(targetMap.callouts.map(c => c.regionName)));
    return {
        map: targetMap.displayName,
        callouts: uniqueCallouts
    };
}
