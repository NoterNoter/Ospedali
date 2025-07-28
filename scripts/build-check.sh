#!/bin/bash

# Script per verificare il build del progetto longform ospedali

echo "🏥 Build Check - Longform Ospedali"
echo "=================================="

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funzione per logging
log_info() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# 1. Verifica Node.js version
echo ""
echo "1. Verificando versione Node.js..."
node_version=$(node -v)
if [[ $node_version == v1[89]* ]] || [[ $node_version == v2[0-9]* ]]; then
    log_info "Node.js $node_version OK"
else
    log_warning "Node.js $node_version potrebbe non essere compatibile (consigliato v18+)"
fi

# 2. Installa dipendenze
echo ""
echo "2. Installando dipendenze..."
if npm install --silent; then
    log_info "Dipendenze installate correttamente"
else
    log_error "Errore nell'installazione delle dipendenze"
    exit 1
fi

# 3. Verifica TypeScript
echo ""
echo "3. Verifica TypeScript..."
if npx tsc --noEmit; then
    log_info "Tipi TypeScript validi"
else
    log_error "Errori nei tipi TypeScript"
    exit 1
fi

# 4. Lint check
echo ""
echo "4. Controllo ESLint..."
if npm run lint; then
    log_info "Codice conforme alle regole ESLint"
else
    log_warning "Avvisi ESLint trovati"
fi

# 5. Build del progetto
echo ""
echo "5. Build del progetto..."
if npm run build; then
    log_info "Build completato con successo"
else
    log_error "Errore durante il build"
    exit 1
fi

# 6. Verifica file di output
echo ""
echo "6. Verifica file di output..."
if [ -d "out" ]; then
    file_count=$(find out -type f | wc -l)
    log_info "Cartella 'out' creata con $file_count file"
    
    # Verifica file essenziali
    if [ -f "out/index.html" ]; then
        log_info "Homepage generata correttamente"
    else
        log_error "Homepage non trovata"
    fi
    
    # Verifica pagine ospedali
    ospedale_pages=$(find out -name "*.html" -path "*/ospedale/*" | wc -l)
    if [ $ospedale_pages -gt 0 ]; then
        log_info "$ospedale_pages pagine ospedali generate"
    else
        log_warning "Nessuna pagina ospedale trovata"
    fi
    
else
    log_error "Cartella 'out' non trovata"
    exit 1
fi

# 7. Verifica dimensioni file
echo ""
echo "7. Analisi dimensioni..."
out_size=$(du -sh out | cut -f1)
log_info "Dimensione totale build: $out_size"

# 8. Verifica file JSON
echo ""
echo "8. Verifica integrità dati JSON..."
json_files=("src/data/ospedali.json" "src/data/homepage.json")
for file in "${json_files[@]}"; do
    if [ -f "$file" ]; then
        if python3 -m json.tool "$file" > /dev/null 2>&1; then
            log_info "$file è un JSON valido"
        else
            log_error "$file contiene JSON non valido"
            exit 1
        fi
    else
        log_error "$file non trovato"
        exit 1
    fi
done

echo ""
echo "=================================="
log_info "Build check completato con successo!"
echo ""
echo "Il progetto è pronto per il deployment."
echo "Carica il contenuto della cartella 'out/' sul tuo hosting."
echo ""