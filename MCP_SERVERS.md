# MCP Servers Configuration for Vextrus Landing

## Overview

This project has been configured with 6 MCP (Model Context Protocol) servers that extend Claude's capabilities. These servers are configured globally in `~/.claude.json` and will be available in all Claude Code sessions.

## Configured MCP Servers

### 1. Context7 ✅
- **Purpose**: Manages conversation context and persistent memory
- **Status**: Connected and operational
- **Command**: `npx @upstash/context7-mcp`
- **Key Tools**:
  - `mcp__context7__store_memory`: Store context for later retrieval
  - `mcp__context7__retrieve_memory`: Get stored context
  - `mcp__context7__list_memories`: List all stored contexts

### 2. Sequential Thinking ✅
- **Purpose**: Step-by-step reasoning and complex problem decomposition
- **Status**: Connected and operational
- **Command**: `npx @modelcontextprotocol/server-sequential-thinking`
- **Key Tools**:
  - `mcp__sequential_thinking__think_step_by_step`: Break down complex problems
  - `mcp__sequential_thinking__analyze`: Deep analysis of issues

### 3. Playwright ✅
- **Purpose**: Browser automation, web scraping, and UI testing
- **Status**: Connected and operational
- **Command**: `npx @automatalabs/mcp-server-playwright`
- **Key Tools**:
  - `mcp__playwright__navigate_to_url`: Open web pages
  - `mcp__playwright__take_screenshot`: Capture screenshots
  - `mcp__playwright__click_element`: Interact with page elements

### 4. Serena ✅
- **Purpose**: Semantic code search and intelligent code editing
- **Status**: Connected and operational
- **Command**: `uvx --from git+https://github.com/oraios/serena serena-mcp-server`
- **Key Tools**:
  - `mcp__serena__semantic_search`: Search code by meaning
  - `mcp__serena__apply_patch`: Apply intelligent code changes
  - `mcp__serena__refactor`: Automated refactoring

### 5. Consult7 ✅
- **Purpose**: Analyze large files using Google's Gemini 2.5 Pro
- **Status**: Connected and operational
- **Command**: `consult7 google AIzaSyDmVuWC7_gWvK7IQsUbLNPjMU4QnywnkE8`
- **API**: Google AI Studio (Gemini 2.5 Pro)
- **Key Tools**:
  - `mcp__consult7__analyze_file`: Analyze large documents
  - `mcp__consult7__summarize`: Create summaries of extensive content
  - `mcp__consult7__query`: Ask questions about large files

### 6. Claude-MCP ✅
- **Purpose**: Enhanced Claude Code operations and integrations
- **Status**: Connected and operational
- **Command**: `npx @kunihiros/claude-code-mcp`
- **Environment**:
  - `CLAUDE_BIN`: `/home/riz/.nvm/versions/node/v22.17.0/bin/claude`
  - `LOG_LEVEL`: `info`
- **Key Tools**:
  - `mcp__claude_mcp__enhanced_search`: Advanced code search
  - `mcp__claude_mcp__project_analysis`: Full project analysis

## Using MCP Servers in New Sessions

When you start a new Claude Code session, these servers will automatically load. You'll see tools with the `mcp__` prefix available for use.

### Starting Claude Code with MCP

```bash
# Normal start (MCP servers auto-load from ~/.claude.json)
claude

# With debug mode to see MCP server logs
claude --mcp-debug

# With explicit config file
claude --mcp-config ~/.claude.json
```

## Verifying MCP Server Status

```bash
# Check all MCP servers
claude mcp list

# Get details about a specific server
claude mcp get context7
```

## Project-Specific Uses

### For Vextrus Landing Page Development

1. **Context7**: Store design decisions, component states, and development context
2. **Sequential Thinking**: Break down complex UI/UX implementations
3. **Playwright**: Test interactive components, capture screenshots for documentation
4. **Serena**: Search through the codebase semantically, refactor components
5. **Consult7**: Analyze large documentation files, architectural decisions
6. **Claude-MCP**: Enhanced project navigation and code analysis

### Example Use Cases

```typescript
// Using Context7 to store design decisions
mcp__context7__store_memory({
  key: "vextrus-design-system",
  content: "Orbital2D design with glass morphism, 6 modules orbiting central AI hub"
})

// Using Sequential Thinking for complex features
mcp__sequential_thinking__think_step_by_step({
  problem: "Implement drag-and-drop dashboard with persistent state"
})

// Using Playwright for testing
mcp__playwright__navigate_to_url({ url: "http://localhost:3000" })
mcp__playwright__take_screenshot({ path: "dashboard-screenshot.png" })

// Using Serena for code search
mcp__serena__semantic_search({
  query: "components that handle real-time data updates"
})

// Using Consult7 for documentation
mcp__consult7__analyze_file({
  path: "/large-architecture-doc.pdf",
  query: "What are the performance requirements?"
})
```

## Troubleshooting

### If MCP servers don't appear:
1. Exit current Claude Code session
2. Run `claude mcp list` to verify configuration
3. Start new session with `claude --mcp-debug`
4. Check for errors in the debug output

### Common Issues:
- **"Failed to connect"**: Check if required packages are installed globally
- **Tools not appearing**: Ensure you've restarted Claude Code after configuration
- **API errors**: Verify API keys are correct (especially for Consult7)

## Configuration Location

The MCP server configuration is stored in:
```
~/.claude.json
```

This file contains the server definitions, commands, and environment variables needed for each MCP server.

## API Keys

### Google AI Studio (for Consult7)
- **API Key**: `AIzaSyDmVuWC7_gWvK7IQsUbLNPjMU4QnywnkE8`
- **Model**: Gemini 2.5 Pro
- **Purpose**: Large file analysis and documentation queries

## Maintenance

### Updating MCP Servers
```bash
# Update npm-based servers
npm update -g @upstash/context7-mcp
npm update -g @modelcontextprotocol/server-sequential-thinking
npm update -g @automatalabs/mcp-server-playwright
npm update -g @kunihiros/claude-code-mcp

# Update Python-based servers
pip install --upgrade serena consult7
```

### Checking for Updates
Periodically check the GitHub repositories for new features and updates:
- [Serena](https://github.com/oraios/serena)
- [Context7](https://github.com/upstash/context7-mcp)
- [Sequential Thinking](https://github.com/modelcontextprotocol/server-sequential-thinking)
- [Playwright MCP](https://github.com/automatalabs/mcp-server-playwright)

## Security Notes

- API keys are stored in the configuration file
- Be cautious when sharing configuration files
- Consider using environment variables for sensitive keys in production
- The Google API key is project-specific and should not be shared publicly