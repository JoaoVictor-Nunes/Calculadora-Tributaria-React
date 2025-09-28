import React, { useState } from "react";

const CalculoPJ = () => {
  const [formData, setFormData] = useState({
    faturamento: "",
    regimeTributario: "simples",
    despesas: ""
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calcularTributacao = () => {
    const faturamento = parseFloat(formData.faturamento) || 0;
    const despesas = parseFloat(formData.despesas) || 0;
    const lucroBruto = faturamento - despesas;

    let impostos = 0;
    let aliquota = 0;

    if (formData.regimeTributario === "simples") {
      // Simples Nacional - alíquotas aproximadas
      if (faturamento <= 180000) {
        aliquota = 0.06; // 6%
      } else if (faturamento <= 360000) {
        aliquota = 0.112; // 11.2%
      } else if (faturamento <= 720000) {
        aliquota = 0.135; // 13.5%
      } else if (faturamento <= 1800000) {
        aliquota = 0.16; // 16%
      } else if (faturamento <= 3600000) {
        aliquota = 0.21; // 21%
      } else {
        aliquota = 0.33; // 33%
      }
      impostos = faturamento * aliquota;
    } else if (formData.regimeTributario === "presumido") {
      // Lucro Presumido - alíquotas aproximadas
      aliquota = 0.32; // 32% sobre o lucro presumido
      const lucroPresumido = faturamento * 0.32; // 32% do faturamento
      impostos = lucroPresumido * aliquota;
    } else {
      // Lucro Real
      aliquota = 0.25; // 25% sobre o lucro real
      impostos = Math.max(0, lucroBruto * aliquota);
    }

    setResultado({
      faturamento,
      despesas,
      lucroBruto,
      impostos,
      aliquota: (aliquota * 100).toFixed(2),
      lucroLiquido: lucroBruto - impostos
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Cálculo de Tributação - Pessoa Jurídica
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label htmlFor="faturamento" className="block text-sm font-medium mb-2">
              Faturamento Mensal (R$):
            </label>
            <input
              type="number"
              id="faturamento"
              name="faturamento"
              value={formData.faturamento}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o faturamento mensal"
            />
          </div>

          <div>
            <label htmlFor="regimeTributario" className="block text-sm font-medium mb-2">
              Regime Tributário:
            </label>
            <select
              id="regimeTributario"
              name="regimeTributario"
              value={formData.regimeTributario}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="simples">Simples Nacional</option>
              <option value="presumido">Lucro Presumido</option>
              <option value="real">Lucro Real</option>
            </select>
          </div>

          <div>
            <label htmlFor="despesas" className="block text-sm font-medium mb-2">
              Despesas Mensais (R$):
            </label>
            <input
              type="number"
              id="despesas"
              name="despesas"
              value={formData.despesas}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite as despesas mensais"
            />
          </div>

          <button
            type="button"
            onClick={calcularTributacao}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calcular Tributação
          </button>
        </form>

        {resultado && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Resultado do Cálculo:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Faturamento:</span>
                <span className="ml-2">R$ {resultado.faturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="font-medium">Despesas:</span>
                <span className="ml-2">R$ {resultado.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="font-medium">Lucro Bruto:</span>
                <span className="ml-2">R$ {resultado.lucroBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="font-medium">Alíquota:</span>
                <span className="ml-2">{resultado.aliquota}%</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium text-red-600">Impostos Devidos:</span>
                <span className="ml-2 text-red-600 font-bold">R$ {resultado.impostos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium text-green-600">Lucro Líquido:</span>
                <span className="ml-2 text-green-600 font-bold">R$ {resultado.lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculoPJ;
