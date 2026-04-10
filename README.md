<p align="center">
  <img src="Frontend/assets/images/wealthlens.png" alt="WealthLens Logo" width="120" height="120" />
</p>

<h1 align="center">WealthLens</h1>

<p align="center">
  <strong>AI-Powered Intelligent Financial Advisory & Portfolio Management Platform</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#system-architecture">Architecture</a> •
  <a href="#technology-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#api-reference">API Reference</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version" />
  <img src="https://img.shields.io/badge/license-Proprietary-red.svg" alt="License" />
  <img src="https://img.shields.io/badge/python-3.10%2B-green.svg" alt="Python" />
  <img src="https://img.shields.io/badge/node-18%2B-green.svg" alt="Node.js" />
  <img src="https://img.shields.io/badge/react--native-0.81.5-blue.svg" alt="React Native" />
  <img src="https://img.shields.io/badge/expo-54-purple.svg" alt="Expo" />
  <img src="https://img.shields.io/badge/FastAPI-latest-009688.svg" alt="FastAPI" />
  <img src="https://img.shields.io/badge/status-Production--Ready-brightgreen.svg" alt="Status" />
</p>

---

## Executive Summary

**WealthLens** is a proprietary, enterprise-grade intelligent financial advisory platform that combines state-of-the-art Large Language Model (LLM) reasoning, Retrieval-Augmented Generation (RAG), recursive deep research orchestration, and real-time multi-source market data aggregation to deliver personalized, context-aware financial guidance across mobile and web interfaces.

The platform is architecturally designed as a decoupled client-server system, with a Python-based AI inference backend and a cross-platform React Native (Expo) frontend, enabling seamless deployment across iOS, Android, and Web from a single codebase.

---

## Table of Contents

