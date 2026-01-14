#  TeamLag — Sitio Oficial

Sitio web oficial de la comunidad del TeamLag. Construido con `Astro` y estilizado con `Tailwind CSS`.

##  Características
- Diseño moderno con efectos `glass` y tipografía `Orbitron`.
- Páginas: `Información`, `Categorías`, `Nominados`, `Inicio` y `404` personalizada.
- Navegación responsiva con logo centrado y menú móvil.
- Sección de categorías interactiva: vista de cuadrícula y detalle con nominados en miniaturas, navegación por flechas.

##  Stack Tecnológico
- Astro `^5.15.3`
- Tailwind CSS `^4.x` con PostCSS (`@tailwindcss/postcss`, `postcss`, `autoprefixer`)

##  Inicio Rápido

```powershell
npm install
npm run dev
```

Servidor de desarrollo en `http://localhost:4321`.

Build de producción:

```powershell
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```text
/
├── public/                 # Estáticos (ej: /img, /favicon)
├── src/
│   ├── assets/
│   ├── components/         # Navbar, Hero, Awards, Nominees, Footer
│   ├── layouts/            # Layout.astro (importa estilos globales)
│   └── pages/              # index, info, categorias, 404
├── src/styles/global.css   # Importa Tailwind y estilos globales
├── tailwind.config.cjs     # Rutas de contenido
├── postcss.config.cjs      # Plugins PostCSS (Tailwind + Autoprefixer)
├── astro.config.mjs        # Config Astro
└── package.json            # Scripts y dependencias
```

##  Estilos y Tailwind
- Importación en `src/styles/global.css`:
	- `@import "tailwindcss";` (Tailwind v4)
- Tailwind escanea: `./src/**/*.{astro,html,js,ts,jsx,tsx}`.
- Si usas `@apply` dentro de `<style>` en componentes, añade `lang="postcss"` o mueve utilidades al HTML.

##  Troubleshooting
- Error “Cannot apply unknown utility class”: usa utilidades en HTML o `lang="postcss"`.
- Error “Unterminated string literal”: revisa `<script>` en `.astro` y evita cadenas mal cerradas.
- Si las clases no aplican, verifica que `global.css` se importa en `Layout.astro` y que PostCSS usa `@tailwindcss/postcss`.

##  Deploy
- Compatible con Vercel/Netlify. Ejecuta build (`npm run build`) y sirve `/dist`.

##  Contribuir
- PRs bienvenidas. Usa la rama `main`. Mantén el estilo consistente y evita cambios no relacionados.
