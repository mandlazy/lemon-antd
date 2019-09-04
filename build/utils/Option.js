export const handlerOptions = (option, textKey, valueKey) => {
    if (!option)
        throw new Error('option can not be undifend or null');
    const optionProps = {};
    if (typeof option === 'object') {
        optionProps.disabled = option.disabled || false;
        option = {
            [textKey]: option[textKey],
            [valueKey]: option[valueKey]
        };
    }
    else {
        option = { [textKey]: option, [valueKey]: option };
    }
    return { option, optionProps };
};
//# sourceMappingURL=Option.js.map