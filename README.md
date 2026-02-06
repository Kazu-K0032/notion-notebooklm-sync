# notion-notebooklm-sync

[English](./docs/lang/en.md) | 日本語

## 概要

Notion のデータベースから「公開」フラグのついたページを自動的に取得し、Google ドキュメント形式に変換して Google ドライブへ保存するシステムです。

これにより、Notion 上の情報を NotebookLM などの外部 AI ツールで活用しやすくすることを目的としています。

本プロジェクトは、以下の記事を元に実装されています。

- [【写真説明付き】Notionを最強の社内マニュアルに！Notebook LMとGASで半自動AIチャットボットを構築する方法｜だるま](https://note.com/lovely_bobcat555/n/n58bf55000dbc?utm_source=chatgpt.com#f8e4af58-277b-488c-8c32-f1ed7b9657ff)

また、Notion にまとめた詳細な内容は以下のリンクを参照してください。

- [Notion - Notebook LM と GAS](https://www.notion.so/Notebook-LM-GAS-2fae35201110806eb7b1c1a45ca8775f)

## 開発手順

1. リポジトリをクローンする
2. [clasp と GitHub の連携](https://www.notion.so/GAS-2ffe3520111080c2bc01f7f5249c85ff) を参考に設定を行う

## DB設定

複数DB同期のために、同期対象の Notion Database ID を `DATABASES.js` で指定します。

1. `DATABASES.sample.js` を `DATABASES.js` にコピーする
2. `DATABASES.js` 内の `NOTION_DATABASE_IDS` に、同期したい Database ID を配列で設定する

`DATABASES.js` は `.gitignore` によりリポジトリへコミットされません。
