# Frontend de Casalia

La app abre en la pantalla de inicio de Casalia, implementada con React,
TypeScript, Tailwind CSS y CSS. Incluye las secciones y fotos de las referencias
y se adapta a celular con un menú lateral desplegable. La tipografía principal
usa 14–16 px y los controles principales tienen al menos 44 px de alto, para
trabajar con el zoom del navegador al 100 %.

**Mis diseños** abre una pantalla propia en `/#/mis-disenos`, con búsqueda por
nombre o tipo de espacio, orden por nombre o presupuesto y una tarjeta para
crear otro diseño. La opción Recientes conserva el orden de la referencia y
muestra primero los diseños nuevos.

```powershell
npm install
npm run dev
```

Abrí la dirección que muestra Vite (por defecto, http://localhost:5173).

**Abrir editor** y las tarjetas de diseño llevan al editor 3D existente.
El inicio usa datos de ejemplo y funciona sin el backend; el carrito se guarda
localmente en el navegador. Los diseños de la pantalla son ejemplos visuales:
al abrirlos se utiliza la escena del editor existente. El diálogo **Nuevo diseño**
permite ingresar nombre y presupuesto en pesos, muestra el uso previsto del Plan
Basic y ofrece las acciones Cancelar, Crear diseño y Ver planes. Se pueden tener
hasta 5 diseños. Los diseños nuevos, con su nombre y presupuesto, se guardan en
el navegador; los favoritos se conservan durante la sesión de la página.

Las fotos usan regiones de las capturas originales incluidas en `public/images`;
los textos, controles y tarjetas son elementos HTML. La tipografía DM Sans se
sirve desde la app. Los enlaces sociales usan destinos genéricos hasta disponer
del número de WhatsApp y del perfil de Instagram de Casalia.

```powershell
npm run typecheck
npm run build
```

La compilación comprueba TypeScript y genera `dist`. El editor 3D se carga
cuando se abre un diseño, para que la pantalla de inicio cargue más rápido.
