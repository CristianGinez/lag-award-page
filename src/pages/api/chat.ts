import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';
import categories from '../../data/categories';

const API_KEY = "AIzaSyCZWtp0aATHomMzWsBBOvL73fF9f5APi64";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    console.log("Recibida solicitud de chat");

    if (!API_KEY) {
        return new Response(JSON.stringify({ error: 'Configuración de API Key faltante' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return new Response(JSON.stringify({ error: 'Mensaje requerido' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Preparar contexto con los datos de categorías y nominados
        const context = categories.map(cat => {
            const nominees = cat.nominees.map((nom: any) =>
                `- ${nom.name} (${nom.creator || 'Sin creador'}): ${nom.description}`
            ).join('\n');
            return `Categoría: ${cat.title}\nDescripción: ${cat.description}\nNominados:\n${nominees}`;
        }).join('\n\n');

        const systemPrompt = `
      Eres el asistente virtual de los "LAG AWARDS 2025", un evento de premios para una comunidad de gaming y streaming.
      Tu objetivo es responder preguntas sobre el evento, las categorías y los nominados basándote en la siguiente información.
      
      INFORMACIÓN DEL EVENTO:
      ${context}
      
      INSTRUCCIONES:
      - Responde de manera amigable, divertida y con "jerga gamer" leve (no exageres).
      - Si te preguntan por algo que no está en la información, di que no tienes datos sobre eso pero invita a votar en las categorías existentes.
      - Sé conciso.
      - Si te preguntan quién va a ganar, di que eso lo decide la comunidad con sus votos.
      - El evento celebra fails, jugadas épicas, momentos graciosos, etc.
      - IMPORTANTE: Tu respuesta se mostrará en una web. USA FORMATO HTML para que se vea bien:
        - Usa <strong> para resaltar nombres o categorías.
        - Usa <ul> y <li> para hacer listas (por ejemplo, al listar nominados).
        - Usa <br> para saltos de línea.
        - NO uses Markdown (como ** o -), usa solo HTML.
    `;

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Entendido. ¡Estoy listo para responder sobre los LAG AWARDS 2025! ¿Qué necesitas saber, crack?" }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return new Response(JSON.stringify({ reply: text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        return new Response(JSON.stringify({
            error: 'Error procesando tu solicitud',
            details: error.message || String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
