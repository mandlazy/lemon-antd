export const handlerOptions = (option) => {
    if (!option)
        throw new Error('option can not be undifend or null');
    if (typeof option === 'object') {
        const { text = '', value = text } = option;
        return { text, value };
    }
    return { text: option, value: option };
};
//# sourceMappingURL=Option.js.map