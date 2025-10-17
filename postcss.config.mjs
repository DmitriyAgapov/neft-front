const config = {
    plugins: {
        'postcss-preset-mantine': {
        },
        'postcss-simple-vars': {
            variables: {
                'mantine-breakpoint-xs': '22.5em',
                'mantine-breakpoint-sm': '48em',
                'mantine-breakpoint-md': '64em',
                'mantine-breakpoint-lg': '74em',
                'mantine-breakpoint-xl': '90em',
            },
        },
        "@tailwindcss/postcss":{},
        'postcss-preset-env': {
            stage: 3,
            features: {
                'nesting-rules': true,
                'css-grid': true,
                'subgrid': true,
                'has-pseudo-class': true,
                'custom-properties': true
            }
        }
    }
}

export default config