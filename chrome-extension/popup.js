import Witchcraft from './witchcraft.js';

class Popup {
    constructor() {
        this.witchcraft = new Witchcraft(chrome, document);
        this.init();
    }

    async init() {
        await this.setupServerAddress();
        this.setupListeners();
        this.showVersion();
    }

    async setupServerAddress() {
        const serverAddressInput = document.getElementById("server-address");
        serverAddressInput.value = await this.witchcraft.getServerAddress();

        serverAddressInput.addEventListener("input", async (event) => {
            const newAddress = event.target.value;
            await this.witchcraft.setServerAddress(newAddress);
        });

        document.getElementById('server-address-reset').addEventListener('click', async (event) => {
            event.preventDefault();
            const defaultAddress = this.witchcraft.defaultServerAddress;
            await this.witchcraft.setServerAddress(defaultAddress);
            serverAddressInput.value = defaultAddress;
        });
    }

    setupListeners() {
        this.makeButtonFromAnchor("docs");
        this.makeButtonFromAnchor("report-issue");
    }

    makeButtonFromAnchor(id) {
        const anchor = document.getElementById(id);
        anchor.addEventListener("click", (event) => {
            event.preventDefault();
            chrome.tabs.create({ url: anchor.getAttribute("href") });
        });
    }

    showVersion() {
        document.getElementById('version').textContent = chrome.runtime.getManifest().version;
    }

}

document.addEventListener("DOMContentLoaded", () => {
    new Popup();
});
