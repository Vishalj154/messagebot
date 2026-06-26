# Chattrix – Product Blueprint · Part 1 of 3
> Phases 1 – 3: Discovery · PRD · Branding

---

## Phase 1 – Product Discovery

### Product Vision
Chattrix will be the go-to real-time messaging platform for individuals and small teams who value speed, simplicity, and a delightful user experience — delivered entirely on a serverless, scalable Firebase backend.

### Mission Statement
To empower people to communicate instantly and meaningfully, with zero friction, through a beautifully designed, privacy-respecting chat application.

### Problem Statement
Most chat applications are either too bloated (Slack, Teams) or too personal/closed (WhatsApp). Developers and students learning Firebase lack a real-world reference project that is simultaneously production-quality, portfolio-worthy, and educational. Chattrix fills both gaps: a usable product AND a learning vehicle.

### Target Users
| Segment | Description |
|---|---|
| Primary | Students & early-career developers learning React + Firebase |
| Secondary | Small friend groups or hobby teams wanting a private chat space |
| Tertiary | Recruiters evaluating the developer's Firebase & React expertise |

### User Personas

**Persona 1 – Vishal (The Builder)**
- Age: 21, CS student
- Goal: Build a portfolio project that demonstrates real-world Firebase skills
- Pain: Tutorials are too shallow; wants a real app to reference
- Tech comfort: High (React, basic Firebase)

**Persona 2 – Priya (The Casual User)**
- Age: 24, working professional
- Goal: Chat with friends in a clean, fast interface
- Pain: WhatsApp is too cluttered; wants something minimal
- Tech comfort: Medium (smartphone-native)

### User Journey (Core Flow)
```
Land on Splash → Sign Up / Log In → Setup Profile → View Chat List
→ Search User → Start New Chat → Send Messages (text/images)
→ Receive Real-time Messages → Update Settings/Profile → Log Out
```

### Business Goals
1. Ship a complete MVP within 8 weeks (solo developer)
2. Achieve zero-cost operation using Firebase free tier (Spark plan)
3. Demonstrate all major Firebase services in one project
4. Produce a portfolio piece that earns recruiter callbacks

### Success Metrics
| Metric | Target |
|---|---|
| GitHub Stars (portfolio signal) | 50+ within 3 months |
| Core features shipped | 100% of MVP scope |
| Lighthouse Performance Score | ≥ 85 |
| Lighthouse Accessibility Score | ≥ 90 |
| Firebase read costs (Spark limit) | Stay within free tier |
| Time-to-first-message (new user) | < 3 minutes |

---

## Phase 2 – PRD (Product Requirements Document)

### Functional Requirements

**Authentication**
- FR-01: Users can register with email + password
- FR-02: Users can log in with email + password
- FR-03: Users can log in with Google OAuth
- FR-04: Users can reset password via email link
- FR-05: Auth state persists across sessions

**Profile**
- FR-06: New users are prompted to set display name + avatar
- FR-07: Users can update their profile at any time
- FR-08: Avatar images are stored in Firebase Storage
- FR-09: Online/offline presence is displayed

**Messaging**
- FR-10: Users can search for other registered users by display name
- FR-11: Users can initiate a 1-on-1 chat
- FR-12: Messages are delivered and displayed in real time
- FR-13: Messages support plain text
- FR-14: Messages support image attachments
- FR-15: Sent/delivered/read receipts are shown
- FR-16: Timestamps are shown on messages
- FR-17: Chat list shows last message preview + unread count

**UI/UX**
- FR-18: Application is fully responsive (mobile + desktop)
- FR-19: Loading states shown during async operations
- FR-20: Empty states shown when no chats exist
- FR-21: Error messages shown on failures

### Non-Functional Requirements
| ID | Requirement | Target |
|---|---|---|
| NFR-01 | Real-time message latency | < 500ms |
| NFR-02 | Initial page load (LCP) | < 2.5s |
| NFR-03 | Uptime (Firebase SLA) | 99.9% |
| NFR-04 | Mobile responsive breakpoint | 320px minimum |
| NFR-05 | Image upload size limit | 5 MB per file |
| NFR-06 | Firestore security rules | All reads/writes authenticated |
| NFR-07 | No PII stored beyond email + display name | Compliant by design |

### User Stories
| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-01 | New user | Register with email | I can access the app |
| US-02 | Returning user | Log in instantly | I can resume conversations |
| US-03 | User | Set my avatar | Others recognise me |
| US-04 | User | Search for friends | I can start chatting |
| US-05 | User | Send a message | I can communicate in real time |
| US-06 | User | Send an image | I can share visual content |
| US-07 | User | See unread badges | I don't miss messages |
| US-08 | User | See online status | I know if someone is available |
| US-09 | User | Update my profile | I can keep my info current |
| US-10 | User | Log out securely | My account stays protected |

### Acceptance Criteria (Key Stories)

**US-05 (Send a message)**
- ✅ Message appears in sender's chat instantly (optimistic UI)
- ✅ Message appears in receiver's chat within 500ms
- ✅ Message is persisted in Firestore
- ✅ Chat list last-message preview updates
- ✅ Empty input is rejected (no blank messages sent)

**US-01 (Register)**
- ✅ Valid email + password (min 6 chars) creates account
- ✅ Duplicate email shows friendly error
- ✅ User is redirected to Profile Setup after first registration
- ✅ Email verification is optional (MVP) but structured for future