- [Executive Summary](#executive-summary)
- [Key Innovations & Differentiators](#key-innovations--differentiators)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Core Modules — Detailed Specification](#core-modules--detailed-specification)
- [Data Flow & Processing Pipeline](#data-flow--processing-pipeline)
- [Installation & Setup](#installation--setup)
- [Configuration Reference](#configuration-reference)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Security Considerations](#security-considerations)
- [Performance & Scalability](#performance--scalability)
- [Testing & Quality Assurance](#testing--quality-assurance)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Intellectual Property Notice](#intellectual-property-notice)
- [License](#license)
- [Contributors](#contributors)

---

## Key Innovations & Differentiators

| Innovation | Description |
|---|---|
| **Recursive Deep Research Engine** | A novel multi-depth research orchestration system that recursively decomposes complex financial queries into sub-questions, independently researches each via web search and financial APIs, grades relevance, and synthesizes a unified expert-level analysis. Configurable depth (`MAX_DEPTH`) and breadth (`NUM_SUBQUESTIONS`) parameters control research granularity. |
| **Hybrid RAG + Real-Time Pipeline** | Combines document-grounded retrieval (FAISS/ChromaDB vector stores over ingested PDF corpora) with real-time market data from multiple financial APIs (Alpha Vantage, YFinance), intelligently deciding per-query whether to prioritize knowledge-base context or live data based on LLM-driven relevance grading. |
| **Multi-LLM Orchestration** | Employs a purpose-optimized multi-model architecture: separate LLM configurations for reasoning/analysis, conversational synthesis, and tool-calling tasks, with support for both cloud (Groq) and local (Ollama) inference backends, enabling offline-capable deployment. |
| **Automated Query Classification & Routing** | An intelligent multi-tier query classifier routes incoming user queries to specialized handlers — stock-specific, financial-instrument, general-knowledge, or conversational — ensuring optimal processing paths and response quality. |
| **Gemini-Powered Response Enhancement** | A dedicated response post-processing layer using Google Gemini for intelligent summarization, formatting consistency, and readability enhancement of synthesized financial analysis content. |
| **Cross-Platform Universal Interface** | A single React Native (Expo) codebase producing native iOS, Android, and Web applications, with adaptive responsive layouts, platform-specific optimizations, and a unified design system. |

---

## Features

### 🤖 AI Financial Advisory Engine
- **Conversational AI Chat** — Natural language financial Q&A with conversation memory and context retention
- **Deep Research Mode** — Multi-depth recursive research with real-time progress streaming
- **PDF Knowledge Base** — RAG-powered document analysis with automatic ingestion and vector indexing
- **Relevance Grading** — LLM-driven retrieval quality assessment with binary relevance scoring

### 📈 Real-Time Market Intelligence
- **Live Stock Quotes** — Real-time pricing for global and Indian (BSE/NSE) equities with automatic INR conversion
- **Market Indices Tracking** — S&P 500, NASDAQ, Dow Jones, NIFTY 50, SENSEX, FTSE 100, DAX, Nikkei 225
- **Cryptocurrency Data** — Live pricing for Bitcoin, Ethereum, and major cryptocurrencies
- **Market Movers** — Top gainers and losers across tracked instruments
- **Investment Opportunities** — Curated live investment opportunities with trending analysis

### 💰 Personal Finance Management
- **Expense Tracking** — Category-based expense monitoring and analysis
- **Goal Planning** — Financial goal setting with progress visualization
- **Transaction History** — Comprehensive transaction ledger with search and filtering
- **Investment Portfolio** — Portfolio overview with real-time valuation
- **Budget Management** — Budget allocation and adherence tracking

### 🌐 Additional Tools
- **Currency Converter** — Real-time multi-currency conversion with live exchange rates
- **Learning Hub** — Curated financial education content and articles
- **Multi-Search Fallback** — Cascading web search across Tavily, Google, Bing, and DuckDuckGo

### 🎨 User Experience
- **Cross-Platform** — Native iOS, Android, and Web from a single codebase
- **Dark/Light Theme** — System-adaptive theming with manual override
- **Responsive Design** — Adaptive layouts for mobile, tablet, and desktop viewports
- **Floating Chat Widget** — Persistent AI assistant accessible from any screen
- **Authentication System** — Secure login/signup with session management

---

## System Architecture

### High-Level Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
│  │   iOS App   │  │ Android App │  │   Web App   │                │
│  │  (Expo Go)  │  │  (Expo Go)  │  │ (localhost)  │                │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                │
│         └────────────────┼────────────────┘                        │
│                          │ HTTP/REST (JSON)                        │
│                     React Native + Expo Router                      │
└──────────────────────────┼──────────────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │   FastAPI   │
                    │  (CORS)     │
                    │  Port 8000  │
                    └──────┬──────┘
                           │
┌──────────────────────────┼──────────────────────────────────────────┐
│                    BACKEND LAYER                                    │
│                          │                                          │
│  ┌───────────────────────▼────────────────────────────┐            │
│  │          QUERY CLASSIFICATION ENGINE                │            │
│  │  ┌──────────┬──────────┬───────────┬────────────┐  │            │
│  │  │  Stock   │Financial │ General   │ Small Talk │  │            │
│  │  │  Query   │  Query   │  Query    │   Query    │  │            │
│  │  └────┬─────┴────┬─────┴─────┬─────┴──────┬─────┘  │            │
│  └───────┼──────────┼───────────┼────────────┼────────┘            │
│          │          │           │            │                      │
│  ┌───────▼──┐ ┌─────▼───┐ ┌────▼─────┐ ┌───▼──────┐              │
│  │Alpha     │ │Enhanced │ │RAG       │ │Agno      │              │
│  │Vantage   │ │Financial│ │Pipeline  │ │Conv.     │              │
│  │YFinance  │ │Tools    │ │+Web      │ │Agent     │              │
│  └───────┬──┘ └─────┬───┘ │Search    │ └───┬──────┘              │
│          │          │      └────┬─────┘     │                      │
│          │          │           │            │                      │
│  ┌───────▼──────────▼───────────▼────────────▼─────────┐          │
│  │              SYNTHESIS & ENHANCEMENT                  │          │
│  │  ┌──────────────────┐  ┌──────────────────────┐     │          │
│  │  │  Agno Synthesis  │  │  Gemini Enhancement  │     │          │
│  │  │  Agent (LLM)     │──▶  (Post-Processing)   │     │          │
│  │  └──────────────────┘  └──────────────────────┘     │          │
│  └──────────────────────────────────────────────────────┘          │
│                                                                    │
│  ┌────────────────────────────────────────────────────┐            │
│  │               DATA & KNOWLEDGE LAYER               │            │
│  │  ┌──────────┐ ┌───────────┐ ┌──────────────────┐  │            │
│  │  │ChromaDB  │ │FAISS      │ │Conversation      │  │            │
│  │  │(RAG      │ │(PDF       │ │Memory            │  │            │
│  │  │ Store)   │ │ Index)    │ │(In-Memory)       │  │            │
│  │  └──────────┘ └───────────┘ └──────────────────┘  │            │
│  └────────────────────────────────────────────────────┘            │
│                                                                    │
│  ┌────────────────────────────────────────────────────┐            │
│  │             EXTERNAL API INTEGRATIONS              │            │
│  │  ┌────────────┐ ┌──────────┐ ┌─────────────┐     │            │
│  │  │Groq Cloud  │ │Tavily    │ │Google       │     │            │
│  │  │(LLM Inf.) │ │(Search)  │ │Gemini AI    │     │            │
│  │  ├────────────┤ ├──────────┤ ├─────────────┤     │            │
│  │  │Alpha      │ │YFinance  │ │Ollama       │     │            │
│  │  │Vantage    │ │(Market)  │ │(Local LLM)  │     │            │
│  │  └────────────┘ └──────────┘ └─────────────┘     │            │
│  └────────────────────────────────────────────────────┘            │
└────────────────────────────────────────────────────────────────────┘
```

### Workflow Diagram

<p align="center">
  <img src="workflow diagram.png" alt="WealthLens Processing Workflow" width="100%" />
</p>

<p align="center"><em>Figure 1: End-to-end query processing workflow — from user input through classification, RAG retrieval, relevance grading, deep research, synthesis, and response delivery.</em></p>

---

## Technology Stack

### Backend

| Technology | Purpose | Version |
|---|---|---|
| **Python** | Core runtime | 3.10+ |
| **FastAPI** | Asynchronous REST API framework | Latest |
| **Uvicorn** | ASGI server | Latest |
| **LangChain** | LLM orchestration, chains, and memory management | Latest |
| **Agno** | AI agent framework for multi-model orchestration | Latest |
| **Groq** | Cloud LLM inference (Llama 4 Scout 17B) | Latest |
| **Ollama** | Local LLM inference (Llama 3.2, Nomic Embed) | Latest |
| **Google Generative AI** | Gemini 1.5 Flash for response enhancement | Latest |
| **ChromaDB** | Persistent vector database for RAG | Latest |
| **FAISS** | High-performance vector similarity search | Latest |
| **Tavily** | Advanced web search API | Latest |
| **YFinance** | Yahoo Finance market data | Latest |
| **Alpha Vantage** | Premium stock & forex data API | Latest |
| **BeautifulSoup4** | HTML parsing for web search fallbacks | Latest |
| **Pydantic** | Data validation and serialization | Latest |

### Frontend

| Technology | Purpose | Version |
|---|---|---|
| **React Native** | Cross-platform mobile framework | 0.81.5 |
| **Expo** | Development platform & build toolchain | 54.x |
| **Expo Router** | File-based routing system | 6.x |
| **TypeScript** | Type-safe JavaScript | 5.9.x |
| **React** | UI component library | 19.1.0 |
| **NativeWind / TailwindCSS** | Utility-first styling | 4.x |
| **React Native Reanimated** | Performant animations | 4.1.x |
| **React Native Chart Kit** | Financial data visualization | 6.12.x |
| **AsyncStorage** | Client-side persistent storage | 2.2.0 |
| **Expo Linear Gradient** | Gradient UI elements | 15.x |
| **Lucide React Native** | Icon system | Latest |

### LLM Models

| Model | Provider | Use Case |
|---|---|---|
| `meta-llama/llama-4-scout-17b-16e-instruct` | Groq Cloud | Primary reasoning, synthesis, tool-calling |
| `gemini-1.5-flash` | Google AI | Response enhancement and summarization |
| `llama3.2:latest` | Ollama (Local) | Offline-capable local inference |
| `nomic-embed-text` | Ollama (Local) | Document embedding generation |
| `all-minilm` | Ollama (Local) | Lightweight semantic similarity embeddings |

---

## Core Modules — Detailed Specification

### 1. Query Classification Engine (`run.py`)

The entry point for all user queries. Implements a multi-tier classification system:

```
User Query
    │
    ▼
classify_query_type(query)
    │
    ├── 'stock'       → handle_stock_query()      → Alpha Vantage / YFinance
    ├── 'financial'   → handle_financial_query()   → Enhanced Financial Tools
    ├── 'general'     → handle_general_query()     → RAG + Web Research
    ├── 'small_talk'  → Agno Conversational Agent  → Direct LLM Response
    └── (fallback)    → process_query_flow()       → Full RAG + Deep Research Pipeline
```

**Classification Logic:** Keyword-based routing with domain-specific vocabularies for stock operations (ticker symbols, price queries), financial instruments (indices, crypto, portfolio), and conversational patterns (greetings, acknowledgments).

### 2. Deep Research Engine (`deep_research.py`)

A recursive research orchestration system that performs multi-depth investigation:

```
research(query)
    │
    ▼
_generate_subquestions(query, NUM_SUBQUESTIONS=3)
    │
    ▼
For each subquestion:
    │
    ├── _research_subquestion(sq, depth=0)
    │       │
    │       ├── Tool Relevance Check (YFinance applicable?)
    │       ├── YFinance Agent Execution (if relevant)
    │       ├── Tavily Advanced Search
    │       ├── _should_decompose(sq, context)?
    │       │       │
    │       │       └── Yes → _generate_subquestions(sq, 2) → recursive research
    │       │
    │       └── _analyze_findings(sq, context, additional_info)
    │
    ▼
_synthesize_research(query, all_results) → Final Research Report
```

**Parameters:**
- `MAX_SEARCH_CALLS = 5` — Maximum external API calls per research session
- `MAX_DEPTH = 2` — Maximum recursion depth for sub-question decomposition
- `NUM_SUBQUESTIONS = 3` — Initial decomposition breadth

### 3. RAG Pipeline (`ingest.py` + `retrieval_grader.py`)

**Document Ingestion:**
- Monitors `data/` directory for new PDF files
- Extracts text via `PyPDFLoader`
- Chunks with `RecursiveCharacterTextSplitter` (chunk_size=1000, overlap=50)
- Generates embeddings via Ollama `nomic-embed-text`
- Stores in ChromaDB persistent vector database

**Retrieval & Grading:**
- Retriever configured with `k=3` document similarity search
- LLM-based relevance grading with JSON output parsing
- Binary scoring (0/1) for retrieval quality assessment
- Graceful fallback to web search when RAG context is insufficient

### 4. Enhanced Financial Tools (`enhanced_financial_tools.py`)

- **Indian Market Support:** BSE (.BO) and NSE (.NS) symbol resolution with automatic suffix detection
- **Global Market Support:** Direct YFinance integration for all major global exchanges
- **Currency Conversion:** Dynamic USD→INR exchange rate with automatic refresh via `USDINR=X` ticker
- **Market Indices:** Real-time data for 8 major global indices
- **Cryptocurrency:** Live crypto pricing with automatic `-USD` suffix handling

### 5. Alpha Vantage Service (`alpha_vantage_service.py`)

Premium-grade market data integration:
- Real-time stock quotes via `GLOBAL_QUOTE` endpoint
- Dynamic currency exchange rates via `CURRENCY_EXCHANGE_RATE`
- Indian market support with BSE/NS symbol resolution
- Automatic INR conversion for global equities
- Rate-limited API calls with configurable timeouts

### 6. Gemini Enhancement Service (`gemini_service.py`)

Post-processing intelligence layer:
- **Summarization:** Three styles — concise, detailed, bullet-point
- **Response Enhancement:** Financial response formatting with structured sections
- **Markdown Cleaning:** Emoji encoding fixes, formatting normalization
- **Fallback Summarization:** Smart sentence-boundary truncation when Gemini is unavailable

### 7. Enhanced Web Search (`enhanced_web_search.py`)

Multi-engine cascading search with deduplication:
```
Tavily (Primary) → Financial APIs → Google → Bing → DuckDuckGo → News APIs
```
- Automatic result deduplication by URL
- Financial query detection and specialized handling
- Configurable result limits and search depth

### 8. Live Opportunities Service (`live_opportunities.py`)

Real-time investment opportunity aggregation:
- Concurrent async data fetching via `ThreadPoolExecutor`
- 5-minute intelligent caching layer
- Market movers classification (gainers/losers)
- Stock search with symbol and name matching
- Fallback static data for high-availability guarantee

---

## Data Flow & Processing Pipeline

### Standard Query Processing Flow

```
1. User Input → Frontend (React Native)
2. Frontend → HTTP POST /query → Backend (FastAPI)
3. Query Classification → Route to appropriate handler
4. Handler Execution:
   a. Stock/Financial → API calls → Response formatting
   b. General → RAG Retrieval → Relevance Grading → Web Search → Synthesis
   c. Deep Research → Subquestion Generation → Recursive Research → Synthesis
5. Gemini Enhancement → Response Post-Processing
6. Markdown Stripping → Clean Plain Text Output
7. Backend → JSON Response → Frontend
8. Frontend → Rendered UI → User
```

### Deep Research Data Flow

```
1. Query Decomposition (LLM) → N subquestions
2. Per-Subquestion:
   a. Tool Relevance Assessment (LLM)
   b. YFinance Agent Execution (if applicable)
   c. Tavily Advanced Search
   d. Recursive Decomposition (if depth < MAX_DEPTH)
   e. Finding Analysis & Summarization (Reasoning LLM)
3. Cross-Subquestion Synthesis (Analysis LLM)
4. Final Report Generation (Markdown formatted)
```

---

## Installation & Setup

### Prerequisites

| Requirement | Version | Purpose |
|---|---|---|
| Python | ≥ 3.10 | Backend runtime |
| Node.js | ≥ 18.0 | Frontend runtime |
| npm | ≥ 9.0 | Package management |
| Ollama | Latest | Local LLM inference (optional) |
| Git | Latest | Version control |

### Option 1: Automated Startup (Recommended)

```powershell
# Clone the repository
git clone <repository-url>
cd WealthLens_Test

# Run the automated startup script
.\start_wealthlens.ps1
```

The automated script performs:
1. ✅ Port availability check (8000, 8081)
2. ✅ Python virtual environment detection/creation
3. ✅ Backend server launch in isolated terminal
4. ✅ Backend health check with retry loop (10 attempts)
5. ✅ Node.js dependency verification/installation
6. ✅ Frontend launch in isolated terminal
7. ✅ Automatic browser opening

### Option 2: Manual Setup

#### Backend Setup

```powershell
# Navigate to backend directory
cd Backend

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
copy .env.example .env
# Edit .env with your API keys (see Configuration Reference)

# (Optional) Install Ollama models for local inference
ollama pull llama3.2:latest
ollama pull nomic-embed-text

# Start the backend server
python run.py
# Server starts at http://localhost:8000
```

#### Frontend Setup

```powershell
# Open a new terminal
cd Frontend

# Install dependencies
npm install

# Start the development server
npm start
# Web: http://localhost:8081
# Mobile: Scan QR code with Expo Go
```

### Mobile Development Setup

```powershell
# For mobile-specific startup
.\start_wealthlens_mobile.ps1

# Or manually:
cd Frontend
npx expo start --android   # Android
npx expo start --ios        # iOS
npx expo start --web        # Web
```

---

## Configuration Reference

### Environment Variables (`.env`)

```env
# ═══════════════════════════════════════════
# REQUIRED API KEYS
# ═══════════════════════════════════════════

# Groq Cloud — Primary LLM inference
# Obtain from: https://console.groq.com/keys
GROQ_API_KEY=gsk_your_groq_api_key_here

# Tavily — Deep web search capabilities
# Obtain from: https://app.tavily.com/
TAVILY_API_KEY=tvly-your_tavily_api_key_here

# ═══════════════════════════════════════════
# OPTIONAL API KEYS (enhanced functionality)
# ═══════════════════════════════════════════

# Google Gemini — Response enhancement & summarization
# Obtain from: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Alpha Vantage — Premium stock data
# Obtain from: https://www.alphavantage.co/support/#api-key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here

# ═══════════════════════════════════════════
# SERVER CONFIGURATION
# ═══════════════════════════════════════════
HOST=0.0.0.0
PORT=8000
DEBUG=True

# ═══════════════════════════════════════════
# MODEL CONFIGURATION
# ═══════════════════════════════════════════
ENABLE_LOCAL=False
REMOTE_LLM=meta-llama/llama-4-scout-17b-16e-instruct
REASONING_LLM_REMOTE=meta-llama/llama-4-scout-17b-16e-instruct
TOOL_CALL_LLM_REMOTE=meta-llama/llama-4-scout-17b-16e-instruct

# ═══════════════════════════════════════════
# RESEARCH PARAMETERS
# ═══════════════════════════════════════════
MAX_SEARCH_CALLS=5
MAX_DEPTH=2
NUM_SUBQUESTIONS=3
```

### Model Configuration (`vars.py`)

| Parameter | Default | Description |
|---|---|---|
| `ENABLE_LOCAL` | `False` | Toggle local (Ollama) vs cloud (Groq) inference |
| `REMOTE_LLM` | `meta-llama/llama-4-scout-17b-16e-instruct` | Primary cloud LLM for synthesis |
| `REASONING_LLM_REMOTE` | Same as REMOTE_LLM | LLM for reasoning and decomposition |
| `TOOL_CALL_LLM_REMOTE` | Same as REMOTE_LLM | LLM for tool-calling tasks |
| `LOCAL_LLM` | `llama3.2:latest` | Local fallback model |
| `MAX_SEARCH_CALLS` | `5` | Max API calls per deep research session |
| `MAX_DEPTH` | `2` | Max recursion depth for sub-questions |
| `NUM_SUBQUESTIONS` | `3` | Initial sub-question count |

---

## API Reference

### Base URL
```
http://localhost:8000
```

### Endpoints

#### `GET /health`
Health check endpoint for connection testing and monitoring.

**Response:**
```json
{
  "status": "healthy",
  "message": "WealthLens Backend is running"
}
```

---

#### `POST /query`
Primary AI query endpoint. Processes natural language financial queries through the full AI pipeline.

**Request Body:**
```json
{
  "query": "What is the current price of Apple stock?",
  "deep_search": false
}
```

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `query` | `string` | Yes | — | Natural language query |
| `deep_search` | `boolean` | No | `false` | Enable recursive deep research mode |

**Response:**
```json
{
  "answer": {
    "answer": "Current Price: ₹14,234.50\nClosing Price: ₹14,198.00\nToday's High: ₹14,312.75\nToday's Low: ₹14,156.20",
    "deep_research_log": ""
  }
}
```

---

#### `GET /live-opportunities?limit=10`
Retrieve trending investment opportunities with real-time pricing.

**Query Parameters:**
| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | `integer` | `10` | Max number of results |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "current_price": 175.23,
      "change_percent": 2.15,
      "volume": 45678900,
      "sector": "Technology"
    }
  ],
  "count": 10,
  "last_updated": "2026-04-10T14:30:00"
}
```

---

#### `GET /market-movers`
Retrieve top market gainers and losers.

**Response:**
```json
{
  "success": true,
  "data": {
    "gainers": [...],
    "losers": [...],
    "last_updated": "2026-04-10T14:30:00"
  }
}
```

---

#### `GET /search-stocks?q=AAPL&limit=10`
Search for stocks by symbol or company name.

**Query Parameters:**
| Parameter | Type | Default | Description |
|---|---|---|---|
| `q` | `string` | Required | Search query |
| `limit` | `integer` | `10` | Max results |

---

#### `GET /stock/{symbol}`
Get detailed information for a specific stock.

**Path Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `symbol` | `string` | Stock ticker symbol (e.g., `AAPL`, `RELIANCE.NS`) |

---

#### `GET /test-markdown`
Development endpoint for testing markdown rendering capabilities.

---

## Project Structure

```
WealthLens_Test/
│
├── 📄 README.md                          # This document
├── 📄 .gitignore                         # Version control exclusions
├── 📄 start_wealthlens.ps1              # Automated startup (Web)
├── 📄 start_wealthlens_mobile.ps1       # Automated startup (Mobile)
├── 🖼️ workflow diagram.png              # System architecture diagram
│
├── 🔧 Backend/                           # Python AI Backend
│   ├── 📄 run.py                        # ⭐ Core application — FastAPI server,
│   │                                    #    query classification, processing pipeline
│   ├── 📄 simple_server.py              # Lightweight test/mock server
│   ├── 📄 deep_research.py             # ⭐ Recursive deep research engine
│   ├── 📄 gemini_service.py            # Google Gemini AI enhancement service
│   ├── 📄 alpha_vantage_service.py     # Alpha Vantage premium data service
│   ├── 📄 enhanced_financial_tools.py  # Multi-market financial data tools
│   ├── 📄 enhanced_web_search.py       # Multi-engine cascading web search
│   ├── 📄 live_opportunities.py        # Real-time investment opportunities
│   ├── 📄 ingest.py                    # PDF document ingestion pipeline
│   ├── 📄 retrieval_grader.py          # RAG retrieval quality grading
│   ├── 📄 summarizer.py               # LLM-based text summarization
│   ├── 📄 tools.py                     # LangChain custom tool definitions
│   ├── 📄 models.py                    # Ollama model initialization
│   ├── 📄 vars.py                      # Centralized configuration & LLM providers
│   ├── 📄 requirements.txt            # Python dependencies
│   ├── 📄 .env.example                # Environment variable template
│   ├── 📄 .python-version             # Python version constraint
│   ├── 📁 data/                        # PDF document store for RAG ingestion
│   ├── 📁 db/                          # ChromaDB persistent storage
│   ├── 📁 utils/                       # Utility modules
│   │   ├── 📄 test.py                  # FAISS indexing & retrieval utilities
│   │   └── 📁 faiss_index_pdfs/        # FAISS index storage
│   └── 📁 venv/                        # Python virtual environment
│
├── 🎨 Frontend/                          # React Native (Expo) Frontend
│   ├── 📄 package.json                 # Node.js dependencies & scripts
│   ├── 📄 app.json                     # Expo application configuration
│   ├── 📄 tsconfig.json                # TypeScript configuration
│   ├── 📄 tailwind.config.js           # TailwindCSS / NativeWind config
│   ├── 📄 babel.config.js             # Babel transpilation config
│   ├── 📄 metro.config.js             # Metro bundler configuration
│   ├── 📄 global.css                   # Global stylesheet
│   │
│   ├── 📁 app/                         # Expo Router — File-based routing
│   │   ├── 📄 _layout.tsx             # Root layout with providers
│   │   ├── 📄 index.tsx               # App entry point (redirect)
│   │   ├── 📄 landing.tsx             # Marketing landing page
│   │   ├── 📄 home.tsx                # Home dashboard
│   │   │
│   │   ├── 📁 (auth)/                 # Authentication routes
│   │   │   ├── 📄 login.tsx           # Login screen
│   │   │   └── 📄 signup.tsx          # Registration screen
│   │   │
│   │   ├── 📁 (main)/                 # Main application routes (sidebar nav)
│   │   │   ├── 📄 dashboard.tsx       # Financial dashboard
│   │   │   ├── 📄 ai-finance.tsx      # AI financial analysis page
│   │   │   ├── 📄 investments.tsx     # Investment portfolio
│   │   │   ├── 📄 expenses.tsx        # Expense tracking
│   │   │   ├── 📄 goals.tsx           # Financial goals
│   │   │   ├── 📄 transactions.tsx    # Transaction history
│   │   │   ├── 📄 learning-hub.tsx    # Educational content
│   │   │   └── 📄 currency-converter.tsx # Currency conversion
│   │   │
│   │   ├── 📁 (tabs)/                 # Bottom tab navigation (mobile)
│   │   │   ├── 📄 index.tsx           # Tab home / dashboard
│   │   │   ├── 📄 investments.tsx     # Investments tab
│   │   │   ├── 📄 expenses.tsx        # Expenses tab
│   │   │   ├── 📄 goals.tsx           # Goals tab
│   │   │   └── 📄 transactions.tsx    # Transactions tab
│   │   │
│   │   └── 📁 (stack)/                # Stack navigation screens
│   │       ├── 📄 chatbot.tsx         # Full-screen AI chatbot
│   │       ├── 📄 ai-finance.tsx      # AI analysis details
│   │       ├── 📄 currency-converter.tsx # Currency tool
│   │       ├── 📄 learning-hub.tsx    # Learning content
│   │       ├── 📄 profile.tsx         # User profile
│   │       ├── 📄 settings.tsx        # App settings
│   │       └── 📄 about.tsx           # About page
│   │
│   ├── 📁 components/                  # Reusable UI components
│   │   ├── 📄 Header.tsx              # App header with navigation
│   │   ├── 📄 Sidebar.tsx             # Desktop sidebar navigation
│   │   ├── 📄 FloatingChatButton.tsx  # Persistent AI chat widget
│   │   ├── 📄 BankAccountManager.tsx  # Bank account linking UI
│   │   ├── 📄 RealTimeStatus.tsx      # Backend connection status
│   │   ├── 📄 PricingSection.tsx      # Pricing/plans display
│   │   ├── 📄 ProfileDropdown.tsx     # User profile menu
│   │   ├── 📄 SettingsHeader.tsx      # Settings page header
│   │   ├── 📄 LearningHub.tsx         # Learning hub widget
│   │   ├── 📄 Button.tsx              # Shared button component
│   │   ├── 📄 Card.tsx                # Shared card component
│   │   ├── 📄 Input.tsx               # Shared input component
│   │   └── 📄 Skeleton.tsx            # Loading skeleton component
│   │
│   ├── 📁 services/                    # API service layer
│   │   ├── 📄 chatbotApi.ts           # AI chatbot API client
│   │   ├── 📄 stockDataService.ts     # Stock data fetching
│   │   ├── 📄 exchangeRateService.ts  # Currency exchange rates
│   │   └── 📄 learningContentService.ts # Educational content
│   │
│   ├── 📁 contexts/                    # React context providers
│   │   ├── 📄 AuthContext.tsx         # Authentication state
│   │   ├── 📄 DataContext.tsx         # Global data state
│   │   └── 📄 ThemeContext.tsx        # Theme management
│   │
│   ├── 📁 hooks/                       # Custom React hooks
│   │   ├── 📄 useChatHistory.ts       # Chat persistence
│   │   ├── 📄 useResponsive.ts        # Responsive layout
│   │   └── 📄 useFrameworkReady.ts    # App initialization
│   │
│   ├── 📁 config/                      # Configuration
│   │   └── 📄 api.ts                  # API URL resolution & retry logic
│   │
│   ├── 📁 types/                       # TypeScript type definitions
│   │   └── 📄 index.ts               # Shared type exports
│   │
│   ├── 📁 assets/                      # Static assets (images, fonts)
│   └── 📁 data/                        # Local data files
│
└── 📁 db/                               # Root-level database storage
    └── 📁 chroma_langchain_db/          # ChromaDB persistent collections
```

---

## Security Considerations

### API Key Management
- All API keys are stored in `.env` files, excluded from version control via `.gitignore`
- `.env.example` template provided without actual credentials
- Environment variables loaded via `python-dotenv` at runtime

### Network Security
- CORS middleware configured with explicit origin whitelisting
- Development mode allows all origins (`*`); production should restrict to specific domains
- API request timeouts configured to prevent resource exhaustion
- AbortController-based request cancellation in frontend

### Data Protection
- Conversation memory stored in-memory (session-scoped, non-persistent)
- No personally identifiable information (PII) transmitted to external LLM APIs beyond query content
- Vector store indices are locally persisted and excluded from version control
- Database files (`*.db`, `*.sqlite`) excluded from repository

### Recommended Production Hardening
- [ ] Replace wildcard CORS with explicit production domains
- [ ] Implement API authentication (JWT/OAuth2)
- [ ] Enable HTTPS with TLS certificates
- [ ] Add request rate limiting
- [ ] Implement input sanitization and validation
- [ ] Migrate conversation memory to persistent store (Redis/PostgreSQL)
- [ ] Enable comprehensive audit logging

---

## Performance & Scalability

### Current Performance Characteristics

| Metric | Standard Query | Deep Research |
|---|---|---|
| **Response Latency** | 2–8 seconds | 15–60 seconds |
| **Max Concurrent Requests** | Limited by LLM API rate limits | Limited by search API quotas |
| **RAG Retrieval** | Sub-second (k=3) | N/A |
| **Stock Data Fetch** | 1–3 seconds | N/A |
| **Cache Duration** | 5 minutes (stock data) | N/A |

### Scalability Design Decisions

1. **Asynchronous API Layer** — FastAPI's async endpoints enable non-blocking I/O
2. **Concurrent Data Fetching** — `ThreadPoolExecutor` for parallel stock data retrieval
3. **Intelligent Caching** — 5-minute TTL cache for live market data
4. **Graceful Degradation** — Fallback data and responses when external APIs are unavailable
5. **Configurable Research Depth** — `MAX_DEPTH` and `MAX_SEARCH_CALLS` prevent runaway API consumption

---

## Testing & Quality Assurance

### Backend Verification

```powershell
# Health check
curl http://localhost:8000/health

# Test query (PowerShell)
Invoke-RestMethod -Uri "http://localhost:8000/query" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"query":"What is the current price of Apple stock?","deep_search":false}'

# Test deep research
Invoke-RestMethod -Uri "http://localhost:8000/query" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"query":"Compare Tesla and NIO investment potential","deep_search":true}'

# Test live opportunities
Invoke-RestMethod -Uri "http://localhost:8000/live-opportunities?limit=5"

# Test market movers
Invoke-RestMethod -Uri "http://localhost:8000/market-movers"

# Test stock search
Invoke-RestMethod -Uri "http://localhost:8000/search-stocks?q=AAPL"

# Test individual stock
Invoke-RestMethod -Uri "http://localhost:8000/stock/AAPL"
```

### Frontend-Backend Integration

1. Open the web application at `http://localhost:8081`
2. Navigate to the AI Chat section
3. Test standard query: *"What is the current price of Reliance stock?"*
4. Test deep research: Enable deep research toggle and query: *"Should I invest in NVIDIA?"*
5. Verify real-time status indicator shows backend connection
6. Test currency converter with live exchange rates
7. Verify investment opportunities page loads with live data

### Success Indicators

| Indicator | Status | Validation |
|---|---|---|
| Backend Health | ✅ | `/health` returns `{"status": "healthy"}` |
| Frontend Loads | ✅ | Web app renders at `http://localhost:8081` |
| Chat Response | ✅ | AI responds to queries with formatted text |
| Stock Data | ✅ | Live prices returned in INR |
| Deep Research | ✅ | Multi-step research log generated |
| No CORS Errors | ✅ | Browser console shows no CORS violations |

---

## Deployment

### Development Environment

```powershell
# Backend
cd Backend && .\venv\Scripts\Activate.ps1 && python run.py

# Frontend (separate terminal)
cd Frontend && npm start
```

### Production Considerations

| Component | Development | Production Recommendation |
|---|---|---|
| **Backend Server** | `uvicorn` with `reload=True` | `gunicorn` with `uvicorn` workers behind Nginx |
| **Frontend** | Expo dev server | `expo export --platform web` → static hosting (Vercel/Netlify) |
| **Mobile** | Expo Go | EAS Build → App Store / Google Play |
| **Database** | Local ChromaDB/FAISS | Managed vector DB (Pinecone/Weaviate) |
| **LLM Inference** | Groq Cloud API | Dedicated GPU instances or managed endpoints |
| **CORS** | Allow all (`*`) | Whitelist production domains only |
| **Secrets** | `.env` file | Cloud-managed secrets (AWS Secrets Manager, etc.) |

---

## Roadmap

### Phase 1 — Current Release (v1.0.0)
- [x] AI conversational financial advisor
- [x] Deep research engine with recursive decomposition
- [x] RAG-powered PDF knowledge base
- [x] Multi-source real-time market data
- [x] Cross-platform mobile & web application
- [x] Live investment opportunities
- [x] Currency converter
- [x] Financial learning hub

### Phase 2 — Planned Enhancements
- [ ] Streaming response output (Server-Sent Events / WebSocket)
- [ ] User portfolio tracking with persistent storage
- [ ] Technical analysis charting (candlestick, moving averages)
- [ ] Push notifications for price alerts
- [ ] Multi-language support (Hindi, Spanish, Mandarin)
- [ ] Voice-based query input
- [ ] OAuth2 authentication (Google, Apple Sign-In)

### Phase 3 — Enterprise Features
- [ ] Multi-tenant architecture
- [ ] Role-based access control (RBAC)
- [ ] Comprehensive audit logging
- [ ] API rate limiting and usage analytics
- [ ] Custom knowledge base per organization
- [ ] White-label deployment support
- [ ] Compliance reporting (SEC, SEBI)

---

## Intellectual Property Notice

> **CONFIDENTIAL & PROPRIETARY**
>
> This software, including all source code, documentation, architecture designs, algorithms, and associated intellectual property, is the exclusive property of the WealthLens development team.
>
> **Novel inventions and proprietary methods include but are not limited to:**
>
> 1. **Recursive Deep Research Orchestration** — A multi-depth query decomposition and synthesis system for financial domain research (see `deep_research.py`)
> 2. **Hybrid RAG + Real-Time Market Data Pipeline** — An intelligent context-switching system that dynamically selects between document-grounded and real-time data sources based on LLM-driven relevance assessment (see `run.py`)
> 3. **Multi-LLM Purpose-Optimized Orchestration Architecture** — A framework for routing queries through purpose-specific LLM instances (reasoning, synthesis, tool-calling) with automatic cloud/local fallback (see `vars.py`)
> 4. **Cascading Multi-Engine Web Search with Financial Specialization** — A resilient search system with automatic failover across multiple search providers with domain-specific optimization (see `enhanced_web_search.py`)
> 5. **Automated Query Classification & Intelligent Routing** — A multi-tier query understanding system that routes financial queries to specialized processing pipelines (see `run.py`)
>
> Unauthorized copying, distribution, modification, or use of this software or any portion thereof is strictly prohibited and may be subject to civil and criminal penalties.

---

## License

This project is proprietary software. All rights reserved.

Unauthorized reproduction, distribution, or modification is strictly prohibited without explicit written permission from the copyright holder.

---

## Contributors

| Role | Contribution |
|---|---|
| **Lead Developer** | Full-stack development, AI pipeline architecture, system integration |
| **AI/ML Engineer** | Deep research engine, RAG pipeline, LLM orchestration |
| **Frontend Developer** | React Native UI, cross-platform optimization, responsive design |

---

<p align="center">
  <strong>WealthLens</strong> — Intelligent Finance, Powered by AI
</p>

<p align="center">
  <sub>Version 1.0.0 • Built with ❤️ and advanced AI</sub>
</p>
