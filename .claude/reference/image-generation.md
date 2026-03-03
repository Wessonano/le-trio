# Image Generation — Nano Banana 2 Pro

## Modèle

- **ID** : `gemini-3-pro-image-preview`
- **SDK** : `google-generativeai` >= 1.52.0
- **Qualité** : studio-quality, jusqu'à 4K
- **Vitesse** : 10-20s par image (acceptable pour usage offline)

## SDK Python

```python
import google.generativeai as genai
import PIL.Image

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-3-pro-image-preview")
```

## Mode 1 : Prompt libre

```python
response = model.generate_content(prompt)

# Extraire l'image de la réponse
for part in response.parts:
    if hasattr(part, 'inline_data'):
        image_data = part.inline_data.data
        with open(output_path, "wb") as f:
            f.write(image_data)
```

## Mode 2 : Photo + Prompt (édition)

```python
img = PIL.Image.open("photo.jpg")
response = model.generate_content([img, prompt])
```

Le modèle supporte jusqu'à 14 images en input.

## Mode 3 : Auto depuis texte

1. Lire le fichier markdown
2. Extraire le contenu (sans frontmatter)
3. Construire un prompt de synthèse : "Crée une illustration pour ce texte : {extrait}"
4. Appeler le modèle comme en Mode 1

## Styles — Prompt Suffixes

| Style | Suffix ajouté au prompt |
|-------|------------------------|
| `aquarelle` | "Style: watercolor painting, soft colors, dreamy atmosphere, delicate brushstrokes" |
| `dessin` | "Style: pencil sketch, black and white, intimate, hand-drawn feel" |
| `peinture` | "Style: oil painting, rich textures, deep colors, classical technique" |
| `realiste` | "Style: photorealistic, cinematic lighting, 35mm photography, shallow depth of field" |
| `minimaliste` | "Style: minimalist illustration, simple shapes, pastel colors, clean lines" |

## Output

- Format : **WebP** (conversion via Pillow si nécessaire)
- Taille max : **500KB**
- Résolution recommandée : **1920x1080** ou **1:1** selon le contexte

```python
from PIL import Image

img = Image.open(raw_output)
img.save(output_path, "WEBP", quality=85)
```

## .env

```
GEMINI_API_KEY=xxx
```

## Gestion d'erreurs

- Retry 1x si timeout
- Si échec, afficher le message d'erreur et ne pas écraser une image existante
- Toujours vérifier que l'output contient bien une image (pas juste du texte)
