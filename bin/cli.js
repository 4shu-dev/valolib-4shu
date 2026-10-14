#!/usr/bin/env node

const { calculateBuy, simulateEngagement, getSynergies, auditTeamComp } = require('../dist/index');
const { getMapCallouts } = require('../dist/maps');

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  switch (command) {
    case 'buy': {
      const credits = parseInt(args[1]) || 3000;
      console.log(`\n💰 Analyzing Buy for ${credits} credits:`);
      console.log(calculateBuy(credits));
      break;
    }
    case 'combat': {
      const weapon = args[1] || 'Vandal';
      const distance = parseInt(args[2]) || 20;
      const armor = args[3] || 'Heavy';
      console.log(`\n⚔️ Simulating Engagement (${weapon} at ${distance}m vs ${armor} Armor):`);
      const result = await simulateEngagement(weapon, distance, armor);
      console.log(result);
      break;
    }
    case 'synergy': {
      const agent = args[1] || 'Gekko';
      console.log(`\n🧩 Synergies for ${agent}:`);
      console.log(getSynergies(agent));
      break;
    }
    case 'audit': {
      const agents = args.slice(1);
      if (agents.length === 0) {
        console.log('⚠️ Please specify agents, e.g.: npx valo-lib audit Jett Gekko Omen Killjoy Sova');
        return;
      }
      console.log(`\n🛡️ Auditing Team Composition:`, agents);
      const audit = await auditTeamComp(agents);
      console.log(audit);
      break;
    }
    case 'map': {
      const mapName = args[1] || 'Ascent';
      console.log(`\n🗺️ Fetching Callouts for ${mapName}:`);
      const data = await getMapCallouts(mapName);
      console.log(data);
      break;
    }
    default:
      console.log(`
🎮 Valo-Lib Tactical CLI Engine
Usage:
  npx valo-lib buy <credits>               - Calculate optimal buy round
  npx valo-lib combat <weapon> <dist> <armor> - Simulate damage/TTK
  npx valo-lib synergy <agent>             - Look up agent combos
  npx valo-lib audit <agent1> <agent2>...  - Audit team composition roles
  npx valo-lib map <mapName>               - Get official map callout zones
      `);
  }
}

main();