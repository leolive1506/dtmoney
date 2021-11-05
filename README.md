dt money 
	muita criatividade envolvida
	d de diego e t thiago

	diego explicando cursor: not-allowed
		"plaquinha de não fume" KKKKKKKKKKK
# 1. Estrutura da aplicação
## create react-app
```
yarn create react-app dtmoney --template typescript
```
* Já cria com babel, webpack configurado
	* toda essa config fica dentro de um pacote chamado react-scripts
* script eject
	* Se precisar mudar config do webpack, babel, quando executar ele, traz pra aplicação os aquivos
	* Desvantagem -> quando react-script tiver atualização, vai ter qeu fazer as alterações na mão

* No package.json
	* Ts e testing vem como depencias da aplicação
	* Mudar pra devDependencies

## Css in js
```
yarn add styled-components
yarn add @types/styled-components
```
* Quando usa biblioteca css in js
	* Não usa diretamente className	
	* Cria componentes que são previamente estilizados
	* Suporta encadeamento de estilo assim como no scss
	* Estilização fica dentro do scopo do component somente

* Usar
	* Criar como const e letra maiuscula no começo
	```ts
	import styled from "styled-components"

	const Title = styled.h1`
	color: #8256e6;
	`

	export function App() {
		return <Title>Hello World</Title>	
	}
	```
### Criar estilos globais com styled-components
```ts
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
    }

`
// no App.tsx

export function App() {
  return <GlobalStyle />  
}
```

## Dicas css
* Fazer embaçar no hover
```scss
&:hover {
	filter: blur(5px)
}
```

* Fazer el escurecer no hover
```scss
button {
	
	transition: filter 0.2s;

	&:hover {
		filter: brightness(0.9)
	}
}
```

* Por padrão strong vem display inline
	* Margin não funciona

* Pegar mesmo tipo el so que com classe diferente
```scss
div {

	&.highlight-background {
		background: var(--green)
	}
}
```

* Por padrão table não oculpa 100% width
* Dar espaçamento table
```scss
table {border-spacing: 0 0.5}
```

### Medias das fonts
```css
html {
	/* 
		* dispositivos menores, font menor 
		* Pq diminuir? Vai utilizar uma medida pra configurar layout (REM)
			* 1rem = tamanho font-size atual
		* Pq usar porcentagem e não px?
			* Pq caso user esteja config no cell de aumentar a font ou diminuir
			* Percentual aumenta e diminuir de acordo com preferencia do user
			* Os px são fixo
	*/

	/* font-size padrão 16px (ideal desktop) */

	/* 15px */
	@media (max-width: 1080px) {
		font-size: 93.75% 
	}
	/* 14px */
	@media (max-width: 720px) {
		font-size: 87.5% 
	}
}

```

* Reset
```css
    :root {
        --background: #f0f2f5;
        --red: #E52E4D;
        --blue: #5429CC;
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

```

### Dica inserir font
* Por recomendação react pegar link inserir html
* Antes de tudo, colocar a parte abaixo na pag
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
```
* Faz pré conexão com google fonts antes de tudo, carrega 25% mais rápido


# 3. Consumindo API
* Quando não tem backend pronto, tem algumas ferramentas pra simular API's
	* Utilizar em ambiente de desenvolvimente e testes, jamais em produção

* 3 Ferramentas
	1. json server
		* Permite ao criar arquivo json, com estrutura obj, cada chave é convertido em uma rota
		* Não utilidado na aplicação pq ele não executa em paralelo
	
	2. msw
		* add funcionamento fictício para camada de network da nossa aplicação
			* as requisições feitas vão para aba network da guia desenvolvedor
		

	3. [Miragejs](https://miragejs.com/) - Usado na aplicação
		* Constroi api fake dentro do frontend
		* Tem banco de dados integrado, pode fazer relacionamento, preecher dados com dados fictícios