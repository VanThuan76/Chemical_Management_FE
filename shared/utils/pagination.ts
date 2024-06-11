export function parseURLSearch(querySearch: string) {
    if (!querySearch) return [];
    try {
        return querySearch.split('&').map(str => JSON.parse(decodeURIComponent(str)));
    } catch (e) {
        return [];
    }
}
export function stringifyArrayObj(param: object[]) {
    return param.map(obj => encodeURIComponent(JSON.stringify(obj))).join('&');
}