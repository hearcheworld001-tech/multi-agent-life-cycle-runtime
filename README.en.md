# Multi-Agent Life Cycle Runtime

Design documentation for a runtime that supports long-lived agents.

This project is not a one-shot task orchestration framework. It explores how multiple agents can remain active in a controlled environment, observe the world, retain experience, recover from failures, collaborate with other agents, and evolve within verifiable boundaries.

> **The Engine provides the life environment; the Agent produces the life behavior.**

## Project status

The repository is currently in the **architecture design phase**.

- Done: design documents covering the Agent/Engine boundary, lifecycle, memory, recovery, evolution, collaboration, and a VitePress documentation site.
- Not done: the runtime implementation, persistence adapters, production messaging protocols, production security model, and complete test suite.
- Documentation convention: “must” means a design constraint, “should” means a recommendation, and “may” means an option. “Current” refers only to facts that already exist in the repository.

The names of interfaces, states, and modules in the documents are design candidates until an implementation and tests are committed.

## Reading guide

The full, maintained documentation is currently written in Chinese:

- [Overall overview](docs/guide/overview.md)
- [Agent lifecycle](docs/guide/lifecycle.md)
- [Runtime architecture](docs/guide/runtime.md)
- [Memory architecture](docs/guide/memory.md)
- [Recovery and evolution](docs/guide/recovery-evolution.md)
- [Multi-agent collaboration](docs/guide/society.md)
- [Core contracts](docs/guide/contracts.md)
- [Roadmap](docs/guide/roadmap.md)
- [Operations](docs/guide/operations.md)
- [Glossary](docs/guide/glossary.md)
- [FAQ](docs/guide/faq.md)

## Local preview

```bash
npm install
npm run docs:dev
```

Build the static site with:

```bash
npm run docs:build
```

Cloudflare Pages uses `npm run docs:build` and publishes `docs/.vitepress/dist`.
