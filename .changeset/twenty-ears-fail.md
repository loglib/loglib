---
"@loglib/tracker": patch
"@loglib/core": patch
---

- Average time now is calculated from page views duration for better accuracy
- Tracker doesn't ping server constantly anymore, it only sends data on blur
- Unload event is migrated to visibilitychange event
