import { Agent } from './types';
export declare function getAllAgents(): Agent[];
export declare function getAgentByName(name: string): Agent | undefined;
export declare function getAgentsByRole(role: Agent['role']): Agent[];
