# 3 Monos — Catálogo Web Mayorista

Landing page y catálogo online interactivo desarrollado en **React 19 + TypeScript + Vite** para **3 Monos**, emprendimiento de diseño e impresión 3D ubicado en San Luis Capital, Argentina.

El sitio permite a clientes y revendedores explorar la línea completa de productos (macetas, tutores, juegos y eventos), revisar especificaciones y precios de referencia en tiempo real, armar su pedido mediante un carrito lateral (drawer) y solicitar la cotización formal directamente a través de **WhatsApp Business**.

---

## 🎯 Objetivo del Proyecto

Brindar una experiencia moderna, ágil y visualmente atractiva alineada a la identidad de marca (*Brand Book 3 Monos* y estilo editorial MODOA), que resuelva dos necesidades principales:
1. **Exhibición profesional de productos:** Fotografías de estudio aisladas 1:1 sobre paleta pastel oficial, con navegación fluida, filtros por categoría y scroll infinito.
2. **Optimización del canal mayorista:** Eliminar la fricción de un checkout tradicional con pasarelas de pago y reemplazarlo por un flujo dinámico de cotización directa por WhatsApp, facilitando la coordinación de colores, tamaños personalizados y descuentos por volumen.

---

## 💡 Peculiaridades del Pedido y Cotización

### 1. Flujo de Cotización vía WhatsApp Business
En lugar de procesar cobros automáticos en línea, el carrito actúa como un **configurador de pedidos mayoristas**:
- Se accede en cualquier momento desde el botón flotante / cabecera **"Pedido (X u.)"**, abriendo un drawer lateral derecho.
- Al presionar **"Cotizar"**, el sistema genera un enlace directo a la API de WhatsApp (`https://wa.me/5492664214124`) con un mensaje estructurado y codificado que incluye:
  - Detalle ítem por ítem con código oficial y cantidad de piezas seleccionadas.
  - Total acumulado de piezas.
  - Ocultación limpia de importes monetarios cuando los precios están en actualización (`showPrices: false`).
  - Condiciones comerciales fijadas: **50% de seña para producir** (transferencia o efectivo).
  - Consulta directa para acordar precios mayoristas, colores y terminaciones disponibles según tamaño.

### 2. Lógica Comercial de Cantidades (Mínimo global de 10 unidades surtidas)
- **Mínimo mayorista global (10 u.):**  
  El mínimo de 10 unidades aplica al **total acumulado del pedido**, permitiendo al comprador combinar libremente modelos de todo el catálogo (por ejemplo: 3 de una maceta, 4 de otra y 3 tutores = 10 unidades).
- **Control dinámico por producto:**  
  Cada tarjeta presenta inicialmente el botón **"Agregar"**. Al hacer clic, se agrega 1 unidad y el botón se transforma automáticamente en un selector de cantidad interactivo con botones `[-]`, campo numérico y `[+]`.
- **Eliminación intuitiva:**  
  Si un producto desciende a 0 unidades mediante el botón `[-]`, se remueve automáticamente del pedido. También puede eliminarse en cualquier momento desde el icono de papelera dentro del carrito.
- **Validación para cotizar:**  
  El botón "Cotizar" permanece deshabilitado hasta que el carrito alcanza al menos 10 unidades en total, indicando claramente cuántas unidades faltan para completar el pedido mayorista.

### 3. Modal de Zoom de Imagen
- Al hacer clic en la fotografía de cualquier producto del catálogo, se abre una vista ampliada en alta resolución (`ProductLightboxModal`) sobre su fondo pastel oficial.
- La ventana modal incluye el código de producto, insignia de unidades en pedido, tecla rápida de cierre (`Escape` o clic exterior) y el control de cantidad para agregar o ajustar unidades sin salir de la vista previa.

### 4. Sección "Cómo trabajamos"
1. **Mínimo 10 u. surtidas:** Combiná modelos libremente de a 1 u. hasta sumar 10 u. o más en tu pedido mayorista.
2. **Cotizamos según tamaño:** Cotizamos según el tamaño y ahí revisamos los colores disponibles.
3. **50% de seña:** Transferencia o efectivo. El 50% restante contra entrega.

---

## 🎨 Identidad Visual y Diseño

- **Tipografías de marca:**
  - `Lilita One`: Titulares de Hero, encabezados destacados, cards de proceso y títulos del carrito.
  - `Roboto Slab`: Textos descriptivos, etiquetas de filtros, datos numéricos y precios.
- **Paleta Pastel Oficial:**
  - `#FDF0CF` (Amarillo Pastel)
  - `#F7D4D6` (Coral Pastel)
  - `#CED7ED` (Celeste Glaciar)
  - `#E4CCD5` (Malva Pastel)
- **Colores de Acento Vibrantes:** Crimson `#D82731`, Burgundy `#78002D`, Honeycomb `#F6B50E` y Cobalt `#0A38A6`.
- **Navbar Sticky Dinámico:** La barra de navegación superior inicia con fondo translúcido y logo negro (`horizontal.png`), y al hacer scroll se transforma en una barra fija en rojo de marca (`#D82731`) con el imagotipo oficial en blanco (`horizontal_Blanco.png`) en escala reducida y contraste óptimo.
- **Categorías "Próximamente":** Cuando se filtran secciones que aún no tienen stock cargado (como *Juegos* o *Eventos*), se despliega un estado vacío ilustrado con fondo amarillo pastel y tipografía gris cálida que cumple los estándares de accesibilidad **WCAG AA**.

---

## 📁 Arquitectura del Proyecto

El código está estructurado en módulos desacoplados bajo la carpeta `src/`:

```text
sitio-web/
├── public/
│   └── logos/               # Logotipos oficiales Logo _V1
├── catalogo img new/        # Fotografías 1:1 estandarizadas de productos
├── src/
│   ├── core/                # Tokens CSS globales, paleta y brand.config.ts
│   ├── modules/
│   │   ├── cart/            # CartContext, CartSidebar, CartItemRow y servicio WhatsApp
│   │   ├── catalog/         # ProductCard, CategoryFilterBar, scroll infinito y datos
│   │   ├── hero/            # HeroBanner principal y carrusel de fotos destacadas
│   │   └── how-to-buy/      # Sección "Cómo trabajamos" (3 cards informativas)
│   ├── shared/              # Navbar, Footer, íconos SVG y utilidades de formato
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/vanesavasquez/3monos-catalogo-web.git
   cd 3monos-catalogo-web
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Ejecutar tests unitarios (Vitest):**
   ```bash
   npm run test
   ```

5. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🛠️ Tecnologías

- **Framework:** [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** CSS Modules / Vanilla CSS con variables CSS personalizadas
- **Íconos:** [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
