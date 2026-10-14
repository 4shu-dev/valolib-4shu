require('dotenv').config();
const packageJson = require('../package.json');

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

async function sendReleaseAnnouncement() {
  if (!WEBHOOK_URL) {
    console.error("❌ Error: DISCORD_WEBHOOK_URL is not set in your .env file!");
    process.exit(1);
  }

  const payload = {
    username: "ValoLib Bot",
    avatar_url: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png",
    embeds: [
      {
        title: `🚀 New Release: valolib-4shu v${packageJson.version}`,
        description: "An innovative headless tactical engine, data wrapper, and CLI utility for Valorant—built in TypeScript.",
        color: 15158332,
        fields: [
          {
            name: "📦 What It Does",
            value: "• **Economic Buy Calculators** (`calculateBuy`)\n• **Combat & TTK Simulations** (`simulateEngagement`)\n• **Team Comp Audits** (`auditTeamComp`)\n• **Dynamic Map Callouts** via Valorant-API",
            inline: false
          },
          {
            name: "⚙️ Quick Install",
            value: "```bash\nnpm install valolib-4shu\n```",
            inline: false
          },
          {
            name: "🔗 Official Links",
            value: `[npm Package](https://www.npmjs.com/package/valolib-4shu) | [GitHub Repository](https://github.com/4shu-dev/valolib-4shu)`,
            inline: false
          }
        ],
        footer: {
          text: "Built with precision by 4shu-dev | Fahh Community Ecosystem"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log("✅ Discord release announcement sent successfully!");
    } else {
      const errorText = await response.text();
      console.error("❌ Failed to send Discord webhook:", errorText);
    }
  } catch (err) {
    console.error("❌ Error executing webhook request:", err);
  }
}

sendReleaseAnnouncement();