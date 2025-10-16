import styles from "./BurgerIcon.module.css";
import React from "react";
import { JSX } from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

const BurgerIcon = ({ state }: {state: boolean} & IntrinsicAttributes) => {
    return (
        <div className={styles.icon} data-open={state}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default BurgerIcon;