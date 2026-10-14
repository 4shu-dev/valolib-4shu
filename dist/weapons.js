"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllWeapons = getAllWeapons;
exports.getWeaponByName = getWeaponByName;
exports.getWeaponsByCategory = getWeaponsByCategory;
const weapons_json_1 = __importDefault(require("../data/weapons.json"));
function getAllWeapons() {
    return weapons_json_1.default;
}
function getWeaponByName(name) {
    return weapons_json_1.default.find((weapon) => weapon.name.toLowerCase() === name.toLowerCase());
}
function getWeaponsByCategory(category) {
    return weapons_json_1.default.filter((weapon) => weapon.category.toLowerCase() === category.toLowerCase());
}
