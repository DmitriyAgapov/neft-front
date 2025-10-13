import { colorsTuple, createTheme} from "@mantine/core";

import {components} from "@/app/assets/components";

export const theme = createTheme({
    components: components,
    primaryColor: 'blue',
    primaryShade: 8,
    defaultRadius: 'md',
    fontFamily: 'var(--font-raleway)',
    breakpoints: {
        xs: '22.5em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },
    headings: {
        fontFamily: 'var(--font-manrope)',
        sizes: {
            h1: {
                fontSize: '68px',
                lineHeight: '68px',
                fontWeight: '800'
            },
            h2: {
                fontSize: '48px',
                lineHeight: '56px',
                fontWeight: '800'
            },
            h3: {
                fontSize: '24px',
                lineHeight: '32px',
                fontWeight: '800'
            },
            h4: {
                fontSize: '20px',
                lineHeight: '24px',
                fontWeight: '800'
            },
            h5: {
                fontSize: '16px',
                lineHeight: '20px',
                fontWeight: '800'
            },
            h6: {
                fontSize: '12px',
                lineHeight: '16px',
                fontWeight: '800'
            }
        }
    },

    colors: {
        title: colorsTuple(
            Array.from({ length: 10 }, (_, index) => 'black')
        ),
        blue: [
            '#E7F5FF',
            '#D0EBFF',
            '#A5D8FF',
            '#74C0FC',
            '#4DABF7',
            '#339AF0',
            '#228BE6',
            '#1C7ED6',
            '#0536B3',
            '#1864AB'
        ]
    }
})