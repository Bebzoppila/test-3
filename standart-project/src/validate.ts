export interface TypePatternsType {
    firstName: RegExp,
    phone: RegExp,
    city: RegExp
}

const typePatterns: TypePatternsType = {
    firstName: /.{2}/,
    phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    city: /[A-я]/
}
export function isValid(str: string, type: keyof TypePatternsType) {
    return typePatterns[type].test(str)
}