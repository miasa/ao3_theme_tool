# AO3 theme development helper

Just a little tool to help develop skins for AO3. It proxies the AO3 website on localhost and injects generated stylesheets.

## Installation

Clone the repository and run
```
npm install
```

## Usage

Skins only work when logged in, so I suggest you style only the components that are displayed when logged in.

AO3 is very strict in filtering your css. Modern css does not work, so forget about flex, grid, css variables etc. Therefore this project uses SASS. See [AO3 help section](https://archiveofourown.org/help/skins-creating.html) for allowed css properties.

AO3 does not do mobile first, instead stylesheets are loaded from large to smaller screen sizes. I suggest you add base styles to `desktop.scss`.

`desktop.scss` corresponds to AO3's media = screen setting.  
`mobile.scss` corresponds to AO3's media = only screen and (max-width: 42em) setting. Overrides desktop.

### Commands

```
gulp --replace
```
If you want to replace the existing archive styles. Corresponds to AO3 "What it does = replace archive skin entirely" setting.

```
gulp
```
If you want to override the existing archive styles. Corresponds to AO3 "What it does = add on to archive skin" setting.

Both commands start watching your files for changes and will open your browser with a localhost address proxying AO3 website.

Then just start writing SASS and watch your browser update the view automatically.

## Add skin to AO3

First build the final styles by running 
```
gulp build
```

### The desktop skin

1. Go to [Create New Skin in AO3](https://archiveofourown.org/skins/new?skin_type=Skin)
2. Add the title as "YOUR_THEME_NAME desktop"
3. Paste the CSS from `/dist/desktop.css` into the CSS field
4. Toggle advanced settings visible
5. What it does = this depends on what you chose
6. Parent only = yes
7. Submit

### The mobile skin

1. Create new skin
2. Add the title as "YOUR_THEME_NAME mobile"
3. Paste the CSS from `/dist/mobile.css` into the CSS field
4. Toggle advanced settings visible
5. What it does = this depends on what you chose
6. Parent only = yes
7. Media = only screen and (max-width: 42em)
8. Submit

### The master skin

1. Create new skin
2. Add the title as "YOUR_THEME_NAME"
3. Leave the CSS field empty
4. Toggle advanced settings visible
5. What it does = this depends on what you chose
6. Add the previously created skins as parent skins. Which I think should instead be child skins, but oh well ¯\\_(ツ)_/¯
7. Submit

Finally, select "Use" in the skins list and enjoy your new AO3 experience.