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

## Dicas
### css
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
	* usar inline-block

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

### JS, JSX, TS, TSX
* No js tem como transformar em numero uma string recebida da dom da seguinte forma
```jsx
onChange={e => setValue(+e.target.value)}
// mesmo que
onChange={e => setValue(Number(e.target.value))}
```

* Herdar uma interface
```ts
interface Transaction {
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> // ignora o id e createdAt

type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'> // selecionar os desejados
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


### Trabalhar com biblioteca de cores ( Polished )
* Se tiver usando styled-components tem como usar funções js para manipulação de cores
```tsx
// yarn add polished
import { darken } from "polished"

export const Containerbutton = styled.div`
	&:hover {
		// escurecendo em 10%
		border-color: ${darken(0.1, 'color a escurecer')}
	}
`
```

#### Não consegue ver as variaveis css
	* Mas existe uma funcionalidade dentro styled components que chama tema
		* Ai consegue acesso as variaveis no css e js

#### transparentize
	* Deixar uma cor mais transparente	
	* sintaxe
```js
transparentize(0.9, #000)
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

	* Configurando Miragejs
	```
	yarn add miragejs
	```

	```tsx
	useEffect(() => {
        fetch("/transactions")
            .then(res => res.json())
            .then(res => console.log(res.data))
    }, [])

	import { createServer } from "miragejs"

	createServer({
		routes() {
			this.namespace = "api";
			this.get("/transactions", () => {
			return [
				{
				id: 1,
				title: "Transaction 1",
				amount: 400,
				type: "deposit",
				category: "Food",
				createdAt: new Date()
				}
			]
		})
	}

	})
	```

* Criar uma rota para inserção de dados
```ts
this.post("/transacitons", (schema, request) => {
	const data = JSON.parse(request.requestBody)

	return data
})
```

* Criar banco no api fake
```ts
models: { //banco
	transaction: Model // nome primeira table: tipo
},
```

* Inserir no banco
	* Dentro de this.post("/transacitons)

```ts
return schema.create("nomeTable", data)
```

# Axios
* Pq usar ele em vez do fetch?
	* Pq fetch acaba precisando que coloca todo end do app
	* Consegue interceptar req e res pra api e converte pra json automaticamente

	```
	yarn add axios
	```

	* Criar arquivo api.ts
	```tsx
	// dentro services front, tem intuito de ser serviços de dados

	import axios from 'axios'

	export const api = axios.create({
		baseURL: "http://localhost:3000/api"
	})
	```

	* No que vai fazer req
	```tsx
	useEffect(() => {
        api.get("/transactions")
            .then(data => console.log(data))
    }, [])
	```

# 4. modal e forms
## Modal
* Biblioteca chamada [react-modal](https://github.com/reactjs/react-modal)
	* [Documentação](http://reactcommunity.org/react-modal/)
	* Traz funcionalidades prontas do modal
		* Como clicar esc e fechar
		* Clicar parte de fora e fechar

```
yarn add react-modal
```
* Cria um estado que anota pra ver se modal está aberto ou fechado
```tsx
import Modal from 'react-modal'
// qual el root da aplicação p modal, assim coloca dentro desse root e não dentro body direto
Modal.setAppElement('#yourAppElement')
function App() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // quando abrir modal
  function openModal() {
    setIsOpen(true);
  }

  // fechar modal
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
		//   indica se modal está aberto ou fechado
        isOpen={modalIsOpen}
		// diz oq deve fazer quando pedir pra fechar modal(clicar esc, clicar fora)
        onRequestClose={closeModal}
		// resetar a formatação padrão e estilizar
		overlayClassName="name-class-overlay"
		// vai ser aplicado ao content
		className="react-modal-content"
      >
	<restomodal></restomodal>
	</div>
```

```scss
.react-modal-overlay {

}

.react-modal-content {
	
}
```

## Definir interface type function como props
```tsx
interface HeaderProps {
	// nesse caso não recebe nenhum param, e não retorna nada
    onOpenNewTransactionModal: () => void
}

	export function Header({ onOpenNewTransactionModal }: HeaderProps) {}
```

## Ver se um botão está selecionado
```tsx
const [type, setType] = useState('deposit')

<button
	type="button"
	className={type === 'deposit' ? "active" : ""}
	onClick={() => { setType('deposit') }}
>
	<img src={incomeImg} alt="Entrada" />
	<span>Entrada</span>
</button>
```

* OU transforma o botão em um component no styled-components
	* Assim ele pode receber novas propriedades
	* Estiliza pela propriedade
	* Pode passar nome que quiser

```tsx

<RadioBox
	type="button"
	onClick={() => { setType('deposit') }}
	isActive={type === 'deposit'}
>
	<img src={incomeImg} alt="Entrada" />
	<span>Entrada</span>
</RadioBox>
```

```ts
// retornar erro mas é so criar interface em cima do radioBox
interface RadioBoxProps {
    isActive: boolean
}

export const RadioBox = styled.button<RadioBoxProps>`
// quando passar função dentro styled components, ela é chamada automáticamente passando as props do componente
	background: ${(props) => props.isActive ? "#eee" : "transaparent"}
`
```

# Formatação com Intl
* API nativa ja
* Formatar números
```js
new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL'
}).format(transaction.amount)
```

* Formatar Data
```js
 new Intl.DateTimeFormat('pt-BR').format(
	new Date(transaction.createdAt)
)
```


# 5. Contextos e hooks
## Introdução a contextos
* Pq usar e quando
	* Acessar dados de um componente dentro do outro
	* Daria para resolver passando os states para componente acima dele
		* Porém pode ficar meio sem nexo
		* Pode continuar carregando informações sem necessidade
		* Pode cair em problema chamado prop drilling
			* Quando fica passando uma propriedade vários subniveis para baixo
			* E não são bem propriedades e sim dados que quer passar de um component para outro

	* Em casos que precisa compartilhar uma informação um pouco mais complexa ou não parece estar no lugar correto, geralmente vai utilizar contextos
	* <h2>Resumo de que serve contextos</h2>
		* <strong>Compartilhamento de estado entre vários componentes da aplicação, independente de onde esses componentes estejam</strong>

## Forma simples de Criar
```ts
import { createContext } from 'react'

export const TransactionsContexts = createContext([]) //valor que vai iniciar
```

* Para acessar essas informações a partir de qual componente da aplicação utilizar o Provider
	* Pode colocar por volta de todo o App
	```tsx
	export function App() {
		return(
			<TransactionsContexts.Provider value={[]}> // pede um value que é o valor atual do contexto
			
			</TransactionsContexts.Provider>
		)
	}
	```

* Caso quiser que o contexto esteja para apenas alguns componentes, colocar o Provider pro volta deles somente
	* Da forma feita no exemplo todos os componentes tem acesso a eles

* Para obter o valor de um contexto em um componente
	1. Usando uma API do react (forma antiga)
	```tsx
	<TransactionsContexts.Consumer>
		{(data) => {
			console.log(data)
			return <p>ok</p>
		}}
	</TransactionsContexts.Consumer>
	```

	2. A partir dos hooks veio o useContext
	```tsx
	const data = useContext(TransactionsContexts)
	```

* Para acessar pode mover lógica para componente pai e no value colocar o state
	* Mas se ocorrer de ter mais de um contexto pode começa ficar complicado e poluir muito component App

	* Solução é no arquivo do contexto exportar uma função com a lógica e retornar o File.Provider (no ex: TransactionsContext.tsx)

* Props children
	* ReactNode aceita qualquer tipo de conteúdo válido p react
```tsx
interface InterfaceDoChildrenProps {
	children: ReactNode
}
```