import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --red: #E52E4D;
        --blue: #5429CC;
        --green: #33CC95;
        --blue-light: #6933FF;
        --text-title: #363F5F;
        --text-body: #969CB3;
        --shape: #FFFFFF;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-border-box;
    }
    // font-size padrão 16px (ideal desktop)
    html {
        @media (max-width: 1080px) { /* 15px */
            font-size: 93.75% 
        }

        @media (max-width: 720px) { /* 14px */
            font-size: 87.5%
        }
    }

    body, input, textarea, button {
        /* input, textarea e button não importam por padrão a font do body */
        font-family: 'Poppins', sans-serif;
        font-weight: 400
    }

    h1, h2, h3, h4, h5, h6, strong {
		font-weight: 600
	}

    body {
        background: var(--background);
        -webkit-font-smooth: antialiased; // fontes ficam mais nítidas
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed
    }

`

