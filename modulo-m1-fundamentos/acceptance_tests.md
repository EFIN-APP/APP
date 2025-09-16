# Tests de Aceptación - Módulo M1 Fundamentos (Formato iPhone)

## Criterios Generales de Calidad

### ✅ Código y Arquitectura
- [ ] Todo el código está tipado en TypeScript
- [ ] Funciones son puras sin efectos secundarios
- [ ] Sin dependencias externas (excepto React para UI)
- [ ] Nombres de variables en español con camelCase
- [ ] Comentarios breves explicando fórmulas financieras

### ✅ Contenido Educativo
- [ ] Contenido neutral, no prescriptivo
- [ ] Contexto argentino (ARS, inflación, TNA/TEA)
- [ ] Terminología financiera correcta
- [ ] Ejemplos con números realistas para Argentina

## Tests Específicos del Formato iPhone

### AT-01: Layout iPhone
**Dado:** Viewport 390×844 px (iPhone 13/14/15)
**Cuando:** Se carga el módulo
**Entonces:**
- [ ] .pager ocupa exactamente 100% del viewport
- [ ] No hay scroll vertical en ninguna página
- [ ] Safe areas respetadas (top: 44px, bottom: 34px)
- [ ] Contenido visible sin cortes en bordes

### AT-02: Navegación por Swipe
**Dado:** Usuario en cualquier página del carrusel
**Cuando:** Realiza gesto horizontal >60px
**Entonces:**
- [ ] Swipe derecha va a página anterior (si existe)
- [ ] Swipe izquierda va a página siguiente (si existe)
- [ ] Se emite evento `pager_swipe` con from/to correctos
- [ ] Transición suave con snap automático
- [ ] No hay navegación si está en extremos

### AT-03: Controles de Navegación
**Dado:** Flechas laterales y dots de paginación
**Cuando:** Usuario interactúa con ellos
**Entonces:**
- [ ] Flecha izquierda deshabilitada en página 1
- [ ] Flecha derecha deshabilitada en última página
- [ ] Dots reflejan página actual (activo/inactivo)
- [ ] Click en dot navega a página correspondiente
- [ ] Se emite evento `pager_nav_click` con source correcto

### AT-04: Paleta de Colores
**Dado:** Todos los elementos visuales
**Cuando:** Se renderizan
**Entonces:**
- [ ] Background exacto #0B1220
- [ ] Cards usan #0F1830
- [ ] Texto primario #E6ECF8 (contraste AA)
- [ ] Texto secundario #B6C0D9 (contraste AA)
- [ ] Accent #4DA3FF para interactivos
- [ ] Separadores #223052

### AT-05: Orden de Páginas
**Dado:** Las 7 páginas del módulo
**Cuando:** Se navega secuencialmente
**Entonces:**
- [ ] Página 1: Portada con título del módulo
- [ ] Página 2: SectionWhy (¿Por qué importa?)
- [ ] Página 3: KeyIdeas (Ideas clave)
- [ ] Página 4: Quiz (Evaluación)
- [ ] Página 5: SimulatorCompoundInflation
- [ ] Página 6: GameWhichYieldsMore
- [ ] Página 7: Takeaway + Flashcards

### AT-06: Accesibilidad
**Dado:** Todos los controles interactivos
**Cuando:** Se evalúa accesibilidad
**Entonces:**
- [ ] Flechas tienen aria-label "Siguiente/Anterior"
- [ ] Dots tienen aria-label "Ir a página n"
- [ ] Elementos focusables ≥44×44 pt (táctil)
- [ ] Navegación por teclado (←/→) funciona
- [ ] Contraste cumple WCAG AA
- [ ] Screen readers pueden interpretar contenido

### AT-07: Color Contraste
**Dado:** Cualquier texto dentro de un marco blanco
**Cuando:** Se renderiza en pantalla
**Entonces:**
- [ ] Color de texto es exactamente #0B1220
- [ ] Contraste mínimo 4.5:1 con fondo blanco
- [ ] Texto secundario usa #1A2332 para jerarquía
- [ ] No hay texto blanco sobre fondo blanco
- [ ] Elementos .text-box-white aplican color correcto

### AT-08: Caja de Texto Adaptable
**Dado:** Textos extensos en content-box
**Cuando:** Exceden el 90% del alto del viewport
**Entonces:**
- [ ] Se muestra scroll interno con -webkit-overflow-scrolling: touch
- [ ] Contenido completo accesible sin cortes
- [ ] Scroll suave y con fricción nativa
- [ ] Scrollbar sutil (4px, color secundario)
- [ ] Max-width 85% del viewport respetado

