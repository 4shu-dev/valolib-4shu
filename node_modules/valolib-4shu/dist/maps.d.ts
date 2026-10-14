export interface MapCallout {
    regionName: string;
    superRegionName: string;
    location: {
        x: number;
        y: number;
    };
}
export interface ValorantMap {
    uuid: string;
    displayName: string;
    tacticalDescription?: string;
    coordinates?: string;
    callouts?: MapCallout[];
}
export declare function getMapCallouts(mapName: string): Promise<{
    map: string;
    callouts: string[];
} | null>;
