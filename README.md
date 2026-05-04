# OmicronNote

OmicronNote is a mobile productivity app built with Expo and React Native. It combines a note-taking workspace, a lightweight task screen, multilingual support, and a simple section-based navigation flow in a compact, well-structured codebase.

The project is designed to be readable first. It shows how to structure an Expo Router app, how to organize features, how to persist data on the device, and how to add localization with English and Arabic, including RTL support.

## Purpose of the App

This app was built as a structured React Native project for exploring modern application architecture and feature development. The goal is not only to ship screens, but also to demonstrate:

- how a note feature grows from simple UI into a real state-driven workflow
- how file-based routing works with Expo Router
- how Redux Toolkit can manage shared app state
- how AsyncStorage can persist user data and preferences on the device
- how i18next can power multilingual interfaces and RTL layout support
- how feature-first structure makes a growing codebase easier to maintain

## Current Features

### Notes

- Create notes
- Edit notes
- Delete notes
- Duplicate notes
- View note details
- Preview note title and short content
- Organize notes with labels and folders
- Pin notes
- Lock notes
- Sort notes by updated date, created date, title, or type
- Filter notes by quick filters, labels, and folders
- View a recent notes section
- Search notes by title and content
- Create plain text notes
- Create checklist notes
- Choose lightweight text-style presets
- Choose a visual cover preset for note cards and detail screens

### Tasks

- Add tasks
- Delete tasks
- Mark tasks as completed
- View task summary counts
- Use translated task UI in English and Arabic

### Settings and Navigation

- Bottom navigation between main sections
- Back navigation from note details
- Change app language from settings
- English and Arabic support
- RTL layout support for Arabic
- Restore the last main route after restart
- Restore the active route after language-triggered reloads

## Tech Stack

- React 19
- React Native 0.81
- Expo SDK 54
- Expo Router for file-based navigation
- Redux Toolkit for shared state management
- React Redux for store integration
- AsyncStorage for local device persistence
- i18next and react-i18next for translations
- TypeScript for static typing
- Expo Status Bar and Safe Area Context for mobile UI polish

## Why These Frameworks and Libraries

### Expo

Expo makes the project much easier to run and share. It provides a modern React Native workflow with sensible defaults, development tools, and cross-platform support.

### Expo Router

Expo Router gives the app a file-based navigation system. This keeps routing easy to understand because route files inside the `app/` folder map directly to screens like `/`, `/notes`, `/tasks`, and `/settings`.

### Redux Toolkit

Redux Toolkit is used where shared state matters most: the notes feature. It keeps note creation, editing, duplication, deletion, pinning, and locking centralized in one predictable state layer.

### AsyncStorage

AsyncStorage is used to persist data locally on the device. In this project it stores:

- saved notes
- the preferred app language
- the last visited main route
- temporary route restore data used after RTL/LTR reloads

### i18next

i18next powers the translation system. The app currently supports English and Arabic and also handles layout direction changes for RTL screens.

## Project Structure

The project follows a feature-oriented structure while still keeping route files simple.

```text
OmicronNote/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── notes.tsx
│   ├── tasks.tsx
│   ├── settings.tsx
│   ├── note-details.tsx
│   └── src/
│       ├── app/
│       │   └── bootstrap.ts
│       ├── features/
│       │   └── notes/
│       │       ├── model/
│       │       ├── state/
│       │       └── storage/
│       ├── i18n/
│       ├── Landing/
│       ├── Navigation/
│       ├── Notes/
│       ├── Screens/
│       ├── store/
│       ├── Tasks/
│       └── Theme/
├── assets/
├── package.json
└── README.md
```

## Main Screens

### Landing Screen

The landing screen is the visual home of the app. It introduces the main sections and shares the same app shell used by the rest of the experience.

### Notes Screen

The notes screen is the main feature-rich workspace. It brings together searching, filtering, sorting, recent notes, note previews, and access to the note editor.

### Note Details Screen

This screen handles both creating new notes and editing existing ones. It uses local form state for the current draft and dispatches Redux actions when the user saves.

### Tasks Screen

The tasks screen is a simpler example of stateful UI. It is useful for studying component composition, local screen state, and RTL-aware layouts without the extra complexity of Redux-backed note editing.

### Settings Screen

The settings screen currently focuses on language and simple storage feedback, and it is meant to grow as the app adds more user preferences.

## Notes Architecture

The notes feature is the best place to study the project architecture.

- `model/` contains note types, constants, and shared note helpers
- `state/` contains the Redux slice and note actions
- `storage/` contains device persistence helpers
- `Screens/` coordinates state and UI
- `Notes/Components/` contains presentational UI pieces for the notes experience

This separation keeps UI, state, and persistence from becoming tangled together.

## Localization and RTL

The app includes multilingual support from the start.

- English is the default language
- Arabic is supported with RTL layout
- translations are split into namespaces such as `common`, `landing`, `notes`, `tasks`, and `settings`
- the app stores the chosen language locally
- when switching between LTR and RTL, the app restores the correct route after reload

Translation files live in:

- `app/src/i18n/locales/en`
- `app/src/i18n/locales/ar`

## Persistence

Notes and app preferences are stored locally on the device. This helps demonstrate a realistic mobile workflow where user data survives refreshes and restarts.

Currently persisted data includes:

- notes data
- preferred language
- last visited main route
- temporary route recovery during RTL reloads

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

### 3. Run on a specific platform

```bash
npm run android
npm run ios
npm run web
```

### 4. Lint the project

```bash

npm run lint
```

## What This Project Demonstrates

This repository is useful if you want to study:

- React Native screen composition
- Expo Router navigation
- Redux Toolkit state flow
- local persistence with AsyncStorage
- translation and RTL handling
- feature-first project structure
- TypeScript in a mobile app

## Current Limitations

The app already covers a strong learning path, but a few parts are intentionally lightweight for now:

- task data is currently screen-local rather than Redux-backed
- note cover images use visual presets instead of device image uploads
- text formatting is represented by style presets rather than a full rich-text editor
- settings are still small and will expand over time

## Planned Next Steps

Possible future improvements include:

- richer settings options
- persistent tasks
- full note details translation pass
- image picking for note covers
- more advanced filters and note organization
- stronger testing setup

## Who This Project Is For

This repository is a good fit for:

- developers learning React Native
- developers studying Expo Router
- beginners exploring Redux Toolkit in a real UI
- anyone who wants a small but structured multilingual mobile app example

## Repository Summary

OmicronNote is an Expo React Native app that demonstrates how to build a multilingual productivity app with notes, tasks, settings, local persistence, and feature-based architecture. It is intentionally structured to be understandable and extendable.
