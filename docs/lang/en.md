# notion-notebooklm-sync

[日本語](../../README.md) | English

## Overview

This system automatically retrieves pages with a "Published" (公開) flag from Notion databases, converts them into Google Docs format, and saves them to Google Drive.

The goal is to make it easier to utilize information from Notion with external AI tools like NotebookLM.

This project is implemented based on the following article (Japanese):

- [【Photo Explanation Included】Turn Notion into the ultimate internal manual! How to build a semi-automatic AI chatbot with NotebookLM and GAS | Daruma](https://note.com/lovely_bobcat555/n/n58bf55000dbc?utm_source=chatgpt.com#f8e4af58-277b-488c-8c32-f1ed7b9657ff)

For detailed information organized in Notion, please refer to the following link:

- [Notion - NotebookLM and GAS](https://www.notion.so/Notebook-LM-GAS-2fae35201110806eb7b1c1a45ca8775f)

## Development Procedures

1. Clone the repository.
2. Follow the settings in [clasp and GitHub integration](https://www.notion.so/GAS-2ffe3520111080c2bc01f7f5249c85ff).

## DB Setup

To sync multiple databases, specify the target Notion Database IDs in `DATABASES.js`.

1. Copy `DATABASES.sample.js` to `DATABASES.js`.
2. In `DATABASES.js`, set `NOTION_DATABASE_IDS` as an array of Database IDs to sync.

`DATABASES.js` is ignored by `.gitignore` and should not be committed.
