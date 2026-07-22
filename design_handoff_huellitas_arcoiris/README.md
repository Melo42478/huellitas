# Handoff: Huellitas Arcoíris — Sitio de adopción canina

## Overview
Sitio web de un grupo de rescate y adopción de perros (sin ánimo de lucro) en Querétaro, México. Permite a los visitantes conocer perritos en adopción, leer sus historias de transformación (antes/después), aprender el proceso de adopción, donar (general o apadrinar a un perrito específico) y contactar a la organización. Incluye un **panel de administrador** protegido con contraseña para publicar/editar/borrar perritos y llevar un control básico de **finanzas** (ingresos y gastos por perrito).

Idioma de toda la interfaz: **español (México)**.

## About the Design Files
Los archivos de este paquete son una **referencia de diseño creada en HTML** — un prototipo funcional que muestra el aspecto y el comportamiento deseados, **no código de producción para copiar tal cual**.

El prototipo está construido como un "Design Component" (`.dc.html`), un formato propio que usa una plantilla + una clase de lógica tipo React. **No lo copies directamente.** La tarea es **recrear este diseño en un stack real** usando los patrones del proyecto destino. Si aún no hay un stack, la recomendación es **React (Vite o Next.js) + un backend con base de datos** (ver "Arquitectura recomendada" más abajo), porque el sitio necesita persistencia real de datos y subida de imágenes.

## Fidelity
**Alta fidelidad (hi-fi).** Colores, tipografía, espaciados, radios e interacciones son finales y deben recrearse fielmente. Los valores exactos están en "Design Tokens".

Lo único que es *mock* y debe reemplazarse por funcionalidad real:
- **Persistencia:** el prototipo guarda perritos y finanzas en `localStorage`/`sessionStorage`. En producción esto debe ser una base de datos y una API real.
- **Subida de imágenes:** el admin convierte fotos a data-URL base64 en el navegador. En producción deben subirse a un storage (S3, Cloudinary, Supabase Storage, etc.).
- **Pagos/donaciones:** el modal de donar tiene botones de método (Mercado Pago, PayPal, Transferencia) con `href="#"` de marcador. Hay que integrar un procesador de pago real.
- **Login de admin:** la contraseña está en el cliente (`huellitas`). Debe ser autenticación real de servidor.

## Screens / Views
Navegación por hash routing (`#/ruta`). Rutas: `home`, `galeria`, `perrito/:id` (detalle), `quienes`, `adoptar`, `donaciones`, `historias`, `contacto`, `admin`.

Layout global: header sticky (blur), `<main>` que cambia según ruta, footer teal. Ancho máximo de contenido `1180px`, padding lateral `20px`. Fondo de página `#FBF4E8`.

### Header (global)
- Sticky, `background: rgba(251,244,232,.92)` + `backdrop-filter: blur(8px)`, borde inferior `#ece0cb`.
- Izquierda: logo (54×54) + wordmark "Huellitas Arcoíris" en Baloo 2 800 (Huellitas `#16808A`, Arcoíris `#EF9BB4`), 22px.
- Nav horizontal (Inicio, Perritos, Cómo adoptar, Donar, Historias, Contacto), items 15px peso 800 color `#5f5045`, hover fondo `#E4F2F1`.
- En ≤860px la nav se colapsa a botón hamburguesa (☰, 44×44, fondo `#E4F2F1`) que abre menú vertical.

### Inicio (home)
- **Hero** en grid 1.1fr / .9fr: badge pill "Adopción responsable · Querétaro" (`#E4F2F1`/`#0F6068`), H1 `clamp(38–62px)` Baloo 2 800 con segundo renglón `#16808A`, párrafo introductorio, dos CTAs pill ("Conoce a los perritos" sólido teal, "Quiero ayudar ♥" outline teal). A la derecha, logo grande con animación `floaty` (flota ±10px, 5s). Círculos decorativos difuminados de fondo.
- **Perritos buscando familia**: encabezado + link "Ver todos →" + grid responsivo (`minmax(280px,1fr)`) de hasta 3 tarjetas de perro en estado "adopcion".
- **Quiénes somos** (bloque): tarjeta grid 2 col con texto + caja verde `#EDF5F0` listando los pasos de rescate (íconos emoji en círculos de color).
- **Stats**: banda `#EDF5F0`, 4 números grandes Baloo 2 (perritos rescatados, con familia nueva, 100% vacunados, 0 ánimo de lucro).

