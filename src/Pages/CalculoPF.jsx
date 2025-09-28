import React, { useState } from "react";

const CalculoPF = () => {
  const [formData, setFormData] = useState({
    rendaBruta: "",
    dependentes: "0",
    despesasDeduciveis: ""
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calcularIRPF = () => {
    const rendaBruta = parseFloat(formData.rendaBruta) || 0;
    const dependentes = parseInt(formData.dependentes) || 0;
    const despesasDeduciveis = parseFloat(formData.despesasDeduciveis) || 0;

    // Dedução por dependente (2024)
    const deducaoPorDependente = 2275.08;
    const totalDeducaoDependentes = dependentes * deducaoPorDependente;

    // Base de cálculo
    const baseCalculo = rendaBruta - totalDeducaoDependentes - despesasDeduciveis;

    // Alíquotas e faixas do IRPF 2024
    let imposto = 0;
    let aliquotaEfetiva = 0;

    if (baseCalculo <= 22847.76) {
      imposto = 0;
      aliquotaEfetiva = 0;
    } else if (baseCalculo <= 33919.80) {
      imposto = (baseCalculo - 22847.76) * 0.075;
      aliquotaEfetiva = (imposto / rendaBruta) * 100;
    } else if (baseCalculo <= 45012.60) {
      imposto = (33919.80 - 22847.76) * 0.075 + (baseCalculo - 33919.80) * 0.15;
      aliquotaEfetiva = (imposto / rendaBruta) * 100;
    } else if (baseCalculo <= 55976.16) {
      imposto = (33919.80 - 22847.76) * 0.075 + (45012.60 - 33919.80) * 0.15 + (baseCalculo - 45012.60) * 0.225;
      aliquotaEfetiva = (imposto / rendaBruta) * 100;
    } else {
      imposto = (33919.80 - 22847.76) * 0.075 + (45012.60 - 33919.80) * 0.15 + (55976.16 - 45012.60) * 0.225 + (baseCalculo - 55976.16) * 0.275;
      aliquotaEfetiva = (imposto / rendaBruta) * 100;
    }

    setResultado({
      rendaBruta,
      dependentes,
      despesasDeduciveis,
      totalDeducaoDependentes,
      baseCalculo,
      imposto,
      aliquotaEfetiva: aliquotaEfetiva.toFixed(2),
      rendaLiquida: rendaBruta - imposto
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Cálculo de Tributação - Pessoa Física (IRPF)
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label htmlFor="rendaBruta" className="block text-sm font-medium mb-2">
              Renda Bruta Anual (R$):
            </label>
            <input
              type="number"
              id="rendaBruta"
              name="rendaBruta"
              value={formData.rendaBruta}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua renda bruta anual"
            />
          </div>

          <div>
            <label htmlFor="dependentes" className="block text-sm font-medium mb-2">
              Número de Dependentes:
            </label>
            <input
              type="number"
              id="dependentes"
              name="dependentes"
              value={formData.dependentes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div>
            <label htmlFor="despesasDeduciveis" className="block text-sm font-medium mb-2">
              Despesas Dedutíveis (R$):
            </label>
            <input
              type="number"
              id="despesasDeduciveis"
              name="despesasDeduciveis"
              value={formData.despesasDeduciveis}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Gastos com saúde, educação, etc."
            />
          </div>

          <button
            type="button"
            onClick={calcularIRPF}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calcular IRPF
          </button>
        </form>

        {resultado && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Resultado do Cálculo:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Renda Bruta:</span>
                <span className="ml-2">R$ {resultado.rendaBruta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="font-medium">Dependentes:</span>
                <span className="ml-2">{resultado.dependentes}</span>
              </div>
              <div>
                <span className="font-medium">Dedução por Dependentes:</span>
                <span className="ml-2">R$ {resultado.totalDeducaoDependentes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="font-medium">Despesas Dedutíveis:</span>
                <span className="ml-2">R$ {resultado.despesasDeduciveis.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="font-medium">Base de Cálculo:</span>
                <span className="ml-2">R$ {resultado.baseCalculo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="font-medium">Alíquota Efetiva:</span>
                <span className="ml-2">{resultado.aliquotaEfetiva}%</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium text-red-600">Imposto Devido:</span>
                <span className="ml-2 text-red-600 font-bold">R$ {resultado.imposto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="col-span-2">
                <span className="font-medium text-green-600">Renda Líquida:</span>
                <span className="ml-2 text-green-600 font-bold">R$ {resultado.rendaLiquida.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculoPF;
