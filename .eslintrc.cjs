module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/stylistic-type-checked'
    ],
    ignorePatterns: [
        'dist',
        '.eslintrc.cjs',
        'postcss.config.js',
        'tailwind.config.ts',
        'prettier.config.ts',
        'vitest.config.ts'
    ], // Add postcss.config.js here
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
    },
    plugins: ['react-refresh'],
    rules: {
        'no-mixed-spaces-and-tabs': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
};
