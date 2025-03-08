import Witchcraft from './witchcraft.js';

// Now Witchcraft is available globally
const witchcraft = new Witchcraft(chrome, null);

// Listen for messages explicitly from content scripts
chrome.runtime.onMessage.addListener((location, sender) => {
    witchcraft.onScriptRequest(location, sender);
});

chrome.runtime.onInstalled.addListener(() => {
    console.log('Witchcraft background service worker is running (MV3).');
});