### Galería (galeria)
- H1 "Nuestros perritos" + subtítulo.
- Fila de **filtros pill**: Todos / En adopción / En tratamiento / Adoptados. Activo = fondo `#16808A`, texto blanco; inactivo = `#FFFDF8`, borde `#e0d3bf`.
- Grid de tarjetas (`minmax(270px,1fr)`). Estado vacío: caja punteada con 🐾 y mensaje.

### Tarjeta de perro (componente reutilizable)
- Fondo `#FFFDF8`, borde `#ece0cb`, `border-radius:22px`, sombra `0 6px 18px rgba(74,59,51,.06)`.
- Imagen cuadrada (aspect-ratio 1/1, `object-fit:cover`) con badge de estado arriba a la izquierda (color según estado).
- Cuerpo: nombre Baloo 2 800 24px `#16808A`, meta-línea (sexo · edad · tamaño) 14px `#8A7A6E`, extracto de la historia a 2 líneas (`-webkit-line-clamp:2`).
- Hover: `translateY(-4px)` + sombra más fuerte.
- Click: animación `cardFlip` (giro 3D 0.62s) y luego navega al detalle. *(La animación de flip es un detalle bonito pero opcional; prioriza que el click navegue.)*

### Detalle del perrito (perrito/:id)
- Link "← Volver a los perritos".
- **Antes/Después** en grid 2 col: caja "ANTES" con borde teal (imagen `object-fit:contain` sobre versión difuminada de fondo para rellenar), caja "AHORA" con borde verde `#6FA84E`. Badges Baloo 2 en cada una.
- Grid 1.5fr / 1fr: izquierda nombre H1 52px teal + badge de estado + "Su historia" con párrafos precedidos de 🐾. Derecha (aside): tarjeta "Datos de X" (lista de facts: sexo, edad, tamaño, vacunado, esterilizado, ubicación — cada uno con 🐾 de color), tarjeta de apadrinamiento con barra de progreso de donación (si meta>0 y no adoptado), botón "Quiero adoptar a X" (WhatsApp).
- Sección "Más fotos" (galería) si tiene fotos extra.
- Estado no encontrado: mensaje + link a galería.

### Quiénes somos (quienes)
- H1 + grid 2 col: columna de tarjetas de texto (misión, "sin ánimo de lucro", objetivo) + caja verde con pasos de rescate.

### Cómo adoptar (adoptar)
- H1 + lista vertical de 4 pasos numerados (círculo de color con número Baloo 2 + título + descripción). CTA final "Iniciar mi adopción por WhatsApp".

### Donaciones (donaciones)
- H1 + intro.
- Banner "Donación general" (gradiente teal `#16808A→#0F6068`) con botón "Donar ahora ♥".
- "Apadrina a un perrito": grid de tarjetas compactas (foto 82×82, nombre · edad, barra de progreso verde, "$X de $Y recaudados", botón "Donar a X"). Solo perritos con meta>0 y no adoptados.
- Ambos botones abren el **modal de donar**.

### Historias felices (historias)
- H1 + grid de tarjetas de perritos "adoptado", cada una con antes/ahora lado a lado y "X · Adoptado ♥". Estado vacío con 🌈.

### Contacto (contacto)
- H1 + grid 2 col: columna de tarjetas de contacto (WhatsApp verde, Instagram rosa, Ubicación naranja) + tarjeta con QR de Instagram enlazado.

### Modal de donar (overlay global)
- Fondo `rgba(74,59,51,.55)`, tarjeta centrada `#FBF4E8` radio 24px, máx 460px.
- Título dinámico ("Donación general" o "Donar a X"), botones de monto ($100/$200/$500/$1000, selección resaltada), lista de 3 métodos de pago (Mercado Pago, PayPal, Transferencia/CLABE) como enlaces.
- Cierra al click fuera o en ✕.

### Toast (global)
- Pill fija abajo-centro, fondo verde `#6FA84E`, texto blanco 800, auto-oculta a los ~2.6s.

### Panel de administrador (admin)
Acceso desde link discreto en el footer ("Acceso administrador").
- **Bloqueado:** tarjeta de login con input password (contraseña demo `huellitas`), error si es incorrecta. En producción: auth real.
- **Desbloqueado:**
  - **Formulario publicar/editar perrito**: nombre*, estado (adopción/tratamiento/adoptado), sexo, edad, tamaño, ubicación, checkboxes vacunado/esterilizado, historia (textarea; párrafos separados por línea en blanco), meta y recaudado de donación, subida de foto ANTES, foto AHORA/principal, y galería múltiple. Botones "Publicar/Guardar" y "Limpiar".
  - **Lista de perritos publicados**: fila con miniatura, nombre, estado·edad, y acciones Ver / Editar / Borrar.
  - **Finanzas**: 3 tarjetas resumen (Ingresos totales verde, Gastos totales naranja, Balance teal/rojo). Formulario "Registrar movimiento" (perrito o general, tipo ingreso/gasto, fecha, concepto, monto). "Balance por perrito" (grid de tarjetas con ingresos/gastos/balance). Lista de movimientos con badge de tipo, concepto, perrito·fecha, monto (+/−) y borrar.

