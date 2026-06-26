# Chattrix – Product Blueprint · Part 3 of 3
> Phases 6 – 10: Firebase Learning · Roadmap · Dev Order · Docs · Portfolio · Master Checklist

---

## Phase 6 – Firebase Learning Roadmap

| Firebase Concept | What You Learn | Feature That Teaches It |
|---|---|---|
| **Firebase Project Setup** | Console, config object, SDK init | M1 – Project Setup |
| **Authentication – Email/Password** | createUserWithEmailAndPassword, signIn, signOut, onAuthStateChanged | M2 – Login & Signup |
| **Authentication – Google OAuth** | GoogleAuthProvider, signInWithPopup | M2 – Google Sign-In |
| **Authentication – Password Reset** | sendPasswordResetEmail | M2 – Forgot Password |
| **Auth State Persistence** | browserLocalPersistence | M2 – Session Management |
| **Firestore – Write** | setDoc, addDoc | M3 – Profile Creation, Send Message |
| **Firestore – Read Once** | getDoc, getDocs, query, where | M3 – User Search |
| **Firestore – Real-time** | onSnapshot (live listener) | M4 – Real-time Messages, Chat List |
| **Firestore – Update** | updateDoc | M3 – Profile Edit, Read Receipts |
| **Firestore – Subcollections** | messages as subcollection of chats | M4 – Message Data Model |
| **Firestore – Compound Queries** | where + orderBy + limit | M4 – Message Pagination |
| **Firestore – Timestamps** | serverTimestamp() | M4 – Message ordering |
| **Firebase Storage – Upload** | uploadBytesResumable | M3 – Avatar Upload, M5 – Image Messages |
| **Firebase Storage – Download URL** | getDownloadURL | M3 – Display Avatar |
| **Firestore Security Rules** | match, allow read/write, request.auth | M6 – Access Control |
| **Storage Security Rules** | request.resource.size, contentType | M6 – Image Upload Rules |
| **Firestore Presence Pattern** | onDisconnect or Firestore timestamp trick | M4 – Online Status |
| **Firebase Hosting** | firebase deploy, SPA rewrites | M7 – Deployment |
| **Environment Variables** | .env for config secrets | M1 – Secure Config |
| **Firebase Emulator Suite** | Auth + Firestore emulators for local dev | M1 – Local Development |

---

## Phase 7 – Implementation Roadmap

### Milestone 1 – Project Foundation (Week 1)
**Objective**: Scaffolding, Firebase connection, dev environment

**Features**: Vite + React setup, Firebase project, env config, routing skeleton, global CSS

**Tasks**:
- Create Vite React app
- Install dependencies (react-router-dom, firebase, lucide-react, react-hot-toast, date-fns)
- Create Firebase project (chattrix-app-dev)
- Configure .env with Firebase credentials
- Set up firebase.js (init app, auth, db, storage)
- Set up React Router with all route placeholders
- Implement global CSS variables and reset
- Configure Firebase Emulators (Auth + Firestore)

**Time Estimate**: 4–6 hours

**Dependencies**: Firebase account, Node.js installed

**Deliverables**: App runs locally, routes navigate, Firebase connected

**Testing Checklist**:
- [ ] `npm run dev` runs without errors
- [ ] All route paths render placeholder components
- [ ] Firebase console shows project created
- [ ] Emulator runs (`firebase emulators:start`)

**Git Commits**:
- `feat: scaffold vite react app`
- `feat: configure firebase project and sdk`
- `feat: setup react router with placeholder pages`
- `style: add global css variables and reset`

**Completion Criteria**: Dev server runs, Firebase SDK imports without error

---

### Milestone 2 – Authentication (Week 1–2)
**Objective**: Full auth flow (signup, login, Google, reset, session)

**Features**: Email signup, login, Google OAuth, forgot password, auth guard, AuthContext

**Tasks**:
- Build AuthContext with onAuthStateChanged
- Build AuthGuard component
- Build Login, Signup, ForgotPassword pages (UI + logic)
- Integrate GoogleAuthProvider
- Handle all Firebase auth error codes with friendly messages
- Redirect logic (new user → /setup-profile, existing → /app/chats)

**Time Estimate**: 8–10 hours

**Dependencies**: M1 complete

**Deliverables**: Users can register, login, logout, reset password

