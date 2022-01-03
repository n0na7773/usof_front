import React from "react";
import css from "./Footer.module.css";

const Footer = (props) => {
    return (
        <div className={css.Footer}>
            <div className={css.Copyright}>
                <span>Designed by n0na7773</span>
            </div>
        </div>
    );
}

export default Footer;