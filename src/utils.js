/**
 * Convert a nullable, scalar, or array-like value into an array.
 *
 * Kept local so geometry helpers do not depend on the old ccpwgl `utils`
 * webpack alias.
 *
 * @param {any} value Value to normalize.
 * @returns {Array} Normalized array.
 */
export function toArray(value)
{
    if (value === undefined || value === null) return [];
    return Array.isArray(value) ? value : [ value ];
}

