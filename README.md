# notion-notebooklm-sync

[English](./docs/lang/en.md) | 日本語

## 概要

Notion のデータベースから「公開」フラグのついたページを自動的に取得し、Google ドキュメント形式に変換して Google ドライブへ保存するシステムです。

これにより、Notion 上の情報を NotebookLM などの外部 AI ツールで活用しやすくすることを目的としています。

本プロジェクトは、以下の記事を元に実装されています。

- [【写真説明付き】Notionを最強の社内マニュアルに！Notebook LMとGASで半自動AIチャットボットを構築する方法｜だるま](https://note.com/lovely_bobcat555/n/n58bf55000dbc?utm_source=chatgpt.com#f8e4af58-277b-488c-8c32-f1ed7b9657ff)

以下は個人用のドキュメントです。

- [Notion - Notebook LM と GAS](https://www.notion.so/Notebook-LM-GAS-2fae35201110806eb7b1c1a45ca8775f)

## 連携手順

### リポジトリをクローン

```bash
git clone repository-name
cd repository-name
```

### ファイルやリンクの準備

1. Googleドライブ
   - Notionドキュメントの出力先とGAS格納用のフォルダを作る
2. GASスクリプト
   - 作成したドライブにスタンドアローンのスクリプトを作成
3. Notionインテグレーション
   - 内部インテグレーションシークレットの取得
4. 出力元になるNotionのデータベース
   - 必要に応じてNotionインテグレーションに対象DBを紐づける
5. NotebookLMの環境の作成

#### 必要な定数

- `NOTION_API_KEY`: 内部インテグレーションシークレット
- `GOOGLE_DRIVE_FOLDER_ID`: GoogleドライブのフォルダID
- `NOTION_DATABASE_IDS`: 出力元になるNotionのデータベースID
- `TARGET_NOTION_COLUMN_NAME`: 出力対象を検知するカラム名

### NOTION_DATABASE_IDSの設定

1. `VARIABLE.sample.js`をコピーし、ファイル名を`VARIABLE.js`にする
2. `NOTION_DATABASE_IDS`定数に、出力元になるNotionのデータベースIDを追加
3. `TARGET_NOTION_COLUMN_NAME`定数に出力対象を検知するカラム名に変更

### GASの紐づけ

```bash
# 既存プロジェクトをローカルにクローン
clasp clone <SCRIPT_ID>

# 上書きで反映
clasp push
```

### 実行

1. `_main.js`の`syncNotionToDrive`を実行
2. 出力先フォルダにNotionドキュメントが生成されることを確認

### NotebookLMと連携

作成した環境のソースにNotionドキュメントを紐づける

## トラブルシューティング

### GASクローン時のエラー

```bash
# エラー
Project file (xxx/.clasp.json) already exists.
```

- `clasp clone xxx`を実行した時に発生するエラー
- 原因は`.clasp.json`が既に存在するため。`clasp clone`は未紐づけのからディスクに対してのみ実行可能であるため、既にあるとエラーになる
- `.clasp.json`を削除してから再実行することで解決する
