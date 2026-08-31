---
title: "Smart Qur'an – Digital Al-Qur'an Application"
description: "A lightweight, modern digital Al-Qur'an mobile app developed for Jabatan Kemajuan Islam Malaysia (JAKIM) — featuring audio tilawah, smart search, and full offline capabilities."
publishDate: 2026-08-31
tags: ["Mobile App", "Nuxt.js", "Capacitor", "Laravel", "Quran Digital", "Magang"]
thumbnail: "smart-quran-preview.png"
---

> A modern, lightweight, and intuitive Al-Qur'an mobile application designed as a focused digital companion for Muslims to recite, listen, and study the holy book anytime, anywhere.

## About the Project

**HOTAMA Technologies** developed **Smart Qur'an** for **Jabatan Kemajuan Islam Malaysia (JAKIM) 🇲🇾**. The application is crafted specifically to provide a comfortable, minimal, and fast reading experience, allowing users to focus entirely on their tilawah with seamless online and offline capabilities.

| Info         | Detail                                     |
| ------------ | ------------------------------------------ |
| **Client**   | Jabatan Kemajuan Islam Malaysia (JAKIM) 🇲🇾 |
| **Type**     | Digital Al-Qur'an Application              |
| **Platform** | Mobile App (Android & iOS) & Web Dashboard |
| **Coverage** | National & International (Global Access)   |

## Key Features

- **Complete Mushaf & Translations** — High-clarity digital Mushaf with multiple translation options.
- **Audio Tilawah Player** — Multi-Qari recitation streaming and offline playback with custom speed controls.
- **Smart Search Engine** — Fast indexing across Surahs, Ayahs, and translated keywords.
- **Personalized Reading Experience** — Dark/Light mode theme toggle, adjustable Arabic font styles, and custom typography sizing.
- **Continue Reading & History** — Automatic reading progress tracking and last-read markers.
- **Study & Annotation Tools** — Bookmarks, color-coded highlights, personal notes, and direct ayah sharing.
- **Offline Reading & Audio Download** — Download specific surahs or full audio recitations for seamless offline reading.
- **Account Synchronization** — Cloud sync across devices for bookmarks, reading history, and personal notes.

## Platform Architecture

```
Smart Qur'an Ecosystem
├── Web Dashboard (Admin & Content Management)
│   ├── Quran Text & Metadata CMS
│   ├── Audio Recitation & Qari Management
│   ├── Translation & Tafsir Management
│   └── Multi-language Support (EN / MY)
│
├── Backend Services (Laravel 13 RESTful API)
│   ├── Quran Surah / Ayah Endpoints
│   ├── User Synchronization & Auth
│   └── Audio CDN & Media Delivery
│
└── Mobile Hybrid App (Nuxt.js + Capacitor)
    ├── Offline Mushaf Reader & Audio Caching
    ├── Dynamic Multi-locale Routing (@nuxtjs/i18n)
    ├── Global Network Detection & State Handlers
    └── Cross-platform Native Build (Android & iOS)
```

## My Role & Key Responsibilities

As the **Mobile & Hybrid Application Developer**, I was responsible for engineering the mobile client architecture using **Nuxt.js + Capacitor**, configuring native device bridges, managing build pipelines, and contributing to the management dashboard:

### 1. Capacitor Native Integration & Plugin Setup
- **Capacitor Configuration:** Setup and maintained `capacitor.config.ts`, native platform bindings, and runtime permissions for both Android and iOS.
- **Offline Audio Storage (`@capacitor/filesystem`):** Built the download manager and local file caching system for multi-Qari audio tilawah files to enable full offline playback.
- **Secure Persistence (`@capacitor/preferences`):** Integrated device-level secure key-value storage for user authentication tokens, reading progress, and reader display preferences.
- **Network State Handling (`@capacitor/network`):** Implemented global reactive offline/online state detection across all application views.

### 2. Architecture, Internationalization & Reusable UI
- **Multi-language Setup (`@nuxtjs/i18n`):** Configured the internationalization architecture and directory structure supporting English (`EN`) and Bahasa Melayu (`MY`) locales.
- **Reusable State Components:** Developed standardized global UI state components:
  - `<LoadingState>` — Smooth skeleton & loading indicators.
  - `<EmptyState>` — Clean placeholder illustrations for empty search/bookmarks.
  - `<OfflineState>` — Graceful fallback views with retry triggers when offline.
  - `<ErrorState>` — Centralized exception and API failure handling.

### 3. Performance Optimization & Build Pipelines
- **Startup Time & Lazy Loading:** Optimized initial mobile boot times by implementing code splitting and lazy loading for heavy modules (Quran Mushaf Reader engine and Audio Player component).
- **Smooth Page Transitions:** Tuned Nuxt route transitions and hardware-accelerated animations for a native-like fluid feel.
- **Automated Build Pipeline:** Configured and maintained the full deployment pipeline:
  ```bash
  nuxt generate → npx cap sync → Android Studio / Xcode native builds
  ```
- **Environment Configuration:** Managed environment configurations across Development, Staging, and Production stages.
- **Release Management:** Prepared versioning, app signing keys, store assets, and release bundles for Google Play Store and Apple App Store.

### 4. Web Dashboard Contributions
- **i18n Localization:** Initialized and structured the English (`EN`) and Malay (`MY`) language integration on the administrative dashboard.
- **Quran Data API Integration:** Connected and consumed Laravel RESTful APIs for Quranic data presentation and content synchronization.

---

## Tech Stack & Architecture

### Core Technologies
- **Mobile Hybrid Engine:** [Nuxt.js](https://nuxt.com/) (Vue 3, SSR/SSG)
- **Native Runtime Bridge:** [Capacitor](https://capacitorjs.com/) (Cross-platform Android & iOS)
- **Backend API:** [Laravel 13](https://laravel.com/) (PHP RESTful API)
- **Internationalization:** `@nuxtjs/i18n` (EN / MY localization)
- **Native Hardware Plugins:** `@capacitor/filesystem`, `@capacitor/preferences`, `@capacitor/network`

### Summary Table

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend Framework** | Nuxt.js (Vue 3) | Primary reactive hybrid mobile application layer |
| **Mobile Bridge** | Capacitor | Native runtime wrapper for Android (APK/AAB) & iOS (IPA) |
| **Backend API** | Laravel 13 | RESTful backend, authentication & data endpoints |
| **Offline Audio Storage**| `@capacitor/filesystem` | Audio recitations download & offline disk caching |
| **Storage & Preferences**| `@capacitor/preferences` | Encrypted local storage for user settings & bookmarks |
| **Network Management** | `@capacitor/network` | Real-time connection monitoring & offline fallback handling |
| **Localization** | `@nuxtjs/i18n` | Multi-language routing and dictionary support (EN / MY) |

---
