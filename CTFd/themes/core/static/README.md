# Pokémon Theme Assets

This directory contains static assets for the Pokémon-themed CTFd theme.

## Required Images

For the theme to work properly, please add the following images to the `img` directory:

1. `pokemon-logo.png` - The Pokémon logo (transparent background recommended)
2. `pokemon-bg.jpg` - A background image featuring Pokémon (1920x1080 recommended)
3. `pokeball-favicon.ico` - A Poké Ball favicon
4. `pokeball-small.png` - A small Poké Ball icon for the footer
5. `Pikachu_hi_transparent.png` - A friendly Pikachu image (transparent background)

## Adding Custom Images

1. Place all images in the `img` directory
2. Update the image paths in the HTML/CSS files if you use different filenames
3. Ensure all images are optimized for web use to maintain good performance

## Customization

You can customize the following colors in the `pokemon-theme.css` file:

- `--pokemon-yellow`: #ffcc00
- `--pokemon-blue`: #2c6cb3
- `--pokemon-red`: #e74c3c
- `--pokemon-dark-blue`: #1a3e6c

## Fonts

The theme uses the following Google Fonts:
- 'Press Start 2P' (for headings and buttons)
- 'Roboto' (for body text)

These are loaded via Google Fonts CDN in the base template.
