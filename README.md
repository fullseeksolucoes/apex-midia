# Apex Mídias

Site institucional + painel admin da Apex Mídias.

Stack: Next.js 16 (App Router), TypeScript, Tailwind 4, tRPC v11, Prisma 7 (Neon), Clerk, UploadThing v7.

## Setup local

### 1. Instalar dependências

```bash
npm install
```

`postinstall` já roda `prisma generate`.

### 2. Configurar variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

| Variável | O que é |
| --- | --- |
| `DATABASE_URL` | Connection string **pooled** do Neon ([console](https://console.neon.tech)) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Publishable key do app no [dashboard Clerk](https://dashboard.clerk.com) → API Keys |
| `CLERK_SECRET_KEY` | Secret key do app no Clerk |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/admin/login` (já default no `.env.example`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/admin/dashboard` |
| `UPLOADTHING_TOKEN` | Token do app no [painel UploadThing](https://uploadthing.com/dashboard) |

Crie seu usuário admin no [dashboard do Clerk](https://dashboard.clerk.com) → Users → Add User (e-mail + senha).

### 3. Banco de dados

Criar tabelas e popular com os projetos iniciais:

```bash
npm run db:push        # cria tabelas no Neon a partir do schema.prisma
npm run db:seed        # importa os 6 projetos e 8 brands de content/projects.ts
```

Outras tarefas:

```bash
npm run db:studio      # GUI do Prisma
npm run db:migrate     # criar nova migration durante o dev
npm run db:deploy      # aplicar migrations (produção)
```

### 4. Rodar localmente

```bash
npm run dev
```

- Site público: <http://localhost:3000>
- Login admin: <http://localhost:3000/admin/login>

## Estrutura

```text
app/
  layout.tsx             # raiz: ClerkProvider + fontes
  (public)/              # rotas públicas (home, sobre, portfolio, contato)
  admin/
    layout.tsx           # providers (tRPC) + estilos UploadThing
    login/               # /admin/login com <SignIn /> do Clerk
    (authed)/            # rotas autenticadas (sidebar)
      dashboard/
      projects/          # lista, /new, /[id]
  api/
    trpc/[trpc]/         # endpoint tRPC
    uploadthing/         # endpoint UploadThing
prisma/
  schema.prisma          # modelo de dados
  seed.ts                # popula DB com content/projects.ts
  generated/             # cliente Prisma gerado (gitignored)
prisma.config.ts         # config CLI (datasource, migrations, seed)
server/
  trpc.ts                # init (publicProcedure, protectedProcedure via Clerk)
  routers/               # appRouter, portfolio, brands
lib/
  db.ts                  # Prisma client singleton (Neon adapter)
  trpc/
    client.tsx           # TRPCProvider + React Query
    server.ts            # caller server-side para RSC
  uploadthing.ts         # componentes UploadButton / UploadDropzone
  portfolio-mapper.ts    # DB ↔ API shape mapping
  portfolio-schemas.ts   # Zod schemas (validação de inputs admin)
services/                # API consumida pelas RSC públicas (lê do DB)
content/projects.ts      # dados-semente (usados pelo seed)
middleware.ts            # clerkMiddleware (protege /admin/* exceto /login)
```

## Como o auth funciona

- Autenticação gerida pelo [Clerk](https://clerk.com): sessão, cookies e UI.
- Usuários criados manualmente no dashboard do Clerk (não há signup público).
- `<SignIn />` embedded em `/admin/login` (componente do Clerk).
- `clerkMiddleware` em [middleware.ts](middleware.ts) bloqueia `/admin/*` exceto `/admin/login` — redireciona pra login se não houver sessão.
- tRPC `protectedProcedure` checa `ctx.session.userId` (vem do Clerk).

## Como o portfólio funciona

- O site público (RSC) consome o DB via `services/portfolio.ts` e `services/brands.ts`.
- O admin consome o DB via tRPC client (`lib/trpc/client.tsx`) com React Query.
- Imagens são hospedadas no UploadThing (uploads do admin) ou em URLs externas (seed inicial).

## Deploy (Vercel)

1. Conecte o repo na Vercel.
2. Adicione as mesmas variáveis de ambiente do `.env` no projeto Vercel.
3. No Clerk: adicione a URL de produção como Allowed Origin e configure as redirect URLs.
4. No primeiro deploy, rode `prisma db push` (ou `prisma migrate deploy` se já houver migrations) apontando para a `DATABASE_URL` de produção. Em seguida, `npm run db:seed` se quiser popular.

`postinstall` regenera o cliente Prisma a cada build.

## Notas

- Vulnerabilidades transitivas em `next` (postcss), `uploadthing` (effect) e `prisma` (@hono/node-server) seguem aguardando upstream. Não rodar `npm audit fix --force` — sugere downgrades destrutivos (Next 9, UploadThing 6).
