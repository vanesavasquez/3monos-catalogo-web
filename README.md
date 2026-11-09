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
  - Detalle ítem por ítem con cantidad y precio unitario de referencia.
  - Total acumulado de piezas.
  - Subtotal minorista de referencia (base sobre la cual se aplica el descuento mayorista en la charla).
  - Condiciones comerciales fijadas: **50% de seña para producir** (transferencia o efectivo) y tiempos de entrega estimados (**5 a 6 días hábiles**).
  - Consulta directa para definir colores y terminaciones disponibles.

### 2. Lógica Comercial de Cantidades (Mínimo de 10 unidades + compra flexible)
Para respetar la política mayorista de fabricación sin limitar la personalización del cliente, se implementó una regla de cálculo especializada:

* **Piso Mínimo Inicial (10 u.):**  
  La primera vez que el cliente hace clic en el botón `+` de un producto (o cuando su cantidad actual es `0 u.`), se agregan automáticamente **10 unidades** al pedido. Esto garantiza que ningún modelo entre al carrito por debajo del lote mínimo de producción.

* **Ajuste Fino Posterior (de a 1 u.):**  
  Una vez alcanzado el piso de 10 unidades, los controles de cantidad tanto en la tarjeta del catálogo como dentro del carrito cambian su paso a **+1 unidad** y **-1 unidad**. Esto le permite al comprador pedir cifras exactas como **11, 12, 15, 21 o 35 unidades** sin estar obligado a saltar de 10 en 10.

* **Protección de Mínimo (Opción A - Tope fijo en 10 u.):**  
  Al presionar `-1` dentro del carrito, la cantidad desciende hasta llegar a las **10 unidades mínimas**. En ese punto el botón `-1` se deshabilita para evitar que el producto quede en cantidades no permitidas. Si el cliente decide no comprar ese artículo, debe eliminarlo conscientemente mediante el botón de la **papelera** (`removeItem`).

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
