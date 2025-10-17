module.exports = {
    plugins: {
        'postcss-preset-mantine': {},
        'postcss-preset-env': {
            stage: 3,
            features: {
                'nesting-rules': true,
                'css-grid': true,
                'subgrid': true,
                'custom-media-queries': true,
                'media-query-ranges': true
            },
            autoprefixer: {
                grid: true
            }
        },
        "@tailwindcss/postcss": {},
        'postcss-simple-vars': {
            variables: {
                'mantine-breakpoint-xs': '22.5em',
                'mantine-breakpoint-sm': '48em',
                'mantine-breakpoint-md': '64em',
                'mantine-breakpoint-lg': '74em',
                'mantine-breakpoint-xl': '90em',
            },
        },
    },
};