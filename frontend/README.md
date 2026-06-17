# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Vercel Deployment

This project is configured to deploy as a monorepo on Vercel with separate frontend and backend services.

1. Push the repository to GitHub.
2. Create a new Vercel project and import the repository.
3. Vercel will detect the `frontend` and `backend` experimental services from `vercel.json`.
4. Add the following environment variable in Vercel:
   - `MONGO_URL`
5. The backend is exposed under `/api`, and the frontend calls the API using `/api/atm`.
6. For local development, run the frontend with:
   - `npm install` in `frontend`
   - `npm run dev`
   The Vite dev server proxies `/api` requests to `http://localhost:5001`.