### AT-09: Quiz Legible
**Dado:** Opciones largas en preguntas de quiz
**Cuando:** Se presentan al usuario
**Entonces:**
- [ ] Opciones se quiebran en varias líneas sin cortar palabras
- [ ] Min-height 48px respetado para táctil
- [ ] Padding 12px para área de toque cómoda
- [ ] Line-height 1.5 para legibilidad
- [ ] Margen vertical 6px entre opciones
- [ ] Texto no desborda la caja contenedora

### AT-10: Safe Areas
**Dado:** Contenido en cualquier página del carrusel
**Cuando:** Se visualiza en iPhone
**Entonces:**
- [ ] No hay solapamiento con dots de paginación
- [ ] Contenido respeta barra de estado (44px top)
- [ ] Área de home indicator libre (34px bottom)
- [ ] Flechas de navegación no interfieren con contenido
- [ ] Elementos interactivos accesibles en toda la pantalla

## Tests Funcionales por Componente (Actualizados)

### 1. Componente Pager

#### Test: Inicialización
**Dado:** Pager con 7 páginas hijas
**Cuando:** Se monta el componente
**Entonces:**
- [ ] Muestra página inicial (índice 0)
- [ ] Track tiene width: 700% (7 páginas × 100%)
- [ ] Transform inicial: translateX(0%)
- [ ] Dots muestran 7 elementos, primero activo

#### Test: Prevención de Scroll Vertical
**Dado:** Usuario intenta scroll vertical
**Cuando:** Está interactuando con el Pager
**Entonces:**
- [ ] touchmove vertical se previene
- [ ] overscroll-behavior: none aplicado
- [ ] Solo permite navegación horizontal

#### Test: Responsive
**Dado:** Viewport menor a 390px
**Cuando:** Se ajusta el tamaño
**Entonces:**
- [ ] Flechas se reducen a 40×40 pt
- [ ] Padding lateral se ajusta a 16px
- [ ] Contenido sigue siendo legible

### 2. Quiz (Actualizado para formato iPhone)

#### Test: Visualización en pantalla completa
**Dado:** Quiz en página 4 del carrusel
**Cuando:** Se navega a esa página
**Entonces:**
- [ ] Quiz ocupa toda la altura disponible
- [ ] Pregunta y opciones visibles sin scroll
- [ ] Botones de respuesta ≥44pt de altura
- [ ] Feedback se muestra en la misma pantalla

### 3. Simulador (Actualizado para formato iPhone)

#### Test: Inputs optimizados para móvil
**Dado:** Formulario del simulador
**Cuando:** Usuario interactúa en iPhone
**Entonces:**
- [ ] Inputs numéricos abren teclado numérico
- [ ] Labels claros y campos suficientemente grandes
- [ ] Botón "Simular" accesible sin scroll
- [ ] Resultados se muestran en la misma pantalla

### 4. Juego (Actualizado para formato iPhone)

#### Test: Interfaz táctil optimizada
**Dado:** Opciones del juego
**Cuando:** Se presentan al usuario
**Entonces:**
- [ ] Botones de opción ≥44pt de altura
- [ ] Texto legible en pantalla pequeña
- [ ] Feedback visible sin desplazamiento
- [ ] Transiciones suaves entre rondas

### 5. Analítica (Extendida)

#### Test: Eventos de navegación
**Dado:** Usuario navega por el carrusel
**Cuando:** Usa diferentes métodos de navegación
**Entonces:**
- [ ] `pager_swipe` se dispara en gestos
- [ ] `pager_nav_click` se dispara en flechas/dots
- [ ] `lesson_viewed` se dispara al cambiar página
- [ ] Propiedades incluyen índices correctos

## Criterios de Performance (Actualizados)

### ✅ Tiempos de Respuesta iPhone
- [ ] Transiciones de página <300ms
- [ ] Respuesta a touch <100ms
- [ ] Carga inicial <2 segundos en 3G
- [ ] Animaciones fluidas a 60fps

### ✅ Usabilidad Móvil
- [ ] Funciona en Safari iOS y Chrome Android
- [ ] Gestos nativos no interfieren
- [ ] Zoom deshabilitado apropiadamente
- [ ] Orientación portrait optimizada

## Definición de "Listo para Producción iPhone"

El módulo M1 formato iPhone está listo cuando:
- [ ] Todos los tests AT-01 a AT-10 pasan
- [ ] Navegación horizontal fluida y consistente
- [ ] Paleta de colores implementada exactamente
- [ ] Accesibilidad verificada en dispositivos reales
- [ ] Performance óptima en iPhone 12+ y Android equivalente
- [ ] Analítica de navegación funcionando
- [ ] Sin scroll vertical en ninguna página
- [ ] Contenido educativo intacto y funcional
- [ ] Tipografía y contraste optimizados para legibilidad
- [ ] Cajas de texto adaptables sin overflow
