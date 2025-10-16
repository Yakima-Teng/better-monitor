/**
 * 将给定的字符串中使用"-"分隔的每个单词首字母转成大写，并移除"-"，
 * 生成并返回一个新的组合字符串。
 *
 * @param {string} str - 包含由"-"连接的多个单词的字符串。
 * @returns {string} 转换后的字符串，其中每个单词的首字母都被转换成了大写，并且没有"-"。
 */
function toCamelCase(str) {
  return str
    .split('-') // 使用"-"分割字符串，形成一个数组
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // 对每个单词，将其首字母转为大写，其余部分保持不变
    .join(''); // 将处理后的单词连接成一个新的字符串
}

module.exports = {
  toCamelCase,
};
