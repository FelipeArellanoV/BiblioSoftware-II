# BiblioSoftware-II
Proyecto Universitario - Trabajo Grupal orientado a la elaboración de proyecto en la busqueda de mejorar el sistema utilizado en bibliotecas

## 👥 Integrantes del equipo
- **Sofia Henriquez**  
- **Felipe Arellano** 
- **Simon Cifuentes** 




Biblioteca – Login (NestJS + Prisma + PostgreSQL + Next.js)

Proyecto base con login y registro funcionales y arquitectura escalable (SOLID + Clean).
Stack:

Backend: NestJS · Prisma ORM · PostgreSQL · JWT

Frontend: Next.js (App Router, TS) · TailwindCSS · Axios

Infra local: Docker Compose (PostgreSQL)

🚀 TL;DR (arranque rápido)
# 0) desde la raíz del repo
docker compose up -d                     # levanta PostgreSQL

# 1) Backend
cd backend
npm install
npm run prisma:migrate -- -n init
npm run prisma:generate
npm run seed:login                       # crea demo@demo.cl / demo123
npm run dev                              # http://localhost:4000 (docs en /docs)

# 2) Frontend
cd ../frontend
npm install
npm run dev                              # http://localhost:3000


Prueba en la web:

Login: http://localhost:3000/login

Registro: http://localhost:3000/register

Usuario demo: demo@demo.cl · demo123

Prueba por API:

Swagger: http://localhost:4000/docs

POST /auth/login y POST /auth/register

📦 Requisitos

Node.js 18+ (o 20+ recomendado) y npm

Docker + Docker Compose

(Opcional) Postman/Insomnia para probar API

🗂️ Estructura del repositorio
BiblioSoftware-II/
├─ docker-compose.yml           # PostgreSQL local
├─ .gitignore                   # ignore global (Node/Nest/Next/Prisma)
├─ backend/
│  ├─ .env                      # variables (NO commitear)
│  ├─ prisma/
│  │  ├─ schema.prisma          # modelo User
│  │  └─ seed-login.ts          # usuario demo
│  └─ src/
│     ├─ app.module.ts
│     ├─ main.ts
│     ├─ prisma/                # PrismaService (global)
│     ├─ domain/                # entidades + contratos
│     ├─ application/           # casos de uso (login/register)
│     ├─ infrastructure/        # Prisma/Bcrypt/JWT
│     └─ interface/http/        # controller + DTOs
└─ frontend/
   ├─ .env.local                # URL de la API
   └─ src/app/
      ├─ login/page.tsx         # login (UI oscura)
      ├─ register/page.tsx      # registro
      ├─ page.tsx               # home simple
      └─ layout.tsx             # barra superior

⚙️ Variables de entorno

Backend (backend/.env):

PORT=4000
DATABASE_URL="postgresql://biblioteca:biblioteca@localhost:5432/biblioteca?schema=public"
JWT_SECRET="cambia-esto"
JWT_EXPIRES_IN="1d"


Frontend (frontend/.env.local):

NEXT_PUBLIC_API_URL=http://localhost:4000/api


Incluye backend/.env.example y frontend/.env.example para guiar a otros devs:

# backend/.env.example
PORT=4000
DATABASE_URL="postgresql://biblioteca:biblioteca@localhost:5432/biblioteca?schema=public"
JWT_SECRET="cambia-esto"
JWT_EXPIRES_IN="1d"

# frontend/.env.example
NEXT_PUBLIC_API_URL=http://localhost:4000/api

🧰 Scripts útiles

Backend

npm run dev – levantar API en modo desarrollo

npm run prisma:migrate -- -n <name> – crear/ejecutar migración

npm run prisma:generate – generar cliente de Prisma

npm run seed:login – crea demo@demo.cl / demo123

Frontend

npm run dev – levantar Next.js en desarrollo

🔐 Endpoints principales (API)

POST /auth/login
Body: { "email": "demo@demo.cl", "password": "demo123" }
Res: { "access_token": "...", "user": { id, email, name, role } }

POST /auth/register
Body: { "email": "...", "name": "...", "password": "..." }
Res: (emite access_token y devuelve user)

Swagger: http://localhost:4000/docs

🧱 Diseño y arquitectura

Clean Architecture / SOLID

Domain (entidades/contratos) no depende de Nest/Prisma.

Application (casos de uso) depende de interfaces.

Infrastructure (Prisma, Bcrypt, JWT) implementa esas interfaces.

Interface (Controllers/DTOs) expone HTTP.

Esto facilita cambiar ORM, hash o token sin tocar los casos de uso.

🧪 Cómo probar
Web

docker compose up -d

Backend: cd backend && npm i && npm run prisma:migrate -- -n init && npm run prisma:generate && npm run seed:login && npm run dev

Frontend: cd ../frontend && npm i && npm run dev

Abre http://localhost:3000/login (o …/register)

Terminal (Windows PowerShell)
irm http://localhost:4000/api/auth/login `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"email":"demo@demo.cl","password":"demo123"}'

🐞 Troubleshooting

@prisma/client did not initialize yet
Falta generar Prisma. Corre:
npm run prisma:generate

Prisma “schema validation”
Asegúrate de que prisma/schema.prisma empiece con:

generator client { ... }


Luego: npx prisma format && npx prisma validate

No conecta a la DB

docker compose ps → el contenedor db debe estar “running”.

Verifica DATABASE_URL en backend/.env.

CORS desde el frontend
El backend está configurado para permitir http://localhost:3000. Si cambias el puerto/host, ajusta app.enableCors(...) en backend/src/main.ts.

🛣️ Próximos pasos (sugerencias)

GET /auth/me + guard JWT para rutas protegidas.

Refresh tokens + revocación.

Roles/permissions (ADMIN/LIBRARIAN/USER).

Recuperación de contraseña (token por correo).

Tests (unit/e2e) de casos de uso y controllers.