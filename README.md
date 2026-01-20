# Vibly App Builder

This repo builds Expo apps for web preview using GitHub Actions.

## How it works

1. Generated app code is pushed to `apps/{app_id}/`
2. GitHub Actions automatically builds it with `expo export --platform web`
3. Built app is deployed to GitHub Pages
4. Preview available at: `https://mariocuban.github.io/vibly-app-builds/{app_id}`

## Structure

```
apps/
  {app_id}/          # Generated app code
    src/
      app/
        (tabs)/
          home.jsx
          ...
    package.json
    ...
template/            # Base Expo template
.github/
  workflows/
    build-app.yml    # Build workflow
```

## Manual build

```bash
cd apps/{app_id}
npm install
npx expo export --platform web --output-dir dist
```
