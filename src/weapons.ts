import weaponsData from '../data/weapons.json';
import { Weapon } from './types';

export function getAllWeapons(): Weapon[] {
  return weaponsData as Weapon[];
}

export function getWeaponByName(name: string): Weapon | undefined {
  return (weaponsData as Weapon[]).find(
    (weapon) => weapon.name.toLowerCase() === name.toLowerCase()
  );
}

export function getWeaponsByCategory(category: Weapon['category']): Weapon[] {
  return (weaponsData as Weapon[]).filter(
    (weapon) => weapon.category.toLowerCase() === category.toLowerCase()
  );
}