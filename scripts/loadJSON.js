export function loadJSON(url) {
    return fetch(url).then(res => {
        return res.json();
    });
}