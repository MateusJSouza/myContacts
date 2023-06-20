module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "airbnb-base",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }] // ignora a regra apenas para variáveis com o nome next
    }
}
