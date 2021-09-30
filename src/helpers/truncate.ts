const truncate = (text: string, maxLength: number = 300) => {
  if (text.length <= maxLength) return [false, text];
  return [true, text.substring(0, maxLength).trim() + "..."];
};

export default truncate;
