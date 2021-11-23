/**
 *
 * @param text Text to truncate
 * @param maxLength Max length of the text (Default: `300`)
 */
// prettier-ignore
const truncate = (text: string, maxLength: number = 300): [
  /**
   * Truncated string
   */
  string,
  /**
   * Whether or not the text has been manipulated
   */
  boolean,
] => {
  if (text.length <= maxLength) return [text, false];
  return [text.substring(0, maxLength).trim() + "...", true];
};

export default truncate;
