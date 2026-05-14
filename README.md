# Git Calendar Webový Klient
Webový klient pro [git-calendar/core](https://github.com/git-calendar/core).

### Kontext projektu:
Jde o webovou aplikaci, která poskytuje grafické rozhraní pro kalendář používající Git repozitáře jako uložistě.
Na rozdíl od běžných kalendářů, které jsou ve skutečnosti pouze frontendy nad službami od Google, Apple nebo Microsoft, umožňuje Git Calendar hostovat kalendář na vlastním serveru nebo u libovolného poskytovatele (GitHub, GitLab, Codeberg). 
Díky vlastnostem Gitu nabízí efektivní delta synchronizaci, offline-first režim, plnou decentralizaci a absenci tradičního backendu, protože klient komunikuje přímo s Git repozitářem.

### Samotný web klient
Webový klient volá jádro napsané v Go a zkompilované do WASM (přes web-workera). To řeší většinu bussiness logiky jako je ukládání/commitování změn, sychronizace s remotes, opakování událostí atd.

Klient na vrch přidává:
- Vizuální zobrazení událostí na "časové ose"
- Grafické vytváření, mazání a upravování událostí
- "Minimapu" měsíce
- Drag-To-Create událostí
- Klávesové zkratky jako: M-Month view, T-Today, 4-4days view, N-New Event, >-Další, <-Předchozí
- Více-jazyčné rozhraní (zatím CZ a EN)
- Barevné themes (zatím Dark a Light)
- Přepínání mezi formáty času (10:00 a 10 AM)

### K bodům z hodnotící tabulky:
- Média API mě nanpadá jak využít
- Pokročilé JS API nepoužívám přímo v JS, ale samotný [Core](https://github.com/git-calendar/core) implementuje custom filesystém pomocí IndexedDB/OPFS, nad kterým se následně dělají Git operace. ([IndexedDB implementace](https://github.com/git-calendar/core/tree/main/pkg/idb), [OPFS implementace](https://github.com/git-calendar/core/tree/main/pkg/opfs)). Také používám LocalStorage na ukládání nějakých nastavení uživatele, ale to za mě řeší knihovna [useStorage](https://vueuse.org/core/useStorage/) viz. [useSettings.ts](https://github.com/firu11/kaj-calendar/blob/main/src/composables/useSettings.ts#L29-L44).

### Spuštění lokálně
```sh
npm install
npm fetch-wasm
npm run dev
```
