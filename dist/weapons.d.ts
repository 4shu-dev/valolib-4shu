import { Weapon } from './types';
export declare function getAllWeapons(): Weapon[];
export declare function getWeaponByName(name: string): Weapon | undefined;
export declare function getWeaponsByCategory(category: Weapon['category']): Weapon[];
