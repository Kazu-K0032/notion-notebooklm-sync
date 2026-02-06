/**
 * @fileoverview Notion のコンテンツを Google ドライブに同期するメインスクリプト
 */

/**
 * メイン実行関数
 * Notion データベースを検索し、更新されたページを Google ドキュメントとして保存する
 */
function syncNotionToDrive() {
  const folder = DriveRepository.getFolder(Config.GOOGLE_DRIVE_FOLDER_ID);

  // DB一覧の存在確認
  if (typeof NOTION_DATABASE_IDS === "undefined" || !Array.isArray(NOTION_DATABASE_IDS)) {
    throw new Error(
      "DATABASES.js が見つからないか、NOTION_DATABASE_IDS が配列として定義されていません。DATABASES.sample.js を DATABASES.js にコピーして設定してください。"
    );
  }

  // DBごとに同期
  NOTION_DATABASE_IDS.forEach((databaseId, index) => {
    Logger.log(`DB同期開始 [${index}]: ${databaseId}`);

    // 同期対象のページ一覧を取得
    const pages = fetchSyncPages(databaseId);
    Logger.log(`DB [${index}] ページ数: ${pages.length}`);

    // 各ページを同期
    pages.forEach(page => {
      try {
        syncPage(page, folder);
      } catch (e) {
        Logger.log(`エラー: DB [${index}] ページ "${page.id}" の同期に失敗しました。 ${e.toString()}`);
      }
    });

    Logger.log(`DB同期完了 [${index}]: ${databaseId}`);
  });
}

/**
 * Notion データベースから「公開」フラグが立っているページをすべて取得する
 * @returns {Object[]} Notion ページオブジェクトの配列
 */
function fetchSyncPages(databaseId) {
  const dbFilter = {
    "property": "公開",
    "checkbox": {
      "equals": true
    }
  };
  const response = NotionClient.queryDatabase(databaseId, dbFilter);
  return response.results;
}

/**
 * Notion の単一ページを Google ドキュメントに同期する
 * @param {Object} page - Notion ページオブジェクト
 * @param {GoogleAppsScript.Drive.Folder} folder - 保存先の Google ドライブフォルダ
 */
function syncPage(page, folder) {
  const pageId = page.id;
  const pageUrl = page.url;
  const pageTitle = getPageTitle(page);

  // コンテンツの生成
  const header = `■ このドキュメントの原本（画像や最新レイアウトはこちらで確認できます）\n${pageUrl}\n\n---\n\n`;
  const body = DocFormatter.renderPage(pageId);
  const fullContent = header + body;

  // 保存・更新（同じ名前のファイルがあれば更新、なければ新規作成）
  const files = DriveRepository.getFilesByName(folder, pageTitle);
  if (files.hasNext()) {
    const existingFile = files.next();
    DriveRepository.updateDocument(existingFile.getId(), fullContent);
    Logger.log(`更新完了: "${pageTitle}"`);
  } else {
    DriveRepository.createDocument(folder, pageTitle, fullContent);
    Logger.log(`新規作成: "${pageTitle}"`);
  }
}

/**
 * Notion ページオブジェクトからタイトル文字列を抽出する
 * @param {Object} page - Notion ページオブジェクト
 * @returns {string} ページタイトル（タイトルがない場合は "無題のページ"）
 */
function getPageTitle(page) {
  const titleProperty = Object.values(page.properties).find(prop => prop.type === "title");
  if (titleProperty && titleProperty.title && titleProperty.title.length > 0) {
    return titleProperty.title.map(t => t.plain_text).join("");
  }
  return "無題のページ";
}