## Interactions & Behavior
- **Ruteo:** hash routing con scroll-to-top al cambiar de hash. En un stack real usa el router del framework (React Router / Next router).
- **Reveal on scroll:** elementos con `data-reveal` aparecen con fade + translateY vía IntersectionObserver, con stagger de 55ms.
- **Flip de tarjeta:** al hacer click en una tarjeta de perro, gira 3D 0.62s y luego navega. Opcional.
- **Filtros de galería:** filtran por campo `estado` en cliente.
- **Modal de donar:** abre desde varios puntos; monto seleccionable; métodos enlazan a pago (por integrar).
- **Toast:** feedback tras publicar/editar/borrar/registrar movimiento.
- **Admin sesión:** persiste en `sessionStorage` (`huellitas_admin=1`).
- **Responsive:** breakpoints en 860px (colapsa nav y todos los grids a 1 columna), 620px (ajustes admin), 460px (logo más chico).

## State Management
Estado principal del prototipo (recréalo con el manejo de estado del stack + datos del servidor):
- `route`, `routeId` — ruteo.
- `dogs[]` — lista de perritos (ver esquema abajo). **Debe venir de la API/BD.**
- `filter` — filtro de galería.
- `menuOpen` — menú móvil.
- `admin`, `loginValue`, `loginError` — auth admin.
- `form`, `editingId` — formulario de perrito.
- `donateId`, `donateOpen`, `donateAmount` — modal de donar.
- `fin[]` — movimientos financieros. **Debe venir de la API/BD.**
- `finForm` — formulario de movimiento.
- `toast` — mensaje efímero.

### Esquema de datos — Perro (dog)
```
id: string
name: string
estado: 'adopcion' | 'tratamiento' | 'adoptado'
sexo: 'Macho' | 'Hembra'
edad: string        // ej. "3 años aprox."
tamano: 'Pequeño' | 'Mediano' | 'Grande'
ubicacion: string
vacunado: boolean
esterilizado: boolean
historia: string     // párrafos separados por línea en blanco
meta: number         // meta de donación en MXN
recaudado: number    // recaudado en MXN
antes: string        // URL/ruta de imagen "antes"
ahora: string        // URL/ruta de imagen "ahora" / principal
gallery: string[]    // URLs de fotos extra
```

### Esquema de datos — Movimiento financiero (fin)
```
id: string
dogId: string        // id del perro o '__general__'
tipo: 'ingreso' | 'gasto'
concepto: string
monto: number        // MXN
fecha: string        // 'YYYY-MM-DD'
```

Helpers de derivación a portar: `money()` (formato `$` es-MX con separadores), `pct()` (porcentaje recaudado/meta, tope 100), `paras()` (parte historia en párrafos), `excerpt()` (recorta a ~120 chars), `facts()` (arma la lista de datos con colores). Resúmenes de finanzas: totales de ingresos/gastos/balance globales y por perrito.

## Arquitectura recomendada (si no existe stack)
- **Frontend:** React + Vite (o Next.js si se quiere SSR/SEO — recomendable para un sitio público).
- **Estilos:** recrear con los tokens de abajo. Tailwind o CSS-in-JS ambos válidos; el prototipo usa estilos inline con estos valores exactos.
- **Backend/BD:** cualquiera con Postgres/Mongo. **Supabase** es una buena opción todo-en-uno (BD + Auth para el admin + Storage para imágenes) y encaja con el alcance de un refugio pequeño.
- **Imágenes:** subir a storage y guardar la URL, no base64.
- **Pagos:** Mercado Pago (México), PayPal y/o Stripe; o simplemente datos de transferencia/CLABE si se quiere lo más simple.
- **Auth admin:** login real de servidor, no contraseña en cliente.

## Design Tokens

