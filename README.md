# NC News

A social news aggregation website where users can browse and interact with articles, explore topics, and engage with the community through comments. Built with React and powered by the [NC News API](https://github.com/your-username/nc-news-api).

🔗 **Live Site:** [https://back-end-nc-news-yvh9.onrender.com/api/](https://back-end-nc-news-yvh9.onrender.com/api/)

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Related](#related)

---

## Features

- 📰 **Browse articles** — view all articles on the home feed
- 🔍 **Search by topic** — filter articles by category/topic
- 🔃 **Sort and filter** — sort articles by date, votes, or title in ascending or descending order
- 📄 **Read articles** — click into any article to read its full content
- 👍 **Vote on articles** — upvote or downvote articles
- 💬 **Read comments** — view all comments on a given article
- ✏️ **Post comments** — add your own comment to any article
- 🗑️ **Delete comments** — remove your own comments

---

## Getting Started

Follow the steps below to run the project locally.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/nc-news-frontend.git
cd nc-news-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root of the project and point it at the backend API:

```
VITE_API_BASE_URL=https://your-api.onrender.com/api
```

> If running the backend locally, use `http://localhost:9090/api` instead.

---

## Running the App

To start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
```

---

## Usage

Once the app is running, you can:

- **Browse the home feed** to see all articles, sorted by date by default
- **Use the topic navigation** to filter articles by a specific topic
- **Use the sort controls** to reorder articles by votes, date, or title, in ascending or descending order
- **Click an article** to open it and read the full content and its comments
- **Vote on articles** using the upvote and downvote buttons
- **Post a comment** on any article using the comment form at the bottom of the article page
- **Delete your own comments** using the delete button that appears next to comments posted under your username

---

## Tech Stack

- **Framework** — [React](https://react.dev/)
- **Build Tool** — [Vite](https://vitejs.dev/)
- **Routing** — [React Router](https://reactrouter.com/)
- **HTTP Client** — [Axios](https://axios-http.com/)
- **Hosting** — [Netlify](https://netlify.com/)

---

## Related

- 🔗 [NC News API](https://github.com/luquelarranaga/back-end-nc-news) — the backend that powers this app
