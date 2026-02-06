/**
 * @fileoverview Notion のブロック構造をテキスト（Markdownライク）に変換するフォーマッター
 */

/**
 * Notion コンテンツのテキスト変換担当
 */
const DocFormatter = {
  /**
   * ページ全体のコンテンツを再帰的に取得し、1つのテキストとして結合する
   * @param {string} pageId - Notion ページの ID
   * @returns {string} フォーマット済みのテキストコンテンツ
   */
  renderPage(pageId) {
    let content = "";
    content += this.renderBlocksRecursively(pageId, 0);
    return content;
  },

  /**
   * ブロックの子要素を再帰的に取得し、階層に応じたテキストを生成する
   * @param {string} blockId - 親ブロックの ID
   * @param {number} depth - 現在の階層の深さ（インデント用）
   * @returns {string} 結合されたテキストコンテンツ
   */
  renderBlocksRecursively(blockId, depth) {
    let content = "";
    let nextCursor = null;
    const indent = "  ".repeat(depth);

    try {
      do {
        const data = NotionClient.fetchBlockChildren(blockId, nextCursor);

        data.results.forEach(block => {
          content += this.renderBlock(block, indent);

          // 子要素（has_children）がある場合はさらに深く再帰
          if (block.has_children) {
            content += this.renderBlocksRecursively(block.id, depth + 1);
          }
        });

        nextCursor = data.next_cursor;
      } while (nextCursor);
    } catch (e) {
      Logger.log(`エラー: ブロック取得失敗 (${blockId}): ${e.toString()}`);
      content += `${indent}[取得エラー]\n`;
    }

    return content;
  },

  /**
   * 単一の Notion ブロックをそのタイプに応じたテキスト表現に変換する
   * @param {Object} block - Notion ブロックオブジェクト
   * @param {string} indent - インデント用文字列
   * @returns {string} ブロックのテキスト表現
   */
  renderBlock(block, indent) {
    const type = block.type;
    const text = this.extractPlainText(block);

    /** @type {Object<string, function(string): string>} */
    const renderers = {
      "heading_1": (t) => `\n# ${t}\n\n`,
      "heading_2": (t) => `\n## ${t}\n\n`,
      "heading_3": (t) => `\n### ${t}\n\n`,
      "bulleted_list_item": (t) => `${indent}- ${t}\n`,
      "numbered_list_item": (t) => `${indent}1. ${t}\n`,
      "toggle": (t) => `${indent}> ${t} (▼)\n`,
      "paragraph": (t) => `${indent}${t}\n\n`,
      "quote": (t) => `${indent}> ${t}\n\n`,
      "to_do": (t) => {
        const checked = block.to_do.checked ? "[x]" : "[ ]";
        return `${indent}- ${checked} ${t}\n`;
      }
    };

    if (renderers[type]) {
      return renderers[type](text);
    } else if (text) {
      return `${indent}${text}\n`;
    }
    return "";
  },

  /**
   * ブロックオブジェクトからプレーンテキスト（rich_text 配列の結合）を抽出する
   * @param {Object} block - Notion ブロックオブジェクト
   * @returns {string} 抽出されたテキスト
   */
  extractPlainText(block) {
    const type = block.type;
    if (block[type] && block[type].rich_text && block[type].rich_text.length > 0) {
      return block[type].rich_text.map(t => t.plain_text).join("");
    }
    return "";
  }
};
