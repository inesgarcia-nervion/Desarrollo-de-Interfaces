Tres en Raya - Cliente React Native (esqueleto)

Estructura principal:
- app/
  - App.tsx: entrada de la app
  - src/
    - config/signalRConfig.ts: configurar URL del hub
    - domain/: entidades y contratos
    - data/: repositorios (SignalR)
    - presentation/: viewmodels y vistas

Instalación (desde carpeta app):

1. Instalar dependencias:

```bash
cd Unidad9/TresEnRaya/app
npm install
```

2. Ejecutar con Expo:

```bash
npm start
```

Notas:
- Reemplaza `SERVER_URL` en `signalRConfig.ts` con la URL de tu backend SignalR.
- Implementa las rutas del Hub en el servidor (ej. `/gamehub`) y los métodos que se esperan en `GameRepository`.
- Este esqueleto crea componentes y viewmodel; falta implementar validaciones adicionales y manejo de reconexión.
