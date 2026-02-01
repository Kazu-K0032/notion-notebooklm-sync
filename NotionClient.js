/**
 * @fileoverview Notion API との通信を担当するクライアントオブジェクト
 */

/**
 * Notion API 通信クライアント
 */
const NotionClient = {
  /**
   * Notion データベースに対してクエリ（フィルタリング）を実行する
   * @param {string} databaseId - データベース ID
   * @param {Object} filter - フィルタリング条件のオブジェクト
   * @returns {Object} API レスポンス（JSON）
   */
  queryDatabase(databaseId, filter) {
    const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
    const payload = {
      filter: filter
    };
    const options = {
      method: 'post',
      headers: Config.NOTION_HEADERS,
      payload: JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  },

  /**
   * 指定したブロックの子要素（階層構造）を取得する
   * @param {string} blockId - ブロック（またはページ）の ID
   * @param {string|null} [cursor=null] - ページネーション用のカーソル
   * @returns {Object} API レスポンス（JSON）
   */
  fetchBlockChildren(blockId, cursor = null) {
    let url = `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`;
    if (cursor) {
      url += `&start_cursor=${cursor}`;
    }

    const options = {
      method: 'get',
      headers: Config.NOTION_HEADERS
    };

    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  }
};
