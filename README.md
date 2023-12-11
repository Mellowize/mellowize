# Payload HTMX Stack

## Overview

Payload HTMX Stack is a proof of concept for a Payload CMS Website using HTMX and Server Side JSX. This project aims to provide a simplified stack for web development, leveraging the power of Payload CMS, HTMX, and other technologies.

## Description

This project is currently in a very early stage of development. Please be aware of any existing limitations.

## Driving Principles

- **Simplicity:** The goal is to create a stack that is easy to use and understand, avoiding black magic or special syntax.
- **Developer Experience:** In the pursuit of simplicity, I wanted to make sure that the developer experience was not compromised. One of the big hurdles was making sure that templating would have auto complete and be type safe. Most major template engines for express do not support this. I adopted JSX and wrote my own templating engine based on React Dom Server Api to achieve this.

## Stack

- MongoDB
- NodeJS
- Express
- PayloadCMS
- HTMX

## Future plans

- Move the TSX rendering to a separate package
  - Make the TSX rendering framework agnostic
- Add a CLI to generate new projects
  - PayloadCMS (Mongo, Express)
  - HTMX
  - Node
  - TSX Templating Engine
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
