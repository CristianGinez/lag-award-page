// src/lib/discord.ts

export async function sendChangelogToDiscord(version: string, changes: string[], imageUrl?: string) {
    const webhookUrl = import.meta.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        console.error("Falta la variable DISCORD_WEBHOOK_URL");
        return;
    }

    // Formato del mensaje (Embed)
    const payload = {
        username: "Team Lag Page",
        avatar_url: "https://www.tlag.online/img/tl_logo.png", // Tu logo
        embeds: [
            {
                title: `🚀 Actualización v${version}`,
                description: "Actualización en detalle de la nueva versión:",
                color: 15418782, // Un color dorado/amarillo (decimal)
                fields: [
                    {
                        name: "Cambios Recientes",
                        value: changes.map(c => `• ${c}`).join("\n"), // Lista con viñetas
                        inline: false
                    }
                ],
                image: imageUrl ? {
                    url: imageUrl
                } : undefined,
                footer: {
                    text: "Team Lag Dev Team • " + new Date().toLocaleDateString(),
                    icon_url: "https://www.tlag.online/img/tl_logo.png"
                },
                url: "https://www.tlag.online/desarrollo" // Link a tu web
            }
        ]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("✅ Changelog enviado a Discord correctamente.");
        } else {
            console.error("❌ Error enviando a Discord:", await response.text());
        }
    } catch (error) {
        console.error("❌ Error de red:", error);
    }
}