# MB Nails

Aplicación web para gestionar las órdenes de un salón de uñas: creación de órdenes, consulta del historial y edición de precios de tipos de uñas, extras y decoraciones.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [MongoDB](https://www.mongodb.com/) a través de [Mongoose](https://mongoosejs.com/)
- [zod](https://zod.dev/) para las validaciones
- [date-fns](https://date-fns.org/), [html2canvas](https://html2canvas.hertzen.com/)

Las páginas son Server Components (fetch directo a la base) y las mutaciones usan Server Actions con `useActionState`, `cacheLife` y `cacheTag`. No hay capa REST ni axios.

## Requisitos

- Node.js 20+ (la versión usada en desarrollo es 22+)
- [pnpm](https://pnpm.io/)
- Una instancia de MongoDB (local o Atlas) con la URI de conexión a mano

## Setup

1. Instalar dependencias:

```bash
pnpm install
```

2. Crear el archivo `.env` en la raíz del proyecto basándose en las variables requeridas:

```
MONGO_URI=mongodb://localhost:27017/mb-nails
NEXT_PUBLIC_URL=http://localhost:3000
```

- `MONGO_URI`: URI de conexión a MongoDB (obligatoria; si falta, la app falla al arrancar).
- `NEXT_PUBLIC_URL`: URL base de la app en desarrollo.

3. Correr el servidor de desarrollo:

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Seed (datos iniciales)

La base de datos arranca vacía. Para cargar el catálogo por defecto (tipos de uñas, extras y decoraciones definidos en `constants.ts`), ejecutar el endpoint de seed:

```bash
curl -X POST http://localhost:3000/api/seed
```

El seed es idempotente: solo inserta si la colección correspondiente (types/items) está vacía. Nunca borra ni duplica datos.

## Comandos

| Comando            | Descripción                          |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Servidor de desarrollo               |
| `pnpm build`       | Build de producción                  |
| `pnpm start`       | Servir el build de producción        |
| `pnpm lint`        | Lint con ESLint                      |
| `pnpm typecheck`   | Chequeo de tipos con TypeScript      |

## Estructura

- `app/actions.ts` — Server Actions (CRUD de órdenes, tipos e items).
- `app/api/` — Route handler del seed (carga del catálogo inicial).
- `app/(pages)/` — Páginas de órdenes y precios.
- `components/` — Componentes de UI.
- `constants.ts` — Catálogo inicial de tipos, extras, decoraciones y precios.
- `lib/` — Conexión a MongoDB, tipos, validaciones y utilidades.
- `models/` — Modelos de Mongoose (`Type`, `Item`, `Order`).
- `services/` — Capa de acceso a datos (con caché `use cache` + `cacheTag`).