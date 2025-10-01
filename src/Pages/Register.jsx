import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Dados enviados: ", data);
    navigate("/Home");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-8">Registrar</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome:
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Nome é obrigatório" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email e obrigatorio", pattern: {
                value: /^\S+@\S+$/i, message: "Formato de email invalido"
              }
            })}
             className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirmação obrigatória",
              validate: (value) =>
                value === password || "As senhas não coincidem!"
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"

          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Registrar
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Já possui uma conta?
        </button>
      </form>
    </div>
  );
};

export default Register;
