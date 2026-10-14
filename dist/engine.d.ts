import { BuyDecision, CombatResult } from './types';
export declare function calculateBuy(teamCredits: number, playerAliveCount?: number): {
    decision: BuyDecision;
    recommendedSpendPerPlayer: number;
    reasoning: string;
};
export declare function simulateEngagement(weaponName: string, distanceMeters: number, targetArmor: 'None' | 'Light' | 'Heavy'): Promise<CombatResult | null>;
export declare function getSynergies(agentName: string): {
    agent: string;
    synergisticCombos: string[];
};
export declare function auditTeamComp(agentNames: string[]): Promise<{
    isValid: boolean;
    roleCounts: Record<string, number>;
    warnings: string[];
    score: number;
}>;
