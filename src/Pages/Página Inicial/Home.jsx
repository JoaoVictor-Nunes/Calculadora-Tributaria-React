import React, { useState } from "react";
import ModalCalculoPF from "../../Components/Modals/ModalCalculoPF"
import ModalCalculoPJ from "../../Components/Modals/ModalCalculoPJ"
import ModalExplicacoes from "../../Components/Modals/ModalExplicacoes"

const Home = () => {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Calculadora de Tributação
      </h1>
      <div className="text-center">
        <p className="text-lg mb-6">
          Bem-vindo à calculadora de tributação para Pessoa Física e Pessoa Jurídica
        </p>
        <div className="space-y-4">
          <p>Escolha uma das opções no menu acima para começar:</p>
          <ModalCalculoPF />
          <ModalCalculoPJ />
          <ModalExplicacoes />
        </div>
      </div>
    </div>
  );
};

export default Home;
