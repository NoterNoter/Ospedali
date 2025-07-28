# Guida al Deployment - Longform Ospedali

## 🚀 Deployment su Testata Giornalistica

Questa guida ti aiuterà a deployare il longform degli ospedali su qualsiasi testata giornalistica.

### Pre-requisiti

- Node.js 18+ installato
- Accesso FTP/SFTP o pannello di controllo del sito
- Dominio o sottocartella di destinazione

### 1. Build di Produzione

```bash
# Clona il repository
git clone <repository-url>
cd Ospedali

# Installa dipendenze
npm install

# Verifica la configurazione
npm run lint

# Genera il build statico
npm run build
```

### 2. Configurazione per Sottocartella

Se il longform deve essere pubblicato in una sottocartella (es. `/speciale-ospedali/`), modifica `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/speciale-ospedali',
  assetPrefix: '/speciale-ospedali',
  images: {
    unoptimized: true,
  },
};
```

Poi rigenera il build:
```bash
npm run build
```

### 3. Caricamento File

Dopo il build, carica tutto il contenuto della cartella `out/` nella directory di destinazione del sito web.

#### Struttura File Generati:
```
out/
├── index.html              # Homepage
├── ospedale/
│   ├── policlinico-gemelli.html
│   ├── san-raffaele.html
│   ├── humanitas.html
│   └── careggi.html
├── _next/                  # Asset JavaScript e CSS
└── ...                     # Altri file statici
```

### 4. Configurazione Server Web

#### Apache (.htaccess)

Se usi Apache, crea un file `.htaccess` nella cartella di destinazione:

```apache
# Redirect per URLs puliti
RewriteEngine On

# Cache per asset statici
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Compressione gzip
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>
```

#### Nginx

Per Nginx, aggiungi al tuo server block:

```nginx
location /speciale-ospedali {
    alias /path/to/out/;
    index index.html;
    
    # Cache per asset statici
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Compressione
    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

### 5. Verifica Post-Deployment

Dopo il caricamento, verifica che:

- [ ] La homepage si carichi correttamente
- [ ] Le tab delle categorie funzionino
- [ ] I link agli ospedali funzionino
- [ ] Le pagine di dettaglio si carichino
- [ ] Gli embed Flourish funzionino
- [ ] Il sito sia responsive su mobile

### 6. Monitoraggio e Analytics

#### Google Analytics

Aggiungi il codice di tracking nel file `src/app/layout.tsx`:

```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 7. SEO e Social Media

Il progetto include già:

- ✅ Meta tag ottimizzati
- ✅ Open Graph per Facebook
- ✅ Twitter Cards
- ✅ Schema JSON-LD (da implementare se necessario)

### 8. Aggiornamenti Futuri

Per aggiornare i contenuti:

1. Modifica i file JSON in `src/data/`
2. Rigenera il build con `npm run build`
3. Carica solo i file modificati nella cartella `out/`

### 9. Risoluzione Problemi

#### Problema: Link non funzionano
- Verifica la configurazione `basePath` in `next.config.ts`
- Controlla che tutti i file siano caricati correttamente

#### Problema: Embed Flourish non caricano
- Verifica che gli URL Flourish siano corretti nei JSON
- Controlla che non ci siano blocchi CORS

#### Problema: Stili non applicati
- Verifica che i file CSS siano caricati
- Controlla la configurazione del server per i tipi MIME

### 10. Supporto

Per supporto tecnico:
- Controlla i log del browser (F12 > Console)
- Verifica i file di log del server
- Testa il build localmente con `npm run build && npx serve out`

---

**Il longform è ora pronto per essere pubblicato sulla tua testata giornalistica!** 🎉