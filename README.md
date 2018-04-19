<div align="center" width="75%">
  <h1>Purify Extension</h1>
  <a href="https://travis-ci.org/AdharaOrigin/tmp"><img src="https://travis-ci.org/AdharaOrigin/tmp.svg?branch=master" alt="Build Status"></a>
  <a href="https://www.gnu.org/licenses/gpl-3.0.en.html"><img src="https://img.shields.io/badge/License-GPL%20v3-blue.svg" alt="GNU GPL v3 license"></a>
  <br><br>  
  
  Purify is Chrome extension that allows you to hide unnecessary, irrelevant or annoying parts of your favourite websites.
  
  Enjoy ads free pages, distraction free reading, simplicity. (Especially helpful with small screens.)
  <br><br>
</div>


### Usage

To hide certain element on a domain:
1) Click on extension icon
2) Click on Add CleanUp/ReadMode rule
3) Select element you want to hide
4) Save it!

Optionally, you can name element you are hiding or adjust the selection.

There are two modes available:
- CleanUp mode let you define rules you want to apply 99% of a time.
-Read mode allows you to define additional rules for reading purposes. With Read mode you can hide things you still 
need (like menu) but are unnecessary and distractive when reading long articles and so on.


Watch short video below to see how Purify can be used.

<img src="https://user-images.githubusercontent.com/32511776/38954082-08292616-4351-11e8-8847-5b889555d148.jpg" width="50%"></img>


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
