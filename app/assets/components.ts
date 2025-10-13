'use client'
import styles from './theme.module.css'
import stylesInput from './stylesInput.module.css'
import {Button, NumberInput, Select, Textarea, TextInput} from "@mantine/core";


export const components = {
    TextInput: TextInput.extend({
        classNames: stylesInput
    }),
    NumberInput: NumberInput.extend({
        classNames: stylesInput
    }),

    Textarea: Textarea.extend({
        classNames: stylesInput
    }),
    Select: Select.extend({
        classNames: {
            root: stylesInput.root,
            label: stylesInput.label
        }
    }),
    Button: Button.extend({
        classNames: styles
    }),
};