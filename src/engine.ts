import { ValorantApiAgent, ValorantApiWeapon, BuyDecision, CombatResult } from './types';

let cachedAgents: ValorantApiAgent[] | null = null;
let cachedWeapons: ValorantApiWeapon[] | null = null;

async function fetchAgents(): Promise<ValorantApiAgent[]> {
  if (cachedAgents) return cachedAgents;
  const res = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
  const json = await res.json();
  cachedAgents = json.data;
  return cachedAgents!;
}

async function fetchWeapons(): Promise<ValorantApiWeapon[]> {
  if (cachedWeapons) return cachedWeapons;
  const res = await fetch('https://valorant-api.com/v1/weapons');
  const json = await res.json();
  cachedWeapons = json.data;
  return cachedWeapons!;
}

// 1. Smart Eco-Round & Buy Calculator
export function calculateBuy(teamCredits: number, playerAliveCount: number = 5): { decision: BuyDecision; recommendedSpendPerPlayer: number; reasoning: string } {
  const avgCredits = teamCredits / playerAliveCount;
  
  if (avgCredits >= 3900) {
    return { decision: 'Full Buy', recommendedSpendPerPlayer: 3900, reasoning: 'Sufficient funds for Vandal/Phantom, Heavy Shields, and full utility.' };
  } else if (avgCredits >= 2400) {
    return { decision: 'Force Buy', recommendedSpendPerPlayer: 2400, reasoning: 'Sub-optimal funds, but enough to contest the round with Bulldogs, Marshals, or Spectres.' };
  } else if (avgCredits >= 1500) {
    return { decision: 'Eco', recommendedSpendPerPlayer: 1000, reasoning: 'Low economy; buy Sheriffs, Frenzys, or Light Shields to farm exit kills.' };
  } else {
    return { decision: 'Save', recommendedSpendPerPlayer: 0, reasoning: 'Critically low credits. Do not buy anything; preserve economy for the next round.' };
  }
}

// 2. Gun-Fighter Combat Simulator / Damage Math
export async function simulateEngagement(weaponName: string, distanceMeters: number, targetArmor: 'None' | 'Light' | 'Heavy'): Promise<CombatResult | null> {
  const weapons = await fetchWeapons();
  const weapon = weapons.find(w => w.displayName.toLowerCase() === weaponName.toLowerCase());
  
  if (!weapon || !weapon.weaponStats) return null;

  const rangeData = weapon.weaponStats.damageRanges.find(
    r => distanceMeters >= r.rangeStartMeters && distanceMeters <= r.rangeEndMeters
  ) || weapon.weaponStats.damageRanges[0]; // Default to closest range if out of bounds

  let head = rangeData.headDamage;
  let body = rangeData.bodyDamage;
  let leg = rangeData.legDamage;

  // Armor mitigation simulation
  let effectiveHpHead = head;
  if (targetArmor === 'Heavy' && head < 160 && head > 0) {
    // e.g. Phantom vs Heavy armor at distance
  }

  const isOneTapHeadshot = head >= (targetArmor === 'Heavy' ? 150 : (targetArmor === 'Light' ? 125 : 100));
  const fireRate = weapon.weaponStats.fireRate;
  const ttk = fireRate > 0 ? Number((1 / fireRate).toFixed(2)) : 0;

  return {
    weapon: weapon.displayName,
    distance: distanceMeters,
    targetArmor,
    damageDealt: { head, body, leg },
    isOneTapHeadshot,
    estimatedTimeToKillSeconds: ttk
  };
}

// 3. Ability Synergy & Combo Engine
export function getSynergies(agentName: string): { agent: string; synergisticCombos: string[] } {
  const normalized = agentName.toLowerCase();
  
  const combos: Record<string, string[]> = {
    gekko: [
      'Wingman + Breach/Concuss: Send Wingman to plant while stun covers defuse deniers.',
      'Dizzy + Dualist Entry: Toss Dizzy high overhead to blind site anchors just as Jett/Neon dashes in.'
    ],
    chamber: [
      'Trademark + Viper/Fade Decay: Place your slow trap in a decaying choke point to guarantee immobilized picks.',
      'Rendezvous + Omen Teleport: Anchor on-site safely while playing extreme off-angles.'
    ],
    jett: [
      'Cloudburst + Sova Recon: Smoke off a choke and let Sova dart reveal enemies shuffling blind.',
      'Updraft + Raze Satchel: Combined aerial positioning for unexpected vertical peaks.'
    ]
  };

  return {
    agent: agentName,
    synergisticCombos: combos[normalized] || ['Standard utility trading and crossfire positioning.']
  };
}

// 4. Team Composition Role Balancer
export async function auditTeamComp(agentNames: string[]): Promise<{ isValid: boolean; roleCounts: Record<string, number>; warnings: string[]; score: number }> {
  const agents = await fetchAgents();
  const roleCounts: Record<string, number> = { Duelist: 0, Initiator: 0, Controller: 0, Sentinel: 0 };
  const warnings: string[] = [];

  for (const name of agentNames) {
    const found = agents.find(a => a.displayName.toLowerCase() === name.toLowerCase());
    if (found && found.role?.displayName) {
      roleCounts[found.role.displayName] = (roleCounts[found.role.displayName] || 0) + 1;
    }
  }

  if (roleCounts['Controller'] === 0) {
    warnings.push('CRITICAL: 0 Controllers (Smokes). Blocking vision on default sites will be extremely difficult.');
  }
  if (roleCounts['Sentinel'] === 0) {
    warnings.push('WARNING: 0 Sentinels. Flank watch and post-plant site anchoring lack automated defense.');
  }
  if (roleCounts['Duelist'] > 2) {
    warnings.push('NOTICE: Heavy Duelist composition. Team utility spread may lack heavy execution tools.');
  }

  let score = 100;
  score -= roleCounts['Controller'] === 0 ? 40 : 0;
  score -= roleCounts['Sentinel'] === 0 ? 20 : 0;
  score -= warnings.length * 10;
  score = Math.max(0, score);

  return {
    isValid: roleCounts['Controller'] > 0,
    roleCounts,
    warnings,
    score
  };
}