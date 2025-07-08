/**
 * Professional MCP Server for GitHub Integration via Docker
 * --------------------------------------------------------
 * This Express server demonstrates how to connect VS Code to GitHub using the Model Context Protocol (MCP) server pattern.
 *
 * - Reads your GitHub Personal Access Token from the environment (see .env or Docker env var)
 * - Provides endpoints for health check, listing repos, and getting latest repo info
 * - Designed to be used as a backend for VS Code MCP integration (see README for full guide)
 */

const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const { Octokit } = require("@octokit/rest");

dotenv.config();

// Use TOKEN from environment (set via .env or Docker)
const octokit = new Octokit({
  auth: process.env.TOKEN || process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

// Health check and welcome endpoint
app.get("/", (req, res) => {
  res.send("MCP server is running. See /repos for your GitHub repositories.");
});

// List all repositories for the authenticated user
app.get("/repos", async (req, res) => {
  try {
    const { data } = await octokit.rest.repos.listForAuthenticatedUser();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get info and file structure of the latest (most recently created) repo
app.get("/latest-repo", async (req, res) => {
  try {
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: "created",
      direction: "desc",
      per_page: 1,
    });
    if (!repos.length)
      return res.status(404).json({ error: "No repositories found." });
    const repo = repos[0];

    // Get the file structure (root contents)
    const { data: contents } = await octokit.rest.repos.getContent({
      owner: repo.owner.login,
      repo: repo.name,
      path: "",
    });

    res.json({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      fileStructure: contents.map((item) => ({
        name: item.name,
        type: item.type,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`MCP server listening at http://localhost:${port}`);
});
