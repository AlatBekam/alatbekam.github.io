---
title: "kGYM – Sistem Manajemen Gym & Fitness"
description: "Ekosistem digital terintegrasi untuk kGYM — manajemen membership, QR check-in, booking personal trainer, dan operasional multi-cabang dalam satu platform."
publishDate: 2026-08-31
tags: ["Mobile App", "Flutter", "Gym Management", "Magang"]
thumbnail: "Kgym-preview.png"
---

> A single digital ecosystem connecting members, personal trainers, and administrators — creating gym operations that are more efficient, structured, and scalable.

## About the Project

**HOTAMA Technologies** develops an integrated digital ecosystem for **kGYM**, designed to simplify membership management, branch operations, fitness services, and administrative processes — all through one connected platform.

| Info         | Detail                          |
| ------------ | ------------------------------- |
| **Client**   | KGYM                            |
| **Type**     | Gym & Fitness Management System |
| **Platform** | Web Dashboard & Mobile App      |
| **Scope**    | Multi-Branch Gym Operations     |

## Key Features

- **Membership & User Management** — Centralized member data management
- **Digital Membership Card & QR Code** — Convenient QR-based member cards
- **Check-In / Check-Out** — Automated member attendance via QR scan
- **Branch Management** — Manage multiple gym branches from a single dashboard
- **Personal Trainer Booking & Management** — Organized PT session scheduling
- **Fitness Tracking** — Monitor member workout progress
- **Payment & Transaction Management** — Handle membership and service payments

## Platform Architecture

```
kGYM Ecosystem
├── Web Dashboard (Admin & Staff)
│   ├── Member Management
│   ├── Branch Management
│   ├── Reports & Transactions
│   └── Personal Trainer Management
│
└── Mobile App (Member & PT)
    ├── QR Code Membership
    ├── Check-In / Check-Out
    ├── PT Session Booking
    └── Fitness Tracking
```

## My Role & Key Responsibilities

As the **Mobile Developer** for this project, I was responsible for the end-to-end development of the kGYM mobile application — from foundational setup to production deployment on the Google Play Store, alongside targeted backend API adjustments:

### 1. Project Initialization & Core Architecture

- **Project Scaffolding:** Initialized the project structure, global variables, shared configuration, and reusable UI components/design widgets.
- **Theming System:** Implemented dynamic **Dark & Light mode** switching with consistent design tokens across the app.
- **Local & Secure Storage:** Configured secure encrypted storage for sensitive session tokens and lightweight caching for user preferences.
- **Network Layer (`dioClient`):** Built the networking client featuring centralized interceptors for automated JWT Bearer injection, session expiration/401 handling, and global error processing.

### 2. Feature & Module Development

- **Home & Navigation:** Developed the primary **User Home Screen** and the **Persistent Bottom Navigation Bar**.
- **QR Check-In / Check-Out:** Implemented dynamic turnstile QR Code generation and automated screen brightness boosting for seamless gate scanning.
- **Personal Trainer (PT) System:**
  - **PT Booking:** End-to-end package selection and personal trainer booking workflow.
  - **PT Booking Sessions:** Scheduling, session calendar, and status monitoring.
  - **PT Dashboard:** Dedicated dashboard module for trainers to view and manage client sessions.
- **Nutrition Ecosystem:**
  - **Nutrition Lookup:** Food and nutritional data search engine.
  - **Nutrition Tracking:** Daily caloric intake, macro tracking, and meal logging.
- **User Account & Settings:** Developed the **Profile Edit** screen and the **Profile Settings Drawer**.

### 3. Backend Adjustments & Quality Assurance

- **Backend API Development:** Added and adapted backend REST API endpoints to support specific mobile client requirements.
- **Testing & Bug Fixing:** Performed functional testing, edge-case debugging, and performance optimization across Android and iOS devices.

### 4. Deployment & Delivery

- **Google Play Store Release:** Managed app signing, release bundle preparation, and successful submission to the **Google Play Store**.

---

## App Links

| Platform              | Link                                                                                 |
| :-------------------- | :----------------------------------------------------------------------------------- |
| **Website**           | [Visit Website](https://kgym.hotamadev.com)                                          |
| **Google Play Store** | [Download App](https://play.google.com/store/apps/details?id=com.hotama.kgym_member) |
| **Apple App Store**   | [Download App](https://apps.apple.com/id/app/k-gym/id6795038547?l=id)                |

---
