# @loglib/tracker

## 0.3.3

### Patch Changes

- 523c24c: default returned back to send beacon

## 0.3.2

### Patch Changes

- 9bed7c1: tracker bug fix

## 0.3.1

### Patch Changes

- 50f7019: now tracker uses fetch by default insted of sendbeacon unless passed in the config

## 0.3.0

### Minor Changes

- d48f41d: # Kind of big change for current users

  - Web user filed changed to web visitor since web user is a bit confusing and it's not a user in the traditional sense
  - All the adapters have been updated to use the new web visitor type

### Patch Changes

- d48f41d: cli adapter template update to visitor id

## 0.2.0

### Minor Changes

- fbc11fc: - supports multiple site
  - UI is composable and customizable
  - Tracker now doesn't send pings to periodically to the server, instead it sends pings on page navigation and when the page is closed
  - And many more bug fixes and improvements

## 0.1.0

### Minor Changes

- 5e5dc8e: - support through cdn is added to the tracker
  - minor bug fixes on core

## 0.0.12

### Patch Changes

- 7f97565: iife output

## 0.0.11

### Patch Changes

- a9fdf83: - Average time now is calculated from page views duration for better accuracy
  - Tracker doesn't ping server constantly anymore, it only sends data on blur
  - Unload event is migrated to visibilitychange event

## 0.0.10

### Patch Changes

- 019f4d9: next js api handler fixes

## 0.0.9

### Patch Changes

- 9c428b8: the tracker will add /api/loglib by default on custom loglib url

## 0.0.8

### Patch Changes

- dc2f69e: auth, cors and more

## 0.0.7

### Patch Changes

- 865bf48: get url fix

## 0.0.6

### Patch Changes

- eca489c: bug fixes

## 0.0.5

### Patch Changes

- 48aa8e4: peer dependcy fixes

## 0.0.4

### Patch Changes

- d1fc1ab: loading animations, bug fixes and more

## 0.0.3

### Patch Changes

- 43ae978: all packages are ready for production test 🚀