**Testing Checklist**:
- [ ] Email signup creates user in Firebase Auth console
- [ ] Login with wrong password shows error
- [ ] Google sign-in works
- [ ] Reset email arrives in inbox
- [ ] Refresh keeps user logged in
- [ ] AuthGuard redirects unauthenticated users

**Git Commits**:
- `feat: implement AuthContext and auth state listener`
- `feat: build login page with email/password auth`
- `feat: add google oauth sign-in`
- `feat: build signup page with validation`
- `feat: add forgot password flow`
- `feat: implement auth guard for protected routes`

---

### Milestone 3 – User Profile (Week 2)
**Objective**: Profile creation and editing with avatar upload

**Features**: Profile Setup page, avatar upload, Firestore user doc creation, Profile page edit

**Tasks**:
- Build SetupProfile page (name + avatar)
- Implement Storage upload with progress (uploadBytesResumable)
- Create Firestore user document on first login
- Build profile page with edit capability
- Add default avatar fallback

**Time Estimate**: 6–8 hours

**Dependencies**: M2 complete

**Deliverables**: User profile stored in Firestore, avatar in Storage

**Testing Checklist**:
- [ ] First-login redirect to /setup-profile works
- [ ] Avatar uploads appear in Firebase Storage
- [ ] User doc created in `users/` collection
- [ ] Profile page shows and saves edits
- [ ] Default avatar shows when no photo uploaded

**Git Commits**:
- `feat: create setup-profile page with avatar upload`
- `feat: write user doc to firestore on registration`
- `feat: build profile page with edit functionality`
- `feat: add storage service with upload progress`

---

### Milestone 4 – Real-time Chat (Week 3–4)
**Objective**: Core 1-on-1 messaging with real-time sync

**Features**: Chat creation, message sending, real-time listeners, chat list, read receipts, online presence

**Tasks**:
- Design Firestore schema (chats + messages subcollection)
- Build chat.service.js (createChat, sendMessage, listenToMessages, listenToChats)
- Build ChatRoom page (MessageList, ChatBubble, ChatInput, ChatHeader)
- Implement onSnapshot for real-time messages
- Implement onSnapshot for chat list with unread counts
- Build online presence (Firestore lastSeen + isOnline pattern)
- Add read receipt update on message open
- Implement auto-scroll on new message
- Add optimistic UI for sent messages

**Time Estimate**: 16–20 hours

**Dependencies**: M3 complete

**Deliverables**: Full 1-on-1 text messaging working in real time

**Testing Checklist**:
- [ ] Two browser tabs can chat in real time
- [ ] Chat list updates when new message arrives
- [ ] Unread badge increments correctly
- [ ] Read receipt updates on open
- [ ] Online indicator reflects actual state
- [ ] Messages persist after page refresh

**Git Commits**:
- `feat: design and implement firestore chat schema`
- `feat: build chat room page with message bubbles`
- `feat: add real-time message listener with onsnapshot`
- `feat: implement chat list with real-time updates`
- `feat: add read receipts and unread count`
- `feat: implement online presence with firestore`
- `feat: add optimistic ui for sent messages`

---

### Milestone 5 – Image Messages & User Search (Week 4–5)
**Objective**: Enrich messages with images; find other users

**Features**: Image upload in chat, image preview in message bubble, user search by name

**Tasks**:
- Add image picker + validation to ChatInput
- Implement image upload to Storage (`chat-images/{chatId}/{messageId}`)
- Display image bubbles in MessageList
- Build user search page (Firestore query by displayName)
- Implement debounced search input
- Navigate from UserCard to chat room (create chat if new)

**Time Estimate**: 8–10 hours

**Dependencies**: M4 complete

**Deliverables**: Images sent in chat; users searchable by name

**Testing Checklist**:
- [ ] Image sends and appears in both users' chats
- [ ] File > 5MB shows error
- [ ] Non-image file rejected
- [ ] Search returns matching users
- [ ] No results shows empty state
- [ ] Clicking user opens/creates correct chat

**Git Commits**:
- `feat: add image message support with storage upload`
- `feat: display image bubbles in message list`
- `feat: build user search page with debounce`
- `feat: create chat on first message to new user`

---

### Milestone 6 – Security Rules & Hardening (Week 5)
**Objective**: Lock down Firestore + Storage with proper rules

**Tasks**:
- Write Firestore security rules for all collections
- Write Storage security rules
- Test rules with Firebase Emulator Rules Playground
- Verify no unauthorized reads/writes possible

