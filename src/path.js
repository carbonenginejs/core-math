/**
 * Normalizes slash direction and repeated separators without resolving dot
 * segments. URI-style scheme separators retain their authored slash count.
 */
export function normalizePath(value, options = {})
{
    let result = String(value ?? "").trim().replace(/\\/gu, "/");
    const scheme = /^([A-Za-z][A-Za-z0-9+.-]*:)(\/+)/u.exec(result);

    if (scheme)
    {
        const prefix = scheme[0];
        result = `${prefix}${result.slice(prefix.length).replace(/\/+/gu, "/")}`;
    }
    else
    {
        result = result.replace(/\/+/gu, "/");
    }

    return options.lowerCase ? result.toLowerCase() : result;
}
