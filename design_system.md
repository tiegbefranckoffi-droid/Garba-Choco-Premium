# GarbaExpress Design System

Un design system moderne, sombre et chaleureux, optimisé pour les applications web premium. Il utilise le **Glassmorphism**, des effets de **Glow**, et des **micro-animations** fluides pour créer une expérience utilisateur immersive et engageante.

---

## 1. Variables CSS (Design Tokens)

Copiez ces variables dans la racine `:root` de votre fichier CSS principal pour initialiser le thème.

```css
:root {
  /* Palette de Couleurs */
  --primary: #FF9900;             /* Orange vif (Glow & Accents) */
  --primary-rgb: 255, 153, 0;
  --primary-hover: #E08500;
  --secondary: #D32F2F;           /* Rouge épicé (Alertes, Second Accent) */
  --secondary-rgb: 211, 47, 47;
  --secondary-hover: #B71C1C;
  --dark: #0A0A0A;                /* Fond principal de la page */
  --dark-surface: #141414;        /* Fond des sections */
  --dark-card: #1E1E1E;           /* Fond des cartes et modales */
  --dark-border: rgba(255, 255, 255, 0.08); /* Bordures subtiles */
  --light: #FFFDF9;               /* Texte principal (Chaud) */
  --text-muted: #A0A0A0;          /* Texte secondaire */
  
  /* Typographie */
  --font-main: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  
  /* Transitions */
  --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Arrondis (Border Radius) */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;
  
  /* Ombres & Effets de Glow */
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 25px rgba(255, 153, 0, 0.35);
  --shadow-glow-red: 0 0 25px rgba(211, 47, 47, 0.3);
  
  /* Layout */
  --container-width: 1200px;
}
```

---

## 2. Typographie & Gradients

### Importation de la Police (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Gradients de Texte CSS
```css
/* Dégradé du Blanc vers l'Orange */
.text-gradient-primary {
  background: linear-gradient(135deg, #FFFFFF 30%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Dégradé de l'Orange vers le Rouge */
.text-gradient-accent {
  background: linear-gradient(135deg, var(--primary) 20%, var(--secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 3. Composants Réutilisables (HTML & CSS)

### A. Boutons Premium
Les boutons possèdent un effet de translation fluide et un halo de lumière (`box-shadow`) au survol.

```html
<!-- Bouton Principal (Orange avec Glow) -->
<button class="btn btn-primary">
  Bouton Principal
</button>

<!-- Bouton Secondaire (Bordure transparente) -->
<button class="btn btn-secondary">
  Bouton Secondaire
</button>

<!-- Bouton Accent (Rouge avec Glow) -->
<button class="btn btn-accent">
  Bouton Accent
</button>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  z-index: 1;
  gap: 10px;
  cursor: pointer;
  border: none;
  outline: none;
}

.btn-primary {
  background: var(--primary);
  color: var(--dark);
  box-shadow: var(--shadow-glow);
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 153, 0, 0.5);
}

.btn-secondary {
  background: transparent;
  color: var(--light);
  border: 2px solid var(--dark-border);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-3px);
}

.btn-accent {
  background: var(--secondary);
  color: var(--light);
  box-shadow: var(--shadow-glow-red);
}

.btn-accent:hover {
  background: var(--secondary-hover);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(211, 47, 47, 0.5);
}
```

### B. Badge Catégorie (Section Tag)
Un badge pilule discret pour étiqueter les sections de page.

```html
<span class="section-tag">Concept</span>
```
```css
.section-tag {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--primary);
  margin-bottom: 12px;
  background: rgba(255, 153, 0, 0.1);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 153, 0, 0.15);
}
```

### C. Cartes Étape (Step Cards)
Cartes interactives avec une ligne de dégradé supérieure animée au survol.

```html
<div class="step-card">
  <div class="step-number">01</div>
  <h3>Sélectionnez votre Formule</h3>
  <p>Description détaillée de l'étape...</p>
</div>
```
```css
.step-card {
  background-color: var(--dark-surface);
  border: 1px solid var(--dark-border);
  border-radius: var(--radius-lg);
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  transition: var(--transition);
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  opacity: 0;
  transition: var(--transition);
}

.step-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 153, 0, 0.25);
  box-shadow: var(--shadow);
}

.step-card:hover::before {
  opacity: 1;
}

.step-number {
  font-size: 4rem;
  font-weight: 850;
  line-height: 1;
  background: linear-gradient(135deg, rgba(255, 153, 0, 0.15) 0%, rgba(211, 47, 47, 0.05) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 24px;
}
```

### D. Badges Flottants (Glassmorphism)
Éléments semi-transparents flottants au-dessus des images ou sections avec effet de flou arrière-plan.

```html
<div class="floating-badge">
  <div class="badge-icon">🛵</div>
  <div class="badge-info">
    <h4>Sassandra Plage</h4>
    <p>Livré en 22 min</p>
  </div>
</div>
```
```css
.floating-badge {
  background: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--dark-border);
  border-radius: var(--radius-md);
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow);
  animation: float 4s ease-in-out infinite;
}

.badge-icon {
  background: rgba(255, 153, 0, 0.15);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 1.25rem;
}

.badge-info h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--light);
}

.badge-info p {
  font-size: 0.75rem;
  color: var(--text-muted);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
```

### E. Blobs Décoratifs Flous (Glow Blobs)
Gros cercles colorés floutés en arrière-plan pour ajouter de la profondeur.

```html
<div class="glow-blob glow-blob-orange" style="top: 10%; left: -100px;"></div>
<div class="glow-blob glow-blob-red" style="top: 50%; right: -150px;"></div>
```
```css
.glow-blob {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

.glow-blob-orange {
  background: var(--primary);
}

.glow-blob-red {
  background: var(--secondary);
}
```

---

## 4. Structure de Page Standard (Squelette HTML)

Voici le squelette minimal réutilisable utilisant ce design system :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau Site Premium</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    /* Intégrez ici les variables et styles du design system */
  </style>
</head>
<body>

  <!-- Blobs Décoratifs -->
  <div class="glow-blob glow-blob-orange" style="top: 15%; left: -100px;"></div>
  
  <!-- Conteneur Principal -->
  <div class="container">
    <section class="section">
      <span class="section-tag">Bienvenue</span>
      <h1 class="section-title text-gradient-primary">Créer avec Style</h1>
      <p class="section-desc">Ce design system vous permet de reproduire instantanément l'aspect visuel moderne et immersif de GarbaExpress Premium sur d'autres projets.</p>
      
      <button class="btn btn-primary">Explorer le Design</button>
    </section>
  </div>

</body>
</html>
```
