// Basic Express MCP server (Hello World)
const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const { Octokit } = require("@octokit/rest");
dotenv.config();

const octokit = new Octokit({ auth: process.env.TOKEN });

app.get("/", (req, res) => {
  res.send("Hello World from your MCP server!");
});

app.get("/repos", async (req, res) => {
  try {
    const { data } = await octokit.rest.repos.listForAuthenticatedUser();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get info and file structure of the latest repo
app.get("/latest-repo", async (req, res) => {
  try {
    // Get the latest repo (most recently created)
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
        path: item.path,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`MCP server listening at http://localhost:${port}`);
});