### Colores
| Uso | Hex |
|---|---|
| Fondo página | `#FBF4E8` |
| Fondo tarjeta / superficie | `#FFFDF8` |
| Texto principal | `#4A3B33` |
| Texto secundario | `#6f5f52` / `#5f5045` |
| Texto tenue / meta | `#8A7A6E` |
| Borde | `#ece0cb` / `#e0d3bf` |
| Teal primario | `#16808A` |
| Teal oscuro (hover) | `#0F6068` |
| Teal suave (fondo) | `#E4F2F1` |
| Rosa (acento) | `#EF9BB4` |
| Verde (adoptado / éxito) | `#6FA84E` |
| Verde suave (fondo) | `#EDF5F0` |
| Naranja (tratamiento / gasto) | `#E39A4E` / `#F0A95C` / `#D98A57` |
| Morado (acento) | `#B394D4` / `#8467a8`, fondo `#efe7f6` |
| Azul (acento) | `#7FA6D6` |
| Rojo (error / borrar) | `#c9463f` / `#d9534f`, fondo `#fbe4e2` |
| Footer | fondo `#16808A`, texto `#fff` / links `#d7efee` |

Colores por estado: adopción `#16808A`, tratamiento `#E39A4E`, adoptado `#6FA84E`.

### Tipografía
- **Baloo 2** (Google Fonts, pesos 500/600/700/800) — títulos, nombres, números destacados.
- **Nunito** (Google Fonts, 400/600/700/800 + italic 600) — cuerpo y UI.
- Escala aprox.: H1 40–52px (hero hasta `clamp(38px,6vw,62px)`), H2 ~34px, nombres de tarjeta 22–24px, cuerpo 15–19px, meta/labels 13–15px.

### Radios
- Tarjetas grandes: `20–26px`. Tarjetas/filas medianas: `14–18px`. Inputs: `12px`. Pills/botones: `999px`. Círculos de ícono: `50%`.

### Sombras
- Tarjeta: `0 6px 18px rgba(74,59,51,.06)`.
- Tarjeta hover: `0 14px 30px rgba(74,59,51,.12)`.
- Flip: `0 26px 48px rgba(74,59,51,.28)`.
- Toast: `0 10px 26px rgba(0,0,0,.2)`.

### Animaciones
- `floaty`: translateY 0→-10→0, 5s ease infinito (logo hero).
- `fadeUp`: opacity 0→1 + translateY 14→0, .45s (transición de sección).
- `cardFlip`: rotateY 0→360 con scale dip, .62s (click de tarjeta).
- Reveal: opacity+translateY(26px), .6s `cubic-bezier(.2,.7,.3,1)`, stagger 55ms.

### Foco de formularios
- `outline:none`, borde `#16808A`, `box-shadow: 0 0 0 3px rgba(22,128,138,.15)`.

## Assets
En `assets/`. Son fotos reales aportadas por la organización — reutilizarlas.
- `logo.png` / `logo.jpeg` — logo Huellitas Arcoíris.
- `rocky-antes.jpeg`, `rocky-ahora.jpeg` — Rocky.
- `victoria-antes.png`, `victoria-ahora.png`, `victoria-extra.png` — Victoria.
- `caramelo-ahora.png`, `caramelo-head.png` — Caramelo.
- `quienes-somos.jpeg` — foto grupo (no usada actualmente, disponible).
- `instagram-qr.jpeg` — QR de Instagram para la página de contacto.
- Perritos sin foto (Manchas, Luna) usan placeholders SVG a rayas generados en código — reemplazar por fotos reales.

Los placeholders de imagen se generan con un patrón SVG a rayas + etiqueta monoespaciada (función `ph()` en la lógica). En producción, mostrar un placeholder equivalente cuando falte una foto.

### Datos de contacto reales (configurables)
- WhatsApp: `55 2659 1490` → enlace `https://wa.me/52<solo-dígitos>`.
- Instagram: `@huellitas_arcoiris` → `https://instagram.com/huellitas_arcoiris`.
- Ubicación: Querétaro, México.
- Contraseña admin demo: `huellitas` (reemplazar por auth real).

## Screenshots
Capturas de referencia de cada vista en `screenshots/`:
- `01-inicio.png` — Inicio (hero, perritos destacados).
- `02-galeria.png` — Galería con filtros.
- `03-detalle-perrito.png` — Detalle (antes/después, datos, apadrinar).
- `04-como-adoptar.png` — Pasos de adopción.
- `05-donaciones.png` — Donación general + apadrinar.
- `06-historias.png` — Historias felices.
- `07-contacto.png` — Contacto + QR.
- `08-quienes-somos.png` — Quiénes somos.
- `admin.png` — Panel de administrador.

## Files
- `Huellitas-Arcoiris.dc.html` — el prototipo completo (plantilla + lógica). Referencia principal de layout, comportamiento y datos semilla.
- `assets/` — imágenes reales del proyecto.

> Nota: `Huellitas-Arcoiris.dc.html` no corre por sí solo fuera de este entorno (depende de un runtime propio, `support.js`). Léelo como especificación de diseño y datos, no como código a ejecutar.
