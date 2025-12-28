# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Scope & Design Decisions

This project focuses on implementing the core screen recording workflow of Clueso.io, which is the foundation of the product.

To ensure a high-quality and reliable submission within the given time constraints, the following features were intentionally kept out of scope:

- User authentication and onboarding
- Dashboard and project management views
- Feedback collection workflows
- AI-powered insights and summaries
- Backend services and persistent data storage

The application is implemented as a frontend-only MVP using browser-native MediaRecorder and MediaDevices APIs. This approach highlights core engineering fundamentals, clean code practices, and correct handling of media streams.

The architecture is designed to be easily extensible, and backend or AI integrations can be added in future iterations.