**Time Estimate**: 4–6 hours

**Git Commits**:
- `security: write firestore security rules`
- `security: write storage security rules`
- `security: test and verify rules with emulator`

---

### Milestone 7 – Polish, Settings & Deployment (Week 6–7)
**Objective**: Final polish, dark mode, settings, production deploy

**Tasks**:
- Build Settings page (dark/light mode toggle, logout)
- Implement ThemeContext with CSS variable switching
- Add 404 page
- Audit all loading, empty, and error states
- Performance audit (Lighthouse)
- Set up Firebase Hosting
- Deploy to production (`firebase deploy`)
- Write README

**Time Estimate**: 8–10 hours

**Git Commits**:
- `feat: build settings page with theme toggle`
- `feat: implement dark/light mode via css variables`
- `feat: add 404 page`
- `perf: add lazy loading to all route components`
- `docs: write readme`
- `chore: deploy to firebase hosting`

---

## Phase 8 – Development Order

Build in this exact sequence — each step unlocks the next:

```
Step 1:  Vite + React scaffold
Step 2:  Firebase project creation + SDK config
Step 3:  Firebase Emulator setup
Step 4:  React Router skeleton (all routes, placeholder pages)
Step 5:  Global CSS (variables, reset, typography, animations)
Step 6:  AuthContext + onAuthStateChanged
Step 7:  AuthGuard component
Step 8:  Signup page (UI + logic)
Step 9:  Login page (UI + logic)
Step 10: Google OAuth integration
Step 11: Forgot Password page
Step 12: Profile Setup page + Storage avatar upload
Step 13: Firestore user document creation
Step 14: Profile View/Edit page
Step 15: Firestore chat + messages schema
Step 16: chat.service.js (CRUD functions)
Step 17: Chat List page (real-time via onSnapshot)
Step 18: Chat Room page (MessageList + ChatBubble)
Step 19: ChatInput component (text send)
Step 20: Real-time message listener (onSnapshot)
Step 21: Unread count + read receipts
Step 22: Online presence (isOnline / lastSeen)
Step 23: Image message upload + display
Step 24: User Search page (Firestore query)
Step 25: Firestore Security Rules
Step 26: Storage Security Rules
Step 27: Settings page + dark/light mode
Step 28: 404 page
Step 29: Loading, empty, error states audit
Step 30: Lazy loading + performance optimisation
Step 31: Lighthouse audit + fixes
Step 32: Firebase Hosting setup
Step 33: Production deployment
Step 34: README + documentation
```

---

## Phase 9 – Documentation

### README Outline
```markdown
# Chattrix – Real-time Chat Application

## 🚀 Live Demo
[link]

## ✨ Features
- Real-time 1-on-1 messaging
- Google & Email authentication
- Image sharing
- Online presence
- Dark/Light mode

## 🛠 Tech Stack
- React 18, Vite
- Firebase (Auth, Firestore, Storage, Hosting)

## 📁 Project Structure
[folder tree]

## ⚡ Getting Started
1. Clone the repo
2. Copy .env.example → .env and fill Firebase credentials
3. npm install
4. npm run dev

## 🔐 Environment Variables
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

## 🧪 Running with Emulators
firebase emulators:start

## 🚢 Deployment
firebase deploy

## 📸 Screenshots
[add screenshots]

## 🗺 Roadmap
- [ ] Group chats
- [ ] Push notifications
- [ ] Message reactions

## 📄 License
MIT
```

### Coding Conventions
| Rule | Standard |
|---|---|
| Component naming | PascalCase (ChatBubble.jsx) |
| Hook naming | camelCase with `use` prefix (useAuth.js) |
| Service naming | camelCase with `.service.js` suffix |
| CSS class naming | kebab-case (`.chat-bubble`) |
| Constants | SCREAMING_SNAKE_CASE |
| Variable/function naming | camelCase |
| Import order | React → Libraries → Contexts → Components → Utils → Styles |
| Max file length | 200 lines (split if exceeded) |
| Comments | JSDoc on all service functions |

### Git Branching Strategy
```
main          ← production-ready code only
develop       ← integration branch
feature/*     ← individual features (feature/auth, feature/chat)
fix/*         ← bug fixes
chore/*       ← config, deps, tooling
```
Flow: `feature/xyz` → commit → `develop` → merge to `main` on milestone completion

### Commit Message Guidelines (Conventional Commits)
```
feat:     new feature
fix:      bug fix
style:    CSS/formatting (no logic change)
refactor: code restructure (no feature change)
perf:     performance improvement
security: security fix/hardening
chore:    dependency/config update
docs:     documentation
test:     tests
```
Example: `feat: add real-time message listener with onsnapshot`

---

## Phase 10 – Portfolio Readiness

### What Makes Chattrix Stand Out

**Core Differentiators**:
- ✅ Full-stack Firebase app (real-time with presence — not just CRUD)
- ✅ Production Firestore security rules (most tutorial apps skip this)
- ✅ Optimistic UI (feels like a native app)
- ✅ Image upload with compression + Storage
- ✅ Clean architecture (services layer, custom hooks, contexts)
- ✅ Dark/light mode
- ✅ Firebase Hosting deployment (live URL to share with recruiters)

**Resume Bullet Point**:
> "Built Chattrix — a real-time chat application using React 18 and Firebase (Auth, Firestore, Storage, Hosting). Features include Google OAuth, live messaging with onSnapshot, image sharing, read receipts, online presence, and Firestore Security Rules. Deployed on Firebase Hosting."

### Advanced Features to Add Post-MVP (for Extra Impact)

| Feature | Firebase Concept Learned |
|---|---|
| Push Notifications | Firebase Cloud Messaging (FCM) |
| Group Chats | Complex Firestore queries, multi-participant rules |
| Message Reactions | Firestore array operations (arrayUnion/arrayRemove) |
| Typing Indicators | Firestore ephemeral writes |
| Message Search | Firestore text search + Algolia integration |
| Email Verification | Firebase Auth email verification flow |
| Rate Limiting | Cloud Functions (first backend/serverless code) |
| Analytics Dashboard | Firebase Analytics + custom events |
| A/B Testing | Firebase Remote Config |
| Automated Tests | Jest + Firebase Emulator integration tests |

---

## Master Implementation Checklist
*(In strict dependency order — check each off as you complete it)*

### Environment & Setup
- [ ] Install Node.js and npm
- [ ] Create Vite React app (`npm create vite@latest`)
- [ ] Install all dependencies (react-router-dom, firebase, lucide-react, react-hot-toast, date-fns)
- [ ] Create Firebase project (chattrix-app-dev) in Firebase Console
- [ ] Add .env file with Firebase config keys
- [ ] Create `src/config/firebase.js` (init auth, db, storage)
- [ ] Install Firebase CLI globally (`npm install -g firebase-tools`)
- [ ] Run `firebase login`
- [ ] Run `firebase init` (select Firestore, Storage, Hosting, Emulators)
- [ ] Start Firebase Emulators (`firebase emulators:start`)

### Routing & Layout
- [ ] Install React Router v6
- [ ] Define all routes in App.jsx (all paths from Phase 4)
- [ ] Create placeholder `.jsx` files for all pages
- [ ] Build AppShell layout (sidebar + content area)
- [ ] Build AuthGuard component (redirect if not logged in)

### Styling Foundation
- [ ] Create `src/styles/variables.css` (color tokens, spacing, border-radius)
- [ ] Create `src/styles/global.css` (reset, base styles, scrollbar)
- [ ] Create `src/styles/animations.css` (fade, slide, pulse)
- [ ] Create `src/styles/typography.css` (font imports, size scale)
- [ ] Import Google Fonts (Space Grotesk + Inter) in index.html
- [ ] Build ThemeContext (dark/light toggle via CSS class on body)

### Authentication
- [ ] Build AuthContext with onAuthStateChanged listener
- [ ] Build Signup page (form UI + validation + Firebase createUser call)
- [ ] Build Login page (form UI + validation + Firebase signIn call)
- [ ] Integrate Google OAuth (GoogleAuthProvider + signInWithPopup)
- [ ] Build Forgot Password page (sendPasswordResetEmail)
- [ ] Map Firebase error codes to friendly user messages
- [ ] Test all auth flows end-to-end with Emulator

### Profile
- [ ] Build Setup Profile page (name input + avatar picker)
- [ ] Implement avatar upload to Firebase Storage (uploadBytesResumable)
- [ ] Show upload progress indicator
- [ ] Create user Firestore document in `users/` on first signup
- [ ] Check for existing profile doc to decide route after login
- [ ] Build Profile view/edit page with save functionality
- [ ] Add default avatar fallback when no photo

