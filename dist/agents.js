"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAgents = getAllAgents;
exports.getAgentByName = getAgentByName;
exports.getAgentsByRole = getAgentsByRole;
const agents_json_1 = __importDefault(require("../data/agents.json"));
function getAllAgents() {
    return agents_json_1.default;
}
function getAgentByName(name) {
    return agents_json_1.default.find((agent) => agent.name.toLowerCase() === name.toLowerCase());
}
function getAgentsByRole(role) {
    return agents_json_1.default.filter((agent) => agent.role.toLowerCase() === role.toLowerCase());
}
