/**
 *
 * @param text Text to truncate
 * @param maxLength Max length of the text (Default: `300`)
 */
// prettier-ignore
const truncate = (text: string, maxLength: number = 300): [
  /**
   * Whether or not the text has been manipulated
   */
  boolean,
  /**
   * Truncated string
   */
  string
] => {
  if (text.length <= maxLength) return [false, text];
  return [true, text.substring(0, maxLength).trim() + "..."];
};

export default truncate;
