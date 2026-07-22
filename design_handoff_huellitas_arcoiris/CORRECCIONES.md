# Correcciones — problemas de la primera implementación

La primera implementación tiene 3 fallas visibles en el inicio. Corrígelas antes de seguir.

## 1. Los botones CTA del hero están rotos
Síntoma: "Conoce a los perritos" se ve como texto blanco invisible sobre el fondo crema (sin fondo), y "Quiero ayudar ♥" ocupa todo el ancho con solo un borde.

Causa probable: los estilos del botón sólido no se aplican y los CTAs se apilan a ancho completo.

Corrección — los dos CTAs van lado a lado (flex, `gap:14px`, `flex-wrap:wrap`), como **pills** (`border-radius:999px`, `padding:14px 26px`, peso 800):
- **Primario "Conoce a los perritos"**: `background:#16808A; color:#fff;` hover `background:#0F6068`.
- **Secundario "Quiero ayudar ♥"**: `background:transparent; color:#16808A; border:2px solid #16808A;` hover `background:#E4F2F1`. **No** debe ser ancho completo.

## 2. Las imágenes no cargan (logo y fotos de perritos)
Síntoma: el logo del hero no aparece y las tarjetas muestran solo el texto alternativo ("Rocky", "Victoria", "Caramelo") dentro de una caja vacía.

Causa: las rutas de imagen no resuelven. Las fotos están en `assets/` (ver lista abajo).

Corrección:
- Copia la carpeta `assets/` a la ubicación de estáticos del proyecto (`public/` en Vite/Next, o impórtalas como módulos). En Vite, `public/assets/rocky-ahora.jpeg` → se referencia como `/assets/rocky-ahora.jpeg`.
- Mapea cada perro semilla a su archivo real:
  - Rocky → `rocky-ahora.jpeg` (principal), `rocky-antes.jpeg` (antes)
  - Victoria → `victoria-ahora.png`, `victoria-antes.png`, extra `victoria-extra.png`
  - Caramelo → `caramelo-ahora.png`, `caramelo-head.png`
  - Manchas, Luna → sin foto: usa el **placeholder** (ver punto 3).
- La imagen de tarjeta debe ser cuadrada: contenedor `aspect-ratio:1/1`, `<img>` con `width:100%;height:100%;object-fit:cover;display:block`.
- El logo del hero es `assets/logo.png`.

## 3. Falta un placeholder para perritos sin foto
Cuando falta la foto no muestres una caja vacía con alt text. Renderiza un placeholder: bloque cuadrado con fondo `#EDF5F0`, un 🐾 grande centrado y el nombre debajo, o un patrón a rayas suaves. Nunca dejes el `<img>` roto visible.

## 4. Verifica también el layout del hero
Debe ser grid de 2 columnas (`1.1fr / .9fr`) en desktop: texto a la izquierda, logo grande a la derecha con animación `floaty` (flota ±10px, 5s). En ≤860px colapsa a 1 columna. Los círculos decorativos difuminados de fondo son opcionales pero suman.

---
Todos los valores exactos (colores, tipografía, radios, animaciones) están en `README.md` → "Design Tokens". No inventes colores nuevos.
