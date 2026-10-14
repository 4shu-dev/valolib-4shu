export interface Ability {
  slot: string;
  name: string;
  type: string;
  description: string;
  cooldown?: number;
  tacticalNotes?: string;
}

export interface Agent {
  id: string;
  name: string;
  role: 'Initiator' | 'Duelist' | 'Controller' | 'Sentinel';
  biography: string;
  abilities: Ability[];
}

export interface WeaponDamage {
  rangeStart: number;
  rangeEnd: number;
  head: number;
  body: number;
  leg: number;
}

export interface Weapon {
  id: string;
  name: string;
  category: 'Sidearms' | 'SMGs' | 'Shotguns' | 'Rifles' | 'Sniper Rifles' | 'Machine Guns' | 'Armor';
  cost: number;
  fireRate: number;
  magazineSize: number;
  damages: WeaponDamage[];
}

export interface ValorantApiAgent {
  uuid: string;
  displayName: string;
  description: string;
  role?: {
    displayName: 'Initiator' | 'Duelist' | 'Controller' | 'Sentinel';
  };
  abilities: {
    slot: string;
    displayName: string;
    description: string;
  }[];
}

export interface ValorantApiWeapon {
  uuid: string;
  displayName: string;
  category: string;
  shopData?: {
    cost: number;
  };
  weaponStats?: {
    fireRate: number;
    magazineSize: number;
    damageRanges: {
      rangeStartMeters: number;
      rangeEndMeters: number;
      headDamage: number;
      bodyDamage: number;
      legDamage: number;
    }[];
  };
}

export type BuyDecision = 'Full Buy' | 'Force Buy' | 'Eco' | 'Save';

export interface CombatResult {
  weapon: string;
  distance: number;
  targetArmor: 'None' | 'Light' | 'Heavy';
  damageDealt: { head: number; body: number; leg: number };
  isOneTapHeadshot: boolean;
  estimatedTimeToKillSeconds: number;
}