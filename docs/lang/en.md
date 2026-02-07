# notion-notebooklm-sync

[日本語](../../README.md) | English

## Overview

This system automatically retrieves pages with a "Published" flag from Notion databases, converts them into Google Docs format, and saves them to Google Drive.

The goal is to make it easier to utilize information from Notion with external AI tools like NotebookLM.

This project is implemented based on the following article:

- [【Photo Explanation Included】Turn Notion into the ultimate internal manual! How to build a semi-automatic AI chatbot with NotebookLM and GAS | Daruma](https://note.com/lovely_bobcat555/n/n58bf55000dbc?utm_source=chatgpt.com#f8e4af58-277b-488c-8c32-f1ed7b9657ff)

The following is a personal document:

- [Notion - NotebookLM and GAS](https://www.notion.so/Notebook-LM-GAS-2fae35201110806eb7b1c1a45ca8775f)

## Integration Steps

### Clone the repository

```bash
git clone repository-name
cd repository-name
```

### Prepare files and links

1. Google Drive
   - Create a folder for Notion document output and for storing GAS.
2. GAS script
   - Create a standalone script in the Drive folder you created.
3. Notion integration
   - Get the internal integration secret.
4. Source Notion database
   - Link the target database to the Notion integration as needed.
5. NotebookLM environment

#### Required constants

- `NOTION_API_KEY`: Internal integration secret
- `GOOGLE_DRIVE_FOLDER_ID`: Google Drive folder ID
- `NOTION_DATABASE_IDS`: Source Notion database ID(s)
- `TARGET_NOTION_COLUMN_NAME`: Column name to detect output targets

### Configure `NOTION_DATABASE_IDS`

1. Copy `VARIABLE.sample.js` and rename it to `VARIABLE.js`.
2. Add the source Notion database IDs to the `NOTION_DATABASE_IDS` constant.
3. Update the `TARGET_NOTION_COLUMN_NAME` constant to the column name used to detect output targets.

### Link to GAS

```bash
# Clone an existing project locally
clasp clone <SCRIPT_ID>

# Push to overwrite
clasp push
```

### Run

1. Run `syncNotionToDrive` in `_main.js`.
2. Confirm that Notion documents are generated in the output folder.

### Connect to NotebookLM

Attach the Notion documents to the sources in the environment you created.

## Troubleshooting

### Error when cloning GAS

```bash
# Error
Project file (xxx/.clasp.json) already exists.
```

- This occurs when you run `clasp clone xxx`.
- The cause is that `.clasp.json` already exists. `clasp clone` can only be executed against an unlinked disk.
- Delete `.clasp.json` and run the command again.
