import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Dados enviados: ', data);
    if (!data.password) {
      alert("senha vazia");
      return;
    }
    navigate("/Home");
  };

  return (
    <div className="container mx-auto px-4 py-7 max-w-md bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email e obrigatorio", pattern: {
                value: /^\S+@\S+$/i, message: "Formato de email invalido"
              }
            })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Senha:
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Senha é obrigatória!",
              minLength: {
                value: 6,
                message: "Senha deve ter no mínimo 6 caracteres"
              },
              pattern: {
                value: /^(?=.*[0-9]).*$/,
                message: "Sua senha deve conter pelo menos um número"
              }
            })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"

        >
          Entrar
        </button>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => navigate("/Register")}
        >
          Nao possui uma conta?
        </button>
      </form>
    </div>
  );
};

export default Login;
