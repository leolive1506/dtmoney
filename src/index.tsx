import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from "miragejs"

createServer({
  models: { //banco
    transaction: Model // nome primeira table: tipo
  },

  // definir para começar com alguns valores no banco
  seeds(server) {
    server.db.loadData({
      transactions: [ // nome table no plural
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00')
        },
      ]
    })
  },
  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return this.schema.all("transaction")
    })

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create("transaction", data)
    })
  }

})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

