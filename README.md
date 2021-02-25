# Freshheads frontend developer assessment
Dit project ondersteund zowel `Javascript` als `TypeScript`.

## Installeren
```bash
git clone git@github.com:freshheads/freshheads-frontend-developer-assessment.git
```

Run `npm install` to install all external packages.

## Starten
In de project map kun je het volgende uitvoeren:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) om het in de browser te bekijken.

## API
Via het `npm start` command, is de API beschikbaar via poort 3001.

### API Routes
- /api/innovations
- /api/users
- /api/tags

### Filteren
Filteren via de API gaat m.b.v. de property naam en waarde in de query parameter:
- `?x=y`

### Sorteren
Sorteren via de API gaat m.b.v. de `sort` en de `order` query parameter:
- `?_sort=x&_order=asc`
- `?_sort=x,y&_order=asc,desc`

### Paginatie
Paginatie via de API gaat m.b.v. de `_page` en `_limit` query parameters.
- `?_page=x?_limit=z`

Informatie over de paginatie staan in de response headers.

