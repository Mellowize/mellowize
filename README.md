# Mellowize

## Overview

The name, Mellowize, comes from the word "Mellow" (meaning pleasantly smooth or soft; free from harshness) and the suffix "-ize" (meaning "to make or become"). Mellowize is a proof of concept for a Payload CMS Website using HTMX and Server Side JSX. This project aims to provide a simplified stack for web development, while maintaining the developer experience and user experience of modern web applications.

## Description

This project is currently in a very early stage of development. Please be aware of any existing limitations.

## Driving Principles

- **Simplicity:** The goal is to create a stack that is easy to use and understand, avoiding black magic or special syntax.
- **Developer Experience:** In the pursuit of simplicity, I wanted to make sure that the developer experience was not compromised. One of the big hurdles was making sure that templating would have auto complete and be type safe. Most major template engines for express do not support this. I adopted JSX and wrote my own templating engine based on React Dom Server Api to achieve this.
- **User Experience:** SPA application have provided a great user experience, but they have also introduced a lot of complexity to modern web development. This stack aims to provide a similar user experience, but without the problems that SPA applications have introduced. This is achieved by using HTMX to provide a SPA like experience, while still using server side rendering to provide a fast initial load time, and to provide a great SEO experience.

## Stack
- PayloadCMS (Mongo, Express)
- TSX Templating Engine + HTMX
- Node

## Future plans

- Move the TSX rendering to a separate package
  - Make the TSX rendering framework agnostic
- Add a CLI to generate new projects
- Add Page content type (Content type kind of list a "Post", but without an index page, its just collection of content where each one renders at a unique slug/route).
- Add Payload plugin for specifying page collection, and the posts collections. (so that the server knows which collections to render as pages, and which collection to render post index and post singles. Also, so you can add custom collections that don't render on the frontend automatically).
- Include options on CLI for different styling frameworks
  - TailwindCSS
  - Bootstrap
  - Bulma
- Draft Previews
- Live Previews
- Write Documentation
  - Introduction
  - Quick Start
  - Project Structure
  - Templating
    - Pages
      - Fetching Data
      - Rendering Data
    - Components
  - Routing
    - Default Routes
    - Modifying Routes
  - PayloadCMS
    - Authentication
  - HTMX
