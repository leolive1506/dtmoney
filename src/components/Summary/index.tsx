import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { useTransaction } from "../../hooks/useTransactions";

import { Container } from "./styles";

export function Summary() {
    const { transactions } = useTransaction()

    // const totalDeposits = transactions.reduce((acc, transaction) => {
    //     if (transaction.type === 'deposit') {
    //         return acc + transaction.amount
    //     }

    //     return acc
    // }, 0)

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount
        } else {
            acc.withdraws += transaction.amount
            acc.total -= transaction.amount
        }

        return acc

    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    function formatCurrency(number: number) {
        const inCurrency = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(number)

        return inCurrency
    }


    return (
        <Container>

            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>

                <strong>
                    {
                        formatCurrency(summary.deposits)
                    }
                </strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>

                <strong>- {formatCurrency(summary.withdraws)}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>

                <strong>
                    {formatCurrency(summary.total)}
                </strong>
            </div>
        </Container>
    )
}