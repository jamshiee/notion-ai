
# 🧠 NotionAi — Next.js AI-Powered Collaborative Docs

<a href="https://ibb.co/B2BKqFTf"><img src="https://i.ibb.co/WvfpgjBH/Screenshot-2025-06-17-130619.png" alt="Screenshot-2025-06-17-130619" border="0"></a>


[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://notion-ai-ten.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#)

> A Notion-inspired AI-powered collaborative document editor built with Next.js, Clerk, Liveblocks, ShadCN UI, Firestore, and Cloudflare Workers AI.

---

## ✨ Features

- 📝 **Collaborative Editor** – Real-time document collaboration using Liveblocks, including live cursor previews and user presence.
- 🌍 **AI Translation** – Translate entire documents to different languages using Cloudflare Workers AI.
- 💬 **Ask Questions** – Ask context-aware questions about your document via Gemini integration.
- 🔐 **Authentication** – Seamless user sign-in/signup using Clerk.
- 🎨 **Elegant UI** – Built with [ShadCN UI](https://ui.shadcn.com/) for accessible, customizable components.
- ☁️ **Serverless AI APIs** – Cloudflare Workers serve AI capabilities efficiently and scalably.
- 🔥 **Firestore Backend** – Fast and scalable NoSQL database to store user and document data.

---

## 📸 Preview

🔗 [Live Demo on Vercel →](https://notion-ai-ten.vercel.app/)

## [screenshot]

<a href="https://ibb.co/8LsmZ6qd"><img src="https://i.ibb.co/S4y6CRbd/Screenshot-2025-06-17-185707.png" alt="Screenshot-2025-06-17-185707" border="3"></a><!-- Optional: Add a preview screenshot -->

---

## 🧱 Tech Stack

| Feature                  | Tech                                         |
|--------------------------|----------------------------------------------|
| Frontend Framework       | [Next.js](https://nextjs.org/)              |
| UI Components            | [ShadCN UI](https://ui.shadcn.com/)         |
| Authentication           | [Clerk](https://clerk.dev/)                 |
| Realtime Collaboration   | [Liveblocks](https://liveblocks.io/)        |
| Backend Database         | [Firestore](https://firebase.google.com/)   |
| AI (Translation/Summary) | [Cloudflare Workers AI](https://ai.cloudflare.com/) |
| AI (Chat Q&A)            | [Gemini Pro](https://ai.google.dev/)        |
| Deployment               | [Vercel](https://vercel.com/)               |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jamshiee/notion-ai.git
cd notion-ai
```

### 2. Setup environment variables
Create a .env.local file in the root with the following:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
LIVEBLOCKS_PRIVATE_KEY=your_liveblocks_private_key

# Firestore Admin Key (Base64-encoded JSON service account key)
FIREBASE_SERVICE_KEY_BASE64=your_base64_encoded_firebase_service_key

# AI Worker Endpoint
NEXT_PUBLIC_BASE_URL=https://your-cloudflare-worker-url.workers.dev

```

To generate FIREBASE_SERVICE_KEY_BASE64 from your JSON key:

```powershell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("path/to/firebase_service_key.json"))
```

## 🤖 AI Integrations

-  **🔁 /translateDocument** - 
Summarizes a document using Cloudflare's BART model.
Translates the summary with Meta’s M2M100 multilingual model.

- **❓ /chatToDocument** - 
Uses Gemini Pro (gemini-2.0-flash-lite) to answer user questions based on markdown JSON content.

## 🔐 Authentication
- Implemented using Clerk with role-based document access.
- Users must be logged in to create or collaborate on documents.
- Firestore stores user metadata and access roles.

## 🤝 Collaboration
- Powered by Liveblocks
- Invite users to your document
- View real-time cursor presence and changes

## 🌐 Deployment
- Deployed on Vercel at:
 🔗 https://notion-ai-ten.vercel.app/

- AI Worker deployed on Cloudflare Workers.

