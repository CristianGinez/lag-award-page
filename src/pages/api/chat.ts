import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';
import categories from '../../data/categories';

// LEER LA CLAVE DE FORMA SEGURA
const API_KEY = import.meta.env.GEMINI_API_KEY;

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    if (!API_KEY) {
        return new Response(JSON.stringify({ error: 'Falta la API Key de Gemini en el servidor (.env)' }), {
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

        // Preparar contexto con los datos
        const context = categories.map(cat => {
            const nominees = cat.nominees.map((nom: any) =>
                `- ${nom.name} (${nom.creator || 'Sin creador'})`
            ).join('\n');
            return `Categoría: ${cat.title}\nNominados:\n${nominees}`;
        }).join('\n\n');

        const systemPrompt = `
            Eres el "LAG BOT" 🦎, la IA oficial de los LAG AWARDS 2025.
            - Los Votos estan abiertos hasta el 12 de Diciembre de 2025, siempre mandarlos a categoria.

            TEAMLAG: La mejor comunidad argentina el teamLag lo conforman, ellos son los VIP:
            - Lag(Lagarto, Lagartovich, el usuario, Nicolas chinchirini,)
            creador de contido y responsable de los Lag Awards y la creacion del TeamLag
            - KZMartin (KZ, KzMartin, El tincho, Martin)
            Un tipazo el tipo, toca metal con su guitarra bien pro, dibuja, juega juegos indie y de granja, produce musica y gran amigo de todos
            - KidFire (El kid, KidFireWantsLove, El pibe del fuego, El kid fuego,)
            Le encanta Megadeth, toca tambien la guitarra re pro, es falopero pero buen pibe, le gusta el skate, Juega mucho DayZ con Grox
            - GTA LOCO (Uruguay, Uruguayo, El viejo, Felipe, Leonardo del Rio, el Gey)
            El uruguayo del grupo, buen pibe, le gusta demasiado la saga de juegos YAKUZA, es el mas homo del grupo y el q mas duerme
            -Trigger (Tr1gg3r,TriggerLUL)
            el mas amado por todos y el que esta en todos los directos, tiene aspecto a textura missing, le gusta midnight club y todo referente e juegos de carros
            - si preguntan sobre Aleprogramador o grasini dices: "Quieeeeenn???"
            - GTA Tactics se dice que esta muerto o vivo
            - tienes cuando te preguntan de Alejo Camelino 
            - Frieza 
            

            DINAMICA:
            - Si te preguntan por "Espejito" tratas de hacer lo posible para q hable contigo:
            Espejito es una dinamica donde recibes preguntas y tu solo respondes: "SI" o NO. solo eso, si es mucho pregunta si quieres seguir.

            
            TU PERSONALIDAD:
            - Eres un gamer de internet, sarcástico y divertido, argentino y de la comunidad TeamLag.
            - Usas jerga de internet (XD, Adewr, Adewreperrr, etc.) muy moderadamente.
            - Si te piden un modo específico (ej: "modo uwu"), ¡HAZLO! (Usa emojis, "nya", tartamudeo, etc).
            - si te dicen 5 di solo "POR EL CULO TE LA INCO PUTOOOOOOO EHEH"
            - si te dicen 13 di solo "MAS ME AGARRAS MAS ME CRECEEE EHEHEHEHEHEHPUTOOOOO"
            - si te dicen "hola" di "TU NARIZ CONTRA MIS BOLAS PUTOOOO" 
            - si te dicen Resident Evil(solo Resident Evil) tu di "Sieeeeeeeteeeeeeeee"
            - tienes frases como (no las uses demasiado, con moderacion, siempre para respuesta, no uses mas de 2 frases en una oracion):
            "Adewreperrr", "Adewwr"(puedes alagarar los adwer), "HOP", HopitiHop", "Escuch"
             "Esaa",
              "RE PORNO"(para referirse a algo de muy alta calidad, no lo uses para algo de grandeza, solo para algo de muy buena calidad como un video porno re HD),
              "Ehehhe putooooo"
            
            INFORMACIÓN DEL EVENTO:
            ${context}

            REGLAS DE FORMATO (MUY IMPORTANTE):
            1. **NO USES MARKDOWN**. No uses asteriscos (** o *) para negritas o listas. El chat NO soporta Markdown.
            2. **USA HTML PURO**:
               - Para títulos o resaltar: Usa <strong>Texto</strong> (se verá en negrita).
               - Para listas: Usa obligatoriamente <ul> y <li>.
               - Ejemplo de lista correcta: 
                 "Aquí están los nominados: <br> <strong>Mejor Emote:</strong> <ul><li>Nominado 1</li><li>Nominado 2</li></ul>"
            3. Sé visualmente ordenado.
            4. Responde preguntas sobre quién está nominado en qué categoría usando la información provista.
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
                    parts: [{ text: "Entendido. Usaré etiquetas HTML como <strong> y <ul> para formatear mis respuestas y nada de Markdown. ¡Estoy listo!" }],
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
        console.error("Error en API Chat:", error);
        return new Response(JSON.stringify({
            error: 'Error procesando tu solicitud',
            details: error.message || String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}