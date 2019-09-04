export const handlerOptions = (option, textKey, valueKey) => {
    if (!option)
        throw new Error('option can not be undifend or null');
    const optionProps = {};
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
//# sourceMappingURL=Option.js.map