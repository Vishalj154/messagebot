# Chattrix – Product Blueprint · Part 2 of 3
> Phases 4 – 5: Technical Architecture · UI/UX Planning

---

## Phase 4 – Technical Architecture

### Frontend Stack
| Concern | Choice | Reason |
|---|---|---|
| Framework | React 18 (Vite) | Fast DX, industry standard |
| Language | JavaScript (JSX) | Simpler for learning; TypeScript in v2 |
| Routing | React Router v6 | File-based-like, nested routes |
| State | Context API + useReducer | Sufficient for MVP; no Redux overhead |
| Styling | Plain CSS + CSS Variables | Max control, no abstraction overhead |
| Icons | Lucide React | Lightweight, consistent |
| Date/Time | date-fns | Lightweight alternative to moment |
| Image Crop | react-easy-crop | Avatar cropping before upload |
| Notifications | react-hot-toast | Non-intrusive toasts |

### Routing Structure
```
/                     → Splash / redirect logic
/login                → Login page
/signup               → Signup page
/forgot-password      → Password reset
/setup-profile        → First-time profile setup (protected)
/app                  → App shell (protected layout)
  /app/chats          → Chat list (default home)
  /app/chat/:chatId   → Individual chat room
  /app/search         → User search
  /app/profile        → Own profile
  /app/settings       → Settings
/404                  → Not found
```

### Folder Structure (Full)
```
src/
  assets/
    logo.svg
    default-avatar.png
  components/
    auth/
      AuthGuard.jsx
      GoogleSignInButton.jsx
    chat/
      ChatBubble.jsx
      ChatInput.jsx
      ChatHeader.jsx
      MessageList.jsx
      TypingIndicator.jsx
    common/
      Avatar.jsx
      Badge.jsx
      Button.jsx
      Input.jsx
      Loader.jsx
      Modal.jsx
      EmptyState.jsx
      ErrorState.jsx
    layout/
      AppShell.jsx
      Sidebar.jsx
      TopBar.jsx
    user/
      UserCard.jsx
      OnlineIndicator.jsx
  config/
    firebase.js
    routes.js
    constants.js
  contexts/
    AuthContext.jsx
    ChatContext.jsx
    ThemeContext.jsx
  hooks/
    useAuth.js
    useChat.js
    usePresence.js
    useMessages.js
    useUserSearch.js
    useUpload.js
  pages/
    SplashPage.jsx
    LoginPage.jsx
    SignupPage.jsx
    ForgotPasswordPage.jsx
    SetupProfilePage.jsx
    ChatsPage.jsx
    ChatRoomPage.jsx
    SearchPage.jsx
    ProfilePage.jsx
    SettingsPage.jsx
    NotFoundPage.jsx
  services/
    auth.service.js
    chat.service.js
    user.service.js
    storage.service.js
    presence.service.js
  styles/
    global.css
    variables.css
    animations.css
    typography.css
  utils/
    formatTime.js
    generateChatId.js
    validateEmail.js
    compressImage.js
  main.jsx
  App.jsx
```

### Component Hierarchy
```
App
├── ThemeContext.Provider
├── AuthContext.Provider
│   ├── SplashPage
│   ├── LoginPage
│   ├── SignupPage
│   ├── ForgotPasswordPage
│   ├── SetupProfilePage (AuthGuard)
│   └── AppShell (AuthGuard)
│       ├── Sidebar
│       │   ├── Avatar (own)
│       │   └── ChatListItem[]
│       ├── ChatsPage
│       │   └── UserCard[]
│       ├── ChatRoomPage
│       │   ├── ChatHeader
│       │   ├── MessageList
│       │   │   └── ChatBubble[]
│       │   └── ChatInput
│       ├── SearchPage
│       │   └── UserCard[]
│       ├── ProfilePage
│       └── SettingsPage
```

### State Management Strategy
| State | Location | Method |
|---|---|---|
| Current user | AuthContext | useState + onAuthStateChanged |
| Active chat messages | useMessages hook | onSnapshot listener |
| Chat list | useChat hook | onSnapshot listener |
| User search results | useUserSearch hook | Local state |
| Theme (dark/light) | ThemeContext | localStorage + state |
| Toast notifications | react-hot-toast | Global singleton |

---

### Firebase Architecture

**Authentication**
- Providers: Email/Password + Google OAuth
- Session persistence: `browserLocalPersistence`
- Auth state: Managed via `onAuthStateChanged` in AuthContext
- Post-login redirect: Check Firestore for profile doc → route to `/setup-profile` or `/app/chats`

**Firestore Collections**

```
users/
  {userId}/
    uid: string
    displayName: string
    email: string
    photoURL: string
    createdAt: timestamp
    lastSeen: timestamp
    isOnline: boolean

chats/
  {chatId}/                        ← chatId = sorted uid1_uid2
    participants: [uid1, uid2]
    lastMessage: string
    lastMessageTime: timestamp
    lastMessageSender: string
    unreadCount: { uid1: number, uid2: number }

    messages/                      ← subcollection
      {messageId}/
        senderId: string
        text: string
        imageURL: string | null
        type: 'text' | 'image'
        createdAt: timestamp
        status: 'sent' | 'delivered' | 'read'
```

**Firestore Index Requirements**
- `messages` ordered by `createdAt ASC` (auto-indexed)
- `chats` ordered by `lastMessageTime DESC` (composite index needed)

**Firebase Storage Structure**
```
avatars/
  {userId}/profile.jpg

chat-images/
  {chatId}/
    {messageId}.jpg
```

**Firestore Security Rules Strategy**
```
users collection:
  - read: any authenticated user (for search)
  - write: only own document (uid === request.auth.uid)

chats collection:
  - read/write: only if uid in participants array

messages subcollection:
  - read: only chat participants
  - create: only authenticated + sender == own uid
  - update/delete: only own message
```

**Storage Rules Strategy**
```
avatars/{userId}/**:
  - read: any authenticated user
  - write: only userId === request.auth.uid
  - max size: 2MB, content-type image/*

chat-images/{chatId}/**:
  - read: only authenticated users
  - write: only authenticated + max 5MB + image/*
```

**Performance Strategy**
| Technique | Where Applied |
|---|---|
| Route-based lazy loading | All page components via React.lazy + Suspense |
| Message pagination | Load last 30 messages; paginate up on scroll |
| Image compression | Client-side before upload via compressImage util |
| Firestore query limits | Always use `.limit()` on queries |
| onSnapshot cleanup | useEffect return → unsubscribe() |
| Avatar WebP/JPEG | Compress to ≤ 200KB on upload |
| Memoization | React.memo on ChatBubble, UserCard |

---

## Phase 5 – UI/UX Planning

### Screen 1 – Splash Page (`/`)
**Purpose**: Brand intro + auth routing

| Element | Detail |
|---|---|
| Components | Logo, tagline, animated gradient background |
| Buttons | "Get Started" → /login |
| Loading State | Auto-redirect if already logged in |
| Navigation | Checks auth state → redirect to /app/chats or /login |
| Responsive | Centered single-column on all viewports |

---

### Screen 2 – Login Page (`/login`)
**Purpose**: Authenticate existing users

| Element | Detail |
|---|---|
| Components | Logo, form card, divider |
| Inputs | Email (type=email), Password (type=password, toggle visibility) |
| Buttons | "Sign In" (primary), "Sign in with Google" (secondary), "Forgot Password?" (link) |
| Validation | Email format, password min 6 chars, real-time error display |
| Navigation | Success → /app/chats; Link to /signup |
| Loading State | Button spinner during Firebase call |
| Error State | Firebase error code mapped to friendly message (wrong-password, user-not-found) |
| Responsive | Card max-width 420px, full-width on mobile |

---

### Screen 3 – Signup Page (`/signup`)
**Purpose**: Register new users

| Element | Detail |
|---|---|
| Inputs | Display Name, Email, Password, Confirm Password |
| Buttons | "Create Account" (primary), "Sign up with Google" |
| Validation | Name ≥ 2 chars, valid email, password match, min 6 chars |
| Navigation | Success → /setup-profile |
| Error State | email-already-in-use shown inline |
| Responsive | Same as Login |

---

### Screen 4 – Forgot Password (`/forgot-password`)
**Purpose**: Trigger password reset email

| Element | Detail |
|---|---|
| Inputs | Email address |
| Buttons | "Send Reset Link", "Back to Login" |
| Success State | Confirmation message shown (do not redirect) |
| Error State | user-not-found shown inline |

---

### Screen 5 – Profile Setup (`/setup-profile`)
**Purpose**: Collect display name + avatar after first signup

| Element | Detail |
|---|---|
| Components | Avatar picker (click to upload + crop), Name input |
| Buttons | "Save & Continue" |
| Validation | Name required, avatar optional (default avatar used) |
| Loading State | Upload progress indicator |
| Navigation | Success → /app/chats |
| Notes | Only shown on first login (check Firestore for profile doc) |

---

### Screen 6 – App Shell / Layout
**Purpose**: Persistent shell wrapping all /app routes

| Element | Detail |
|---|---|
| Desktop | Left sidebar (280px) + main content area |
| Mobile | Bottom tab bar OR hamburger → slide-in sidebar |
| Sidebar | Logo, own avatar + name, chat list, bottom: Search + Settings icons |
| TopBar | Back button (mobile), chat partner name + status, options menu |

---

### Screen 7 – Chat List (`/app/chats`)
**Purpose**: Show all active conversations

| Element | Detail |
|---|---|
| Components | ChatListItem (avatar, name, last message, timestamp, unread badge) |
| Empty State | Illustration + "No chats yet. Search for someone to start talking!" + Search button |
| Loading State | 3–4 skeleton placeholder cards |
| Real-time | onSnapshot updates list as new messages arrive |
| Sorting | Most recent chat on top |
| Responsive | Full-width list on mobile, sidebar panel on desktop |

---

### Screen 8 – Chat Room (`/app/chat/:chatId`)
**Purpose**: 1-on-1 real-time messaging

| Element | Detail |
|---|---|
| Components | ChatHeader, MessageList, ChatInput |
| ChatHeader | Partner avatar, name, online status, back arrow |
| MessageList | Bubbles grouped by sender; date separators; read receipts |
| ChatBubble | Own (right, accent colour), other (left, surface colour), timestamp, status icon |
| ChatInput | Text field (auto-grow), image attach icon, send button |
| Inputs | Text + file picker (image types only, ≤5MB) |
| Validation | Disallow empty send; validate file type + size |
| Loading State | Message shows greyed-out until Firestore confirms |
| Empty State | "Say hi to [Name]! 👋" prompt |
| Scroll | Auto-scroll to bottom on new message |
| Responsive | Full-screen on mobile; right panel on desktop |

---

### Screen 9 – User Search (`/app/search`)
**Purpose**: Find users to start new chats

| Element | Detail |
|---|---|
| Components | Search input (debounced 300ms), UserCard list |
| Inputs | Display name search field (auto-focus) |
| UserCard | Avatar, name, "Message" button |
| Empty State | "Search for people to chat with" (initial); "No users found" (no results) |
| Loading State | Skeleton cards during query |
| Navigation | Click UserCard → creates/opens chat → /app/chat/:chatId |

---

### Screen 10 – Profile Page (`/app/profile`)
**Purpose**: View + edit own profile

| Element | Detail |
|---|---|
| Components | Avatar (editable), display name, email (read-only), join date |
| Buttons | "Edit Profile", "Change Avatar", "Save Changes" |
| Validation | Same as Profile Setup |
| Loading State | Spinner on avatar upload |

---

### Screen 11 – Settings (`/app/settings`)
**Purpose**: App preferences + account actions

| Element | Detail |
|---|---|
| Sections | Account, Appearance, About |
| Controls | Dark/Light mode toggle, notification toggle (future), danger zone |
| Buttons | "Log Out" (with confirmation modal), "Delete Account" (future) |

---

### Screen 12 – Notifications (v2 placeholder)
**Purpose**: Missed message alerts via Firebase Cloud Messaging (FCM)
- Will be implemented post-MVP in v2
- UI: Bell icon in sidebar, notification list page

---

### Screen 13 – 404 Page (`/404` + catch-all)
**Purpose**: Friendly error for unknown routes

| Element | Detail |
|---|---|
| Components | Illustration, "Page not found", home button |
| Navigation | "Go Home" → /app/chats |

---

### Responsive Breakpoints
| Breakpoint | Value | Behaviour |
|---|---|---|
| Mobile | < 640px | Full-screen chat, bottom tabs, stack layout |
| Tablet | 640–1024px | Sidebar 240px, content fills rest |
| Desktop | > 1024px | Sidebar 280px, fixed; chat panel adaptive |
