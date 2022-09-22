# TDD_API
--------------------

## NPM 스크립트

- **start**: Description for `npm start` script
- **test**: Description for `npm test` script
- **test && covarage**: Description for `npm test_coverage` script
  ...

```
{
  "name": "api",
  "version": "1.0.0",
  "scripts": {
    "test": "NODE_ENV=test mocha api/user/user.spec.js -w",
    "test_coverage": "nyc --reporter=text mocha api/user/user.spec.js",
    "start": "node bin/www.js"
  },
  ...
}
```
