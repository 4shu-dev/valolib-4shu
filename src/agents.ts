import agentsData from '../data/agents.json';
import { Agent } from './types';

export function getAllAgents(): Agent[] {
  return agentsData as Agent[];
}

export function getAgentByName(name: string): Agent | undefined {
  return (agentsData as Agent[]).find(
    (agent) => agent.name.toLowerCase() === name.toLowerCase()
  );
}

export function getAgentsByRole(role: Agent['role']): Agent[] {
  return (agentsData as Agent[]).filter(
    (agent) => agent.role.toLowerCase() === role.toLowerCase()
  );
}