import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../Components/PasswordInput";
import EmailInput from "../Components/EmailInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
          <Button
            type="submit"
            sx={{
              width: "100%",
              bgcolor: "#3b82f6",
              color: "white",
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#2563eb",
              },
            }}
          >
            Entrar
          </Button>
          <Button
            sx={{
              width: "100%",
              bgcolor: "#3b82f6",
              color: "white",
              py: 1.5,
              mt: 2,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#2563eb",
              },
            }}
            onClick={() => navigate("/Register")}
          >
            Nao possui uma conta?
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
