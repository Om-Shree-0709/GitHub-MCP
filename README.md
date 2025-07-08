# Model Context Protocol (MCP) Server for GitHub Integration

A professional Node.js/Express server for the Model Context Protocol (MCP), designed to bridge VS Code and GitHub using Docker. This project is part of a complete workflow for connecting your GitHub account to VS Code securely and efficiently.

---

## 🚀 Features

- Securely connects VS Code to GitHub via Docker MCP server
- Uses your GitHub Personal Access Token (PAT) for authentication
- Endpoints for listing repositories and getting latest repo info
- Ready for use with the VS Code MCP integration workflow

---

## 📖 Full Setup Guide

For a complete, step-by-step guide (with screenshots and troubleshooting), see the accompanying article:

> **How to Connect GitHub to VS Code Using Docker MCP Server**

- [ ] _Add screenshots for each section as you follow the guide_

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- A GitHub Personal Access Token (PAT)

### Installation

1. Clone the repository:
   ```powershell
   git clone <your-repo-url>
   cd "GitHub MCP"
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory with:

```env
TOKEN=your_github_personal_access_token
```

Or, when using Docker, pass the token as an environment variable:

```powershell
docker run -e GITHUB_PERSONAL_ACCESS_TOKEN=your_github_personal_access_token mcp/github-mcp-server
```

### Running the Server

Start locally:

```powershell
npm start
```

Or run via Docker (recommended for VS Code integration):

```powershell
docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=your_github_personal_access_token -p 3000:3000 mcp/github-mcp-server
```

The server will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🔗 Endpoints

- `/` — Health check and welcome
- `/repos` — List your GitHub repositories
- `/latest-repo` — Info and file structure of your latest repo

---

## 🐞 Troubleshooting

See the article for common problems and solutions (Docker not running, invalid token, etc.).

---

## 📁 Project Structure

- `server.js` — Main server entry point
- `package.json` — Project metadata and dependencies
- `.env` — Environment variables (not committed to version control)

---

## 🤝 Contributing

Pull requests and suggestions are welcome!

---

## 📚 License

MIT
