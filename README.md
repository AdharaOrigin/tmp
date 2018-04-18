<div align="right">
[![Build Status](https://travis-ci.org/AdharaOrigin/tmp.svg?branch=master)](https://travis-ci.org/AdharaOrigin/tmp)
</div>

# Purify Extension

Purify is Chrome extension that allows you to hide unnecessary, irrelevant or annoying parts of your favourite 
websites. You can **get rid off: ads, cookie notices, banners, footers,** and all other content you are not 
interested in.

There are two modes available. CleanUp mode let you define rules you want to apply 99% of a time while Read mode 
allows you to define additional rules for reading purposes. With Read mode you can hide things you still need (like 
menu) but are unnecessary and distractive when reading long articles and so on.

Enjoy simplicity: Just content!


### Build and Installation
The only requirement to build Purify extension is `npm`. 

You can build it by simply running:

```
npm install
npm run build
```

This will generate extension files into `dist` directory.

Chrome policy does not allow installation of extensions 
that are not registered in Chrome Store unless Developer mode activated. Go to `chrome://extensions`, activate dev 
mode and load `dist` directory by clicking `Load unpacked extension...` 


### Usage

<img src="https://user-images.githubusercontent.com/32511776/38954082-08292616-4351-11e8-8847-5b889555d148.jpg" width="23%"></img> <img src="https://user-images.githubusercontent.com/32511776/38954083-0851b644-4351-11e8-8aab-789def44f88c.jpg" width="23%"></img> <img src="https://user-images.githubusercontent.com/32511776/38954085-089d22aa-4351-11e8-8f0d-d90f8b2cfeb7.jpg" width="23%"></img> 


### Known Problems

- Changing xpaths: Purify for now relies on exact xpaths to find desired element. This is not sufficient when website's 
DOM changes among reloads or element's IDs are generated dynamically. Voting mechanism that search DOM and find 
element based on several criteria (e.g.: tag type, id, classes, inner content, etc.) will be implemented in the future.

- Dynamically injected content: Purify waits for DOM to be loaded before searching for elements to hide. If however 
elements are appended to the website later it will not hide them. Only way to 


### Expected Features

- Rule management system: Interface to search and modify all stored rules.

- Page specific rules: It should be possible to define rules only for certain page(s) on given domain. Location will 
be evaluated as regex on URL providing probably 5 options as in following example. For url: `web.com/parent/current` 
rules as:
  * Exact page:     `web.com/parent/current`
  * All childs:     `web.com/parent/current/*`
  * All similar:    `web.com/parent/*`
  * Entire domain:  `web.com/*`
  * Custom:         `user input`
