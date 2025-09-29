import React from "react";

const Explicacao = () => {
  return (
    <div className="py-6 ">
      <h2 className="font-bold justify-center items-center flex">
        Sobre a tributacao:
      </h2>
      <h4 className="px-6 py-5">
        A tributacao serve para a arrecadacao de tributos com a finalidade de
        financiar seus gastos publicos como saude, educacao, seguranca etc.
      </h4>
      <div className="flex py-6">
        <div className="border border-grey-700 rounded-md mx-5 px-5">
          <h3 className="font-bold">Renda Mensal:</h3>
          <p>
            "É o valor que você espera receber por mês com o seu trabalho. No
            caso da psicologia, pode ser o total recebido das consultas,
            atendimentos ou serviços prestados, antes de descontar as despesas."
          </p>
        </div>
        <div className="border border-grey-500 rounded-md px-5 mx-5">
          <h3 className="font-bold">Custos Mensais:</h3>
          <p>
            "São os gastos mensais necessários para o seu trabalho acontecer,
            escritório, entre outros. Essas despesas podem ser usadas para
            reduzir a base de cálculo do imposto (no caso da pessoa física)."
          </p>
        </div>
      </div>
      <div>
        <h2 className="font-bold py-2 flex flex-wrap justify-center items-center">
          Tabela mensal do Imposto de Renda
        </h2>
        <h4 className="flex flex-wrap py-2 justify-center items-center">
          Tabela Progressiva Mensal
        </h4>
        <div className="p-4 flex flex-wrap justify-center items-center">
          <table className="table-auto border-collapse border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700 px-4 py-1">
                  Base do Cálculo (R$)
                </th>
                <th className="border border-gray-700 px-4 py-1">
                  Alíquota (%)
                </th>
                <th className="border border-gray-700 px-4 py-1">
                  Parcela a Deduzir do IR (R$)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-700 px-4 py-2">
                  Até 2.428,80
                </td>
                <td className="border border-gray-700 px-4 py-2">0</td>
                <td className="border border-gray-700 px-4 py-2">0</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">
                  De 2.428,81 até 2.826,65
                </td>
                <td className="border border-gray-700 px-4 py-2">7,5</td>
                <td className="border border-gray-700 px-4 py-2">182,16</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">
                  De 2.826,66 até 3.751,05
                </td>
                <td className="border border-gray-700 px-4 py-2">15</td>
                <td className="border border-gray-700 px-4 py-2">394,16</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-2">
                  De 3.751,06 até 4.664,68
                </td>
                <td className="border border-gray-700 px-4 py-2">22,5</td>
                <td className="border border-gray-700 px-4 py-2">675,49</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="border border-gray-700 px-4 py-2">
                  Acima de 4.664,68
                </td>
                <td className="border border-gray-700 px-4 py-2">27,5</td>
                <td className="border border-gray-700 px-4 py-2">908,73</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div>
        <h2 className="font-bold justify-center items-center flex flex-wrap">
          Como sao realizadas as contas?{" "}
        </h2>
        <div className="py-4 mx-6 my-4 border border-gray-700">
          <h4 className="font-bold justify-center items-center flex flex-wrap mb-2">
            Para Pessoa fisica:
          </h4>
          <div className="px-4">
            <p>Vamos entender por meio de um exemplo: </p>
            <p>
              Hipoteticamente, vamos dizer que voce ganha R$ 3.000,00 e seus
              custos mensais sao R$ 750,00, Ok?
            </p>
            <p>
              Com isso, o site vai comecar Subtraindo os seus{" "}
              <span className="text-blue-500">Custos mensais</span> da sua{" "}
              <span className="text-blue-500">Renda mensal</span>
            </p>
            <p>
              Depois, a Base vai dar R$ 2.250, o programa vai comparar com as
              bases de calculo da tabela, para ver se o valor 'e maior ou menor.
              No caso, eh menor que R$ 2.428,80, portanto, voce seria isento.
            </p>
            <p>
              Agora, que voces ja entenderam como se calcula uma Base(Renda
              mensal - Custos mensais), vamos imaginar uma situacao onde a Base
              seja maior e que seja tributada.
            </p>
            <p>
              Iremos usar de exemplo uma Base de R$ 3.000,00, neste caso, o
              programa compararia e perceberia que esta entre 2.826,66 e
              3.751,05, ou seja, ele sera taxado.
            </p>
            <p>
              Tendo isso em mente, o programa ira fazer (3.000(Base) *
              0,15(Aliquota em %))- 394,16 = R$ 55,84{" "}
            </p>
            <p>
              Portanto, neste caso, voce pagaria R$ 55,84 de Imposto de Renda!
            </p>
          </div>
        </div>
        <div className="py-4 mx-6 my-4 border border-gray-700">
          <h4 className="font-bold justify-center items-center flex flex-wrap mb-2">
            Para pessoa juridica:{" "}
          </h4>
          <ul>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Explicacao;