### Chat Data Layer
- [ ] Define Firestore schema (chats collection + messages subcollection)
- [ ] Build `src/services/chat.service.js` (createChat, sendMessage, listenToMessages, listenToChats, updateLastMessage)
- [ ] Build `src/services/user.service.js` (getUser, updateUser, searchUsers)
- [ ] Build `src/services/storage.service.js` (uploadAvatar, uploadChatImage, getDownloadURL)
- [ ] Build `src/services/presence.service.js` (setOnline, setOffline, subscribeToPresence)
- [ ] Build `src/utils/generateChatId.js` (sort + join two UIDs)

### Chat UI
- [ ] Build Chat List page with onSnapshot listener (listenToChats)
- [ ] Build ChatListItem component (avatar, name, last message, time, unread badge)
- [ ] Build ChatRoom page container
- [ ] Build ChatHeader component (partner avatar, name, online dot, back arrow)
- [ ] Build MessageList component with onSnapshot listener
- [ ] Build ChatBubble component (own/other variants, timestamp, status icon)
- [ ] Build ChatInput component (auto-grow textarea + send button)
- [ ] Implement auto-scroll to latest message on new arrival
- [ ] Add optimistic UI for sent messages (show immediately, update on Firestore confirm)

### Messaging Features
- [ ] Implement read receipts (updateDoc status='read' on chat open)
- [ ] Implement unread count increment (on send) and reset (on open)
- [ ] Display online/offline presence indicator in ChatHeader and ChatListItem
- [ ] Add image attach button to ChatInput (file input, image/* only)
- [ ] Upload selected image to Storage before sending message
- [ ] Display image bubbles in MessageList (with loading skeleton)
- [ ] Enforce 5MB file size limit with error toast

### User Search
- [ ] Build Search page UI (input + results list)
- [ ] Implement Firestore displayName query (startAt / endAt range query)
- [ ] Add 300ms debounce to search input using setTimeout
- [ ] Build UserCard component (avatar, name, Message button)
- [ ] On UserCard click: generateChatId → check if chat exists → create if not → navigate to /app/chat/:chatId

### Security
- [ ] Write `firestore.rules` (users, chats, messages rules)
- [ ] Write `storage.rules` (avatars, chat-images rules)
- [ ] Test all rules in Firebase Emulator Rules Playground
- [ ] Verify: unauthenticated user cannot read any data
- [ ] Verify: user cannot read chats they are not a participant of
- [ ] Verify: user cannot write as another user

### Polish & UX
- [ ] Build Settings page (theme toggle, logout button with confirm modal)
- [ ] Build 404 Not Found page (illustration + go home button)
- [ ] Add loading skeletons for Chat List and Chat Room
- [ ] Add empty states for Chat List, Search results, Chat Room (no messages)
- [ ] Add error states with retry CTA on all async operations
- [ ] Add react-hot-toast feedback for all user-triggered async actions
- [ ] Test all responsive breakpoints (320px, 768px, 1280px)

### Performance
- [ ] Wrap all page components in React.lazy + Suspense
- [ ] Add message pagination (limit 30, load more on scroll to top)
- [ ] Implement client-side image compression before upload
- [ ] Add React.memo to ChatBubble and UserCard
- [ ] Run Lighthouse in Chrome DevTools — fix any score below 85

### Deployment
- [ ] Set up `firebase.json` with Hosting SPA rewrite (`"destination": "/index.html"`)
- [ ] Create production Firebase project (chattrix-app-prod)
- [ ] Set production environment variables in `.env.production`
- [ ] Run `npm run build` (Vite production build)
- [ ] Run `firebase deploy`
- [ ] Test the live production URL
- [ ] Verify Firebase Hosting shows correct app with HTTPS

### Documentation & Portfolio
- [ ] Write README.md (all sections: features, stack, setup, env vars, deploy, screenshots)
- [ ] Add 3–4 screenshots to README (login, chat list, chat room, profile)
- [ ] Add live demo link in README header and GitHub repo description
- [ ] Create `.env.example` with all required keys (empty values)
- [ ] Tag v1.0.0 release on GitHub with release notes
- [ ] Add "chattrix", "react", "firebase", "chat-app" topics to GitHub repo
