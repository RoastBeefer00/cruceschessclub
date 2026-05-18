import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.BwSLMYtw.js","_app/immutable/chunks/Cea7OwTu.js","_app/immutable/chunks/bRGXjB5n.js","_app/immutable/chunks/DKK-3wO0.js","_app/immutable/chunks/CV6zhG3Y.js","_app/immutable/chunks/Cpa7pLOn.js","_app/immutable/chunks/CqGpbfLh.js","_app/immutable/chunks/CfZNDbYv.js","_app/immutable/chunks/SMdaaX-E.js","_app/immutable/chunks/m2oHrmn3.js"];
export const stylesheets = [];
export const fonts = [];
