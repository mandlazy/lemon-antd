export const handlerOptions = (option: any, textKey: string, valueKey: string) => {
  if (!option) throw new Error('option can not be undifend or null');
  const optionProps: any = {};
  if (typeof option === 'object') {
    optionProps.disabled = option.disabled || false;
    return {
      [textKey]: option[textKey] || '',
      [valueKey]: option[valueKey] || option[textKey]
    };
  }
  return {
    option: { [textKey]: option, [valueKey]: option },
    optionProps
  };
};

export interface IOption {
  text: string;
  value: string;
}
