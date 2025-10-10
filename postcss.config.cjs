module.exports = {
    plugins: {
        'postcss-preset-mantine': {},
        'postcss-simple-vars': {
            variables: {
                'mantine-breakpoint-xs': '22.5em',
                'mantine-breakpoint-sm': '48em',
                'mantine-breakpoint-md': '64em',
                'mantine-breakpoint-lg': '74em',
                'mantine-breakpoint-xl': '74em',
            },
        },
    },
};