import { createContext, useEffect, useState, ReactNode } from 'react'
import { api } from './services/api'

interface Transaction {
    id: number,
    title: string,
    type: string,
    category: string,
    amount: number,
    createdAt: string
}

interface TransactionsProviderProps {
    children: ReactNode
}

// interface TransactionInput {
//     title: string,
//     value: string,
//     category: string,
//     type: string
// } // mesma coisa abaixo

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>
}


export const TransactionsContexts = createContext<TransactionsContextData>(
    {} as TransactionsContextData // forçar parar o erro
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        console.log(transactions)
        api.get("/transactions")
            .then(res => setTransactions(res.data.transactions))
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post("/transactions", {
            ...transactionInput,
            createdAt: new Date()
        })

        const { transaction } = response.data


        setTransactions([
            ...transactions, transaction
        ])
    }

    return (
        <TransactionsContexts.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContexts.Provider>
    )
}