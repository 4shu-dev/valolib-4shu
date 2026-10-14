import { calculateBuy, simulateEngagement, getSynergies, auditTeamComp } from './src';

async function runTests() {
  console.log('--- 1. Buy Calculation (3200 credits) ---');
  console.log(calculateBuy(3200));

  console.log('\n--- 2. Combat Simulation (Vandal at 25m vs Heavy Armor) ---');
  console.log(await simulateEngagement('Vandal', 25, 'Heavy'));

  console.log('\n--- 3. Gekko Synergies ---');
  console.log(getSynergies('Gekko'));

  console.log('\n--- 4. Team Comp Audit (Jett, Gekko, Chamber) ---');
  console.log(await auditTeamComp(['Jett', 'Gekko', 'Chamber']));
}

runTests();