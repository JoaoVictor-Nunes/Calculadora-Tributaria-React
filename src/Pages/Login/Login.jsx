import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import EmailInput from "../../Components/Inputs/EmailInput";
import ButtonUsage from "../../Components/ButtonUsage";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Dados enviados: ', data);
    navigate("/Home");
  };

  return (
   <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 py-7 max-w-md bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <EmailInput
            register={register}
            errors={errors}
          />
          <PasswordInput
            register={register}
            errors={errors}
          />
          <ButtonUsage
            type="submit"
          >
            Entrar
          </ButtonUsage>
          <ButtonUsage
            onClick={() => navigate("/Register")}
          >
            Nao possui uma conta?
          </ButtonUsage>
        </form>
      </div>
    </div>
  );
};

export default Login;
