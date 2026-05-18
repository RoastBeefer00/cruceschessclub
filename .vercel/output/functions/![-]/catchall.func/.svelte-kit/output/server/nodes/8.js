import * as server from '../entries/pages/schedule/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/schedule/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/schedule/+page.server.js";
export const imports = ["_app/immutable/nodes/8.BBocbX-q.js","_app/immutable/chunks/Cea7OwTu.js","_app/immutable/chunks/bRGXjB5n.js","_app/immutable/chunks/DKK-3wO0.js","_app/immutable/chunks/Cpa7pLOn.js","_app/immutable/chunks/m2oHrmn3.js","_app/immutable/chunks/CV6zhG3Y.js","_app/immutable/chunks/CqGpbfLh.js","_app/immutable/chunks/V4ke23aL.js","_app/immutable/chunks/SMdaaX-E.js"];
export const stylesheets = [];
export const fonts = [];
