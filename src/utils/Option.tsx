export const handlerOptions = (option: any) => {
  if (!option) throw new Error('option can not be undifend or null');
  if (typeof option === 'object') {
    const { text = '', value = text } = option;
    return { text, value };
  }
  return { text: option, value: option };
};

export interface IOption {
  text: string;
  value: string;
}
