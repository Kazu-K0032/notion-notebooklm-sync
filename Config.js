/**
 * @fileoverview システム全体の設定値・定数を管理するオブジェクト
 */

/**
 * 設定値・定数管理
 */
const Config = {
  /**
   * Notion API キー
   * @type {string}
   */
  get NOTION_API_KEY() {
    return PropertiesService.getScriptProperties().getProperty("NOTION_API_KEY");
  },

  /**
   * 同期先の Google ドライブフォルダ ID
   * @type {string}
   */
  get GOOGLE_DRIVE_FOLDER_ID() {
    return PropertiesService.getScriptProperties().getProperty("GOOGLE_DRIVE_FOLDER_ID");
  },

  /**
   * Notion API のバージョン
   * @type {string}
   */
  NOTION_VERSION: "2022-06-28",

  /**
   * Notion API 通信用の共通ヘッダー
   * @type {Object<string, string>}
   */
  get NOTION_HEADERS() {
    return {
      "Authorization": `Bearer ${this.NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": this.NOTION_VERSION
    };
  }
};
