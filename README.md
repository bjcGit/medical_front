# MedicalApp - Plataforma de Gestión Clínica

MedicalApp es una plataforma integral desarrollada con **Angular 16** para gestionar el ecosistema digital de una red médica. Está diseñada para pacientes, profesionales de salud y administrativos, permitiendo agendar citas, gestionar historias clínicas, administrar personal y sedes, y visualizar información relevante desde un dashboard central.

---

## 🛠️ Tecnologías principales

- **Angular 16** (Standalone Components)
- **TypeScript** (estricto)
- **Tailwind CSS** (para estilos)
- **RxJS** (manejo de observables)
- **Firebase Auth** (provisional)
- **Backend RESTful API** (ExpressJS / NestJS)

---

## 🚀 Instalación del proyecto

```bash
git clone https://github.com/bjcGit/medical_front.git
cd medical_front
npm install
ng serve
```

Requiere Node.js ≥ 18.x

---

## 📦 Estructura del proyecto

```
src/
├── app/
│   ├── auth/                  # Autenticación y guardias
│   ├── dashboard/             # Layout principal y navegación
│   │   ├── pages/             # Vistas principales por módulo
│   │   ├── components/        # Componentes compartidos por módulo
│   │   ├── services/          # Servicios RESTful
│   ├── environment.ts         # URL del API backend
```

---

## 🔐 Autenticación y Roles

El sistema soporta 3 tipos de roles:

- **ADMINISTRATIVO**: acceso completo a todos los módulos.
- **PROFESIONAL**: puede ver solo pacientes asignados, historias clínicas propias y sus citas.
- **PACIENTE**: acceso solo al módulo de citas propias.

El control de rutas y visibilidad está gestionado por `auth.guard.ts` y `role.guard.ts`.

---

## 🧩 Módulos desarrollados

### 🏥 Sedes
- CRUD completo
- Asociación de información geográfica

### 👨‍⚕️ Profesionales
- Registro y edición de datos
- Asociación con historias y citas

### 👩‍💼 Administrativos
- Gestión de personal administrativo
- Roles y control de acceso

### 🧑‍🤝‍🧑 Pacientes
- Registro de información personal
- Vinculación con historias clínicas y citas

### 📋 Historias Clínicas
- Visualización en cards
- Edición mediante modal dinámico
- Asociación a profesional y paciente

### 📅 Citas Médicas
- Agenda visual
- Selección de sede, profesional y paciente
- Filtrado por usuario logueado

---

## 💻 Funcionalidades clave

- Diseño modular y responsivo
- Uso de `ReactiveForms` para validaciones
- Comunicación entre componentes con `@Input` y `@Output`
- Interceptores de error y token (próximamente)
- Filtros dinámicos basados en el rol

---

## 📖 Consideraciones

- El backend debe proveer los endpoints mencionados.
- Las rutas están protegidas por `authGuard` y `roleGuard`.
- El token se almacena en `localStorage` y se revalida con `/auth/revalidate`.

---

## ✨ Próximas mejoras

- Interceptor global de errores y tokens
- Paginación y búsqueda en tablas
- Integración con calendario visual para citas
- Estadísticas y reportes

---

## 👨‍💻 Desarrollado por

Tu equipo de desarrollo. Para soporte técnico, escribe a: contacto@medicalapp.dev

---

## 📜 Licencia

MIT License © 2025