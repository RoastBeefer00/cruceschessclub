

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tournaments/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.B0mw0JHs.js","_app/immutable/chunks/Cea7OwTu.js","_app/immutable/chunks/bRGXjB5n.js","_app/immutable/chunks/DKK-3wO0.js","_app/immutable/chunks/CV6zhG3Y.js","_app/immutable/chunks/Cpa7pLOn.js"];
export const stylesheets = [];
export const fonts = [];
