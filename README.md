# valolib-4shu 🎮⚔️

> An innovative headless tactical engine, data wrapper, and CLI utility for Valorant—built in TypeScript.

[![npm version](https://img.shields.io/npm/v/valolib-4shu.svg)](https://www.npmjs.com/package/valolib-4shu)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/4shu-dev/valolib-4shu/main)](https://github.com/4shu-dev/valolib-4shu)

---

## 🚀 What It Does

`valolib-4shu` is a robust backend and utility library designed to bridge raw game data with practical tactical logic. Instead of hardcoding values or parsing messy game files, developers can use this library to power:
* **Economic Buy Calculators (`calculateBuy`)**: Evaluates team credit pools to recommend whether to full buy, force, or save.
* **Combat & TTK Simulations (`simulateEngagement`)**: Calculates accurate headshot/bodyshot damage, armor mitigation, and Time-to-Kill curves based on weapon stats, distance ranges, and shield types.
* **Team Composition Audits (`auditTeamComp`)**: Inspects drafted agents to flag structural vulnerabilities (e.g., missing essential roles like Controllers or Initiators).
* **Dynamic Map & Callout Lookups**: Fetches official map zones and coordinates directly utilizing data pipelines.
* **CLI Execution**: Ships with a built-in terminal CLI interface for instant querying on the fly.

---

## ⚙️ How It Does It

Under the hood, `valolib-4shu` operates as a deterministic rules engine combined with official data structures:
1. **Data Normalization:** Weapon baselines, agent metadata, and map zones are modeled locally and synced via high-performance JSON schemas.
2. **Mathematical Modeling:** Combat math parses damage falloff matrices across specific distance thresholds (e.g., 0-30m vs. 30-50m) and applies Riot's precise armor reduction formulas (reducing base damage by a flat mitigation factor against heavy/light shields).
3. **TypeScript Abstraction:** The entire package is written in strict TypeScript (`tsc`) to ensure type safety across all engine modules, exporting clean definitions (`.d.ts`) for seamless integration into modern Node.js, Discord bots, or web apps.

---

## 📦 How to Install

Install the package via npm into your Node.js project:

```bash
npm install valolib-4shu
