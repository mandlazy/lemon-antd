export const handlerOptions = (option: any, textKey: string, valueKey: string) => {
  if (!option) throw new Error('option can not be undifend or null');
  const optionProps: any = {};
  if (typeof option === 'object') {
    optionProps.disabled = option.disabled || false;
    option = {
      [textKey]: option[textKey],
      [valueKey]: option[valueKey]
    };
  } else {
    option = { [textKey]: option, [valueKey]: option };
  }
  return { option, optionProps };
};

export interface IOption {
  text: string;
  value: string;
}