### MVP Scope
| Feature | In MVP? |
|---|---|
| Email/Password Auth | ✅ |
| Google OAuth | ✅ |
| Profile Setup (name + avatar) | ✅ |
| 1-on-1 Chat | ✅ |
| Real-time Messages (text) | ✅ |
| Image Messages | ✅ |
| User Search | ✅ |
| Online Presence | ✅ |
| Unread Count | ✅ |
| Read Receipts | ✅ |
| Push Notifications | ❌ (v2) |
| Group Chat | ❌ (v2) |
| Voice/Video | ❌ (v3) |
| Message Reactions | ❌ (v2) |
| Dark Mode | ✅ (nice-to-have) |

### Future Scope (Post-MVP)
- Group chats with admin controls
- Message reactions & emoji picker
- Push notifications (Firebase Cloud Messaging)
- Message search within chats
- End-to-end encryption (conceptual layer)
- Voice messages
- Typing indicators
- Link preview cards
- Pinned messages
- Chat export

### Risk Analysis
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Firebase free tier limits hit | Low | High | Monitor usage; add quota alerts |
| Firestore security misconfiguration | Medium | High | Write rules first; test with emulator |
| Real-time listener memory leaks | Medium | Medium | Always unsubscribe onSnapshot in useEffect cleanup |
| Image upload size abuse | Medium | Low | Enforce 5MB limit client + Storage rules |
| Scope creep | High | Medium | Strictly enforce MVP list; backlog v2 features |

### Assumptions
- Single developer with ~2 hrs/day of focused work
- Firebase Spark (free) plan is sufficient for MVP
- No backend server code (100% Firebase)
- English-only for MVP

### Constraints
- Firebase Spark plan: 1GB Firestore storage, 10GB/month Storage bandwidth
- Solo developer — no code reviews or CI/CD pipeline initially
- No budget for paid APIs or services

---

## Phase 3 – Branding

### Brand Personality
**Energetic · Clean · Trustworthy · Modern**
Chattrix feels like a premium product built by a team of ten, coded by one. It's the app that makes you smile when you open it.

### Tagline / Slogan
> **"Chat. Connect. Chattrix."**
> Alternative: **"Real conversations. Real time."**

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| Primary | `#6C63FF` | Buttons, active states, brand accent |
| Primary Dark | `#4B44CC` | Hover states |
| Secondary | `#FF6584` | Notifications, unread badges |
| Background Dark | `#0F0F1A` | Dark mode background |
| Background Light | `#F7F8FC` | Light mode background |
| Surface Dark | `#1A1A2E` | Cards, sidebars (dark) |
| Surface Light | `#FFFFFF` | Cards (light) |
| Text Primary | `#E2E2F0` / `#1A1A2E` | Main text |
| Text Muted | `#8888AA` | Timestamps, subtitles |
| Success | `#4CAF82` | Online indicator, delivered tick |
| Error | `#FF4D6A` | Form errors |

### Typography
| Role | Font | Weight |
|---|---|---|
| Display / Logo | **Space Grotesk** | 700 |
| Headings | **Inter** | 600 |
| Body / Messages | **Inter** | 400 |
| Code / Monospace | **JetBrains Mono** | 400 |

Load from Google Fonts. System fallback: `-apple-system, BlinkMacSystemFont, sans-serif`.

### Logo Ideas
- **Concept A**: Two overlapping speech bubbles forming a stylised "C" — represents conversation and connection.
- **Concept B**: Bold "Cx" lettermark with a gradient fill (purple → pink) — minimal, scalable to favicon.
- **Concept C**: A lightning bolt inside a chat bubble — represents real-time speed.

Recommended: **Concept A** for full logo, **Concept B** for favicon/app icon.

### Design Language
- **Style**: Glassmorphism + flat minimalism hybrid
- **Borders**: Subtle `1px` borders with low-opacity (`rgba(255,255,255,0.08)`)
- **Border Radius**: `12px` (cards), `24px` (buttons), `50%` (avatars)
- **Shadows**: Soft, diffused (`0 4px 24px rgba(108,99,255,0.15)`)
- **Transitions**: `200–300ms ease` on all interactive elements
- **Animations**: Subtle fade-in for messages, slide-up for modals

### Folder Naming Conventions
```
src/
  assets/         → images, icons, fonts
  components/     → reusable UI components (PascalCase files)
  contexts/       → React contexts
  hooks/          → custom hooks (use prefix)
  pages/          → route-level page components
  services/       → Firebase service abstraction
  styles/         → global CSS / theme tokens
  utils/          → helper functions (camelCase files)
  config/         → firebase.js, routes.js, constants.js
```

### Firebase Project Naming
- **Firebase Project ID**: `chattrix-app-prod`
- **Dev/Test Project**: `chattrix-app-dev`
- **Storage Bucket**: `chattrix-app-prod.appspot.com`
- **Firestore Database**: `(default)` — single region `us-central1`

### GitHub Repository Structure
```
chattrix/
  ├── .github/
  │   └── ISSUE_TEMPLATE.md
  ├── public/
  ├── src/
  ├── .env.example
  ├── .gitignore
  ├── firestore.rules
  ├── storage.rules
  ├── firebase.json
  ├── .firebaserc
  ├── package.json
  └── README.md
```
Repository name: `chattrix` (lowercase, no hyphens for cleanliness)
