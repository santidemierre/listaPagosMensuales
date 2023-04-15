import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    const savedPayments = JSON.parse(localStorage.getItem('payments')) || [];

    this.state = {
      payments: savedPayments,
      newPaymentDescription: '',
      newPaymentAmount: '',
    };

    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.handleNewPaymentDescriptionChange = this.handleNewPaymentDescriptionChange.bind(this);
    this.handleNewPaymentAmountChange = this.handleNewPaymentAmountChange.bind(this);
    this.handleNewPaymentSubmit = this.handleNewPaymentSubmit.bind(this);
  }

  handlePaymentChange(id) {
    const { payments } = this.state;
    const paymentIndex = payments.findIndex((payment) => payment.id === id);
    const updatedPayments = [...payments];

    updatedPayments[paymentIndex] = {
      ...updatedPayments[paymentIndex],
      paid: !updatedPayments[paymentIndex].paid,
      paidDate: !updatedPayments[paymentIndex].paid ? new Date().toLocaleString() : null,
    };

    this.setState({
      payments: updatedPayments,
    });

    localStorage.setItem('payments', JSON.stringify(updatedPayments));
  }

  handleNewPaymentDescriptionChange(event) {
    this.setState({ newPaymentDescription: event.target.value });
  }

  handleNewPaymentAmountChange(event) {
    this.setState({ newPaymentAmount: event.target.value });
  }

  handleNewPaymentSubmit(event) {
    event.preventDefault();

    const { payments, newPaymentDescription, newPaymentAmount } = this.state;
    const newPayment = {
      id: Math.max(...payments.map((payment) => payment.id), 0) + 1,
      description: newPaymentDescription,
      amount: newPaymentAmount,
      dueDate: new Date().toISOString().substring(0, 10),
      paid: false,
      paidDate: null,
    };

    const updatedPayments = [...payments, newPayment];

    this.setState({
      payments: updatedPayments,
      newPaymentDescription: '',
      newPaymentAmount: '',
    });

    localStorage.setItem('payments', JSON.stringify(updatedPayments));
  }

  render() {
    const { payments, newPaymentDescription, newPaymentAmount } = this.state;

    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-stone-800 text-center mb-10">Lista de Pagos Realizados</h1>
        {payments.map((payment) => (
          <div key={payment.id} className="flex items-center mt-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={payment.paid}
              onChange={() => this.handlePaymentChange(payment.id)}
            />
            <div className={`flex flex-grow items-center justify-between ${payment.paid ? 'line-through text-gray-500' : ''}`}>
              <div className="text-left pr-2">{payment.description}</div>
              <div className="flex justify-center items-center w-1/3 bg-blue-200 text-right p-2 rounded-lg">
                ${payment.amount}
              </div>
              <div className="text-right pl-2">{payment.paidDate}</div>
            </div>
          </div>
        ))}


        <form onSubmit={this.handleNewPaymentSubmit} className="mt-4">
          <label className="block font-bold mb-2 text-teal-600 text-xl animate-bounce">Agregar Pago</label>
          <div className="flex flex-col w-full">
            <input
              type="text"
              className="border border-gray-400 p-2 w-full mb-4 mr-2"
              placeholder="Descripción del pago"
              value={newPaymentDescription}
              onChange={this.handleNewPaymentDescriptionChange}
            />
            <input
              type="number"
              className="border border-gray-400 p-2 w-full"
              placeholder="Monto pagado"
              value={newPaymentAmount}
              onChange={this.handleNewPaymentAmountChange}
            />
          </div>
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded w-full">
            Agregar
          </button>
        </form>

      </div>
    );
  }
}
export default App;         
