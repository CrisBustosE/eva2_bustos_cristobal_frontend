# Rediseño Front-End: Municipalidad de Cholchol

>**Demo en vivo:** [Github Pages - Click aquí](https://crisbustose.github.io/eva2_bustos_cristobal_frontend/)

Proyecto académico enfocado en la reestructuración y mejora de la experiencia de usuario (UX/UI) de la página de inicio de la Municipalidad de Cholchol, implementando prácticas modernas de desarrollo web.

## Objetivos del Proyecto
* **Mejora UI/Visual:** Erradicar la "ceguera de banners" reemplazando imágenes estáticas por un sistema de tarjetas (Cards) semánticas y accesibles.
* **Diseño Responsivo:** Garantizar la correcta visualización en dispositivos móviles (Mobile-First) optimizando el uso del viewport, especialmente en el área de navegación (Navbar).
* **Interactividad y DOM:** Implementar validaciones en tiempo real y *feedback* visual utilizando Vanilla JavaScript y el manejo dinámico del Modelo de Objetos del Documento (DOM).

## Tecnologías Utilizadas
* **HTML5:** Estructuración semántica del contenido (`<header>`, `<main>`, `<section>`, `<footer>`).
* **CSS3:** Variables globales (`:root`) para mantener la coherencia de la paleta de colores institucional y animaciones de transición.
* **JavaScript (ES6):** Lógica de validación de formularios (Regex), manipulación dinámica del DOM (Anti-XSS mediante `createElement` y `append`), y manejo avanzado de eventos.
* **Bootstrap 5:** Framework CSS utilizado para el sistema de grillas responsivas y componentes pre-estilizados (Modales, Alertas, Tarjetas).
* **FontAwesome:** Implementación de iconografía vectorial escalable para mejorar la accesibilidad visual.

## Funcionalidades Destacadas (Criterios de Evaluación)
1. **Validación de Formulario en Tiempo Real (CE1, CE2):** Intercepción de eventos `submit` e `input` para validar correos, longitud de mensajes y campos vacíos, proporcionando feedback inmediato al usuario.
2. **Modificación Dinámica Segura (CE3):** Inyección de alertas de éxito y error en el DOM, reescritura de contenido de Modales mediante atributos `data-` y alteración de estilos CSS en respuesta al evento de scroll.
3. **Eventos Personalizados:** Implementación de Custom Events (`compk`) para el monitoreo de estados internos de la aplicación.
4. **Accesibilidad (CE4):** Uso de etiquetas `aria-hidden` y `aria-label` para compatibilidad con lectores de pantalla (Screen Readers).

## Estructura del Proyecto
```text
/
├── assets/
│   └── img/            
│       ├── flyers/     # Afiches de comunicados y noticias (concursos, ramas)
│       ├── hero/       # Imagen principal de cabecera
│       └── logos/      # Logotipos institucionales (color y en blanco)
├── css/
│   └── style.css       # Hoja de estilos principal y media queries
├── js/
│   └── script.js       # Lógica de validación, modales y eventos
├── index.html          # Estructura principal de la Landing Page
└── README.md           # Documentación del proyecto
```
---

**Autor**
* Cristóbal Bustos - Desarrollo Frontend Sección 51