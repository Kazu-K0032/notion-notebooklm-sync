/**
 * @fileoverview Google ドライブおよびドキュメントの操作を担当するリポジトリ
 */

/**
 * Google サービスへのデータアクセス担当
 */
const DriveRepository = {
  /**
   * 指定された ID のフォルダを取得する
   * @param {string} folderId - Google ドライブのフォルダ ID
   * @returns {GoogleAppsScript.Drive.Folder} フォルダオブジェクト
   */
  getFolder(folderId) {
    return DriveApp.getFolderById(folderId);
  },

  /**
   * フォルダ内のファイルを名前で検索する
   * @param {GoogleAppsScript.Drive.Folder} folder - 検索対象のフォルダ
   * @param {string} name - ファイル名
   * @returns {GoogleAppsScript.Drive.FileIterator} ファイルイテレータ
   */
  getFilesByName(folder, name) {
    return folder.getFilesByName(name);
  },

  /**
   * 指定された ID のドキュメントの内容を全文書き換える
   * @param {string} fileId - Google ドキュメントのファイル ID
   * @param {string} content - 書き換える内容
   * @returns {GoogleAppsScript.Document.Document} ドキュメントオブジェクト
   */
  updateDocument(fileId, content) {
    const doc = DocumentApp.openById(fileId);
    doc.getBody().setText(content);
    return doc;
  },

  /**
   * 新しいドキュメントを作成し、指定のフォルダに移動して内容を設定する
   * @param {GoogleAppsScript.Drive.Folder} folder - 保存先のフォルダ
   * @param {string} title - ドキュメントのタイトル
   * @param {string} content - ドキュメントの内容
   * @returns {GoogleAppsScript.Document.Document} 作成されたドキュメントオブジェクト
   */
  createDocument(folder, title, content) {
    const newDoc = DocumentApp.create(title);
    newDoc.getBody().setText(content);
    newDoc.saveAndClose();

    const file = DriveApp.getFileById(newDoc.getId());
    file.moveTo(folder);
    return newDoc;
  }
};
