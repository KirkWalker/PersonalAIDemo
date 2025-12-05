# 🗨️ React Native Chat App

A modular React Native chat application with system‑driven responses, quick‑reply options, and enforced code quality via Husky + Commitlint.

---

## ✨ Features

- Chat UI built with `FlatList` and custom `MessageItem` component.
- System greeting: starts every conversation with “Hello, what can I help you with today”.
- Quick‑reply options: 5 static options displayed under the greeting.
- Dynamic responses:
  - User taps an option → system replies “Great, let me fetch information on [choice]”.
  - Temporary “fetching…” message → replaced with mock data after delay.
- Reset button: clears the conversation and restores the initial greeting + options.
- Modular architecture:
  - `hooks/useChatConversation.ts` → chat logic.
  - `data/systemOptions.ts` → static options + mock data.
  - `data/systemResponses.ts` → reusable system response strings.
- Code quality enforcement:
  - Husky hooks for linting, formatting, testing, and commit message validation.
  - Commitlint with Conventional Commit rules.

---

## 📂 Project Structure

    src/
      components/
        atoms/
            Button.tsx
            Input.tsx
            LoadingIndicator.tsx
            Text.tsx
        chat/
            ChatInput.tsx
            ChatItem.tsx
            MessageList.tsx
        layout/
            Header.jsx
            Layout.jsx
        screens/
            ChatScreen.jsx
      hooks/
        useChatConversation.ts
      data/
        fakeChatData.ts
      styles/
        tokens.ts
      types/
        chatTypes.ts
    .husky/
      pre-commit
      pre-push
      commit-msg
    commitlint.config.js
    eslint.config.js
    .prettierrc
    tsconfig.json
    jest.config.js
    jestSetup.js

---

## 🚀 Getting Started

1. Install dependencies with your package manager (e.g. `npm install`).
2. Run the app using your React Native tooling (`npm start` or `expo start`).

---

## 🛡️ Husky + Commitlint Setup

- Install Husky as a dev dependency.
- Enable Husky with `npx husky install`.
- Add `"prepare": "husky install"` to your `package.json` scripts.
- Create hooks manually in `.husky/`:
  - Pre‑commit → run lint + format
  - Pre‑push → run tests
  - Commit‑msg → validate commit messages with Commitlint

---

## 📖 Conventional Commit Cheat‑Sheet

Format:  
`<type>(scope): <description>`

Types:

- `feat` → new feature
- `fix` → bug fix
- `chore` → maintenance
- `docs` → documentation
- `style` → formatting only
- `refactor` → code restructure
- `test` → add/update tests
- `perf` → performance improvement

Examples:

- `feat(chat): add quick-reply options`
- `fix(ui): correct button alignment`
- `chore(husky): configure pre-commit lint`

---

## ⚙️ Commitlint Rules

Defined in `commitlint.config.js`:

- Subject must be lowercase
- Subject max length: 72 chars
- Scope required
- Valid types only (`feat`, `fix`, `chore`, etc.)
- Blank line before body/footer

---

## 🧪 Scripts

In `package.json`:

- `lint` → run ESLint
- `format` → run Prettier
- `test` → run Jest

---

## 📌 Roadmap

- Add typing indicator animation (instead of plain “fetching…”)
- Connect to real backend API
- Expand quick‑reply options dynamically

---

## 📝 License

MIT License. Free to use and modify.

---

Perfect — let’s sketch out a sample folder structure and component breakdown for your Expo + Chat Module project. This will give you a clear blueprint of how everything fits together.

📂 Suggested Folder Structure
personalai/
├── babel.config.js
├── eslint.config.cjs
├── package.json
├── App.tsx
│
├── src/
│ ├── components/ # Reusable UI pieces
│ │ ├── ChatMessage.tsx # Single message bubble
│ │ ├── ChatInput.tsx # Input field for sending messages
│ │ └── Loader.tsx # Loading spinner / indicator
│ │
│ ├── modules/
│ │ └── chat/
│ │ ├── ChatScreen.tsx # Main chat screen
│ │ ├── ChatList.tsx # Infinite scroll list
│ │ └── hooks/
│ │ └── useChatMessages.ts # TanStack Query infinite scroll
│ │
│ ├── utils/
│ │ └── fakeData.ts # Generates fake messages
│ │
│ └── styles/
│ └── theme.ts # Colors, spacing, typography
│
└── tests/
└── chat.test.tsx # Unit tests for chat components

🧩 Component Breakdown
ChatScreen.tsx

- Entry point for the chat module.
- Composes ChatList and ChatInput.
- Handles layout and navigation.
  ChatList.tsx
- Uses TanStack Query’s useInfiniteQuery.
- Loads 15 fake messages per “page”.
- Implements infinite scroll with FlatList.
  ChatMessage.tsx
- Displays a single message bubble.
- Props: text, sender, timestamp.
- Styled for modularity (sender vs. receiver).
  ChatInput.tsx
- Text input + send button.
- For now, just appends fake messages locally.
  useChatMessages.ts
- Custom hook wrapping useInfiniteQuery.
- Fetches fake data from fakeData.ts.
- Returns paginated messages and loading states.
  fakeData.ts
- Simple function that generates 15 fake messages per call.
- Example:
  export const generateFakeMessages = (page: number) => {
  return Array.from({ length: 15 }, (\_, i) => ({
  id: `${page}-${i}`,
  text: `Message ${i + 1} from page ${page}`,
  sender: i % 2 === 0 ? 'user' : 'bot',
  timestamp: new Date().toISOString(),
  }));
  };

🚀 Final App Behavior

- Starts with Expo.
- Shows a chat screen with infinite scroll.
- Loads 15 fake messages per scroll using TanStack Query.
- Input field allows adding new fake messages.
- Codebase enforces linting, formatting, and pre-commit checks via ESLint, Prettier, Husky, and lint-staged.
- Modular, maintainable structure ready for real API integration later.

👉 This structure ensures your app is clean, scalable, and easy to extend.
Would you like me to also draft a sample ChatList.tsx implementation showing how to wire up useInfiniteQuery with fake data?
