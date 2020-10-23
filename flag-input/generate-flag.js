#!/usr/bin/env node

process.stdout.write(require('crypto').randomBytes(256).toString().split('').filter(a => !!a.match(/[a-zA-Z0-9]/)).join('').slice(0, 12));
