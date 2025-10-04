import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EmailInput from "../../Components/EmailInput";
import PasswordInput from "../../Components/PasswordInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./RegisterStyles.css";

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Dados enviados: ", data);
    navigate("/Home");
  };

  return (
       <div className="flex items-center justify-center min-h-screen">

    <div className="container mx-auto px-4 py-8 max-w-md bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8">Registrar</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <TextField
          label="Nome"
          variant="outlined"
          sx={{ 
            width: '100%', 
          }}
          {...register("name", { required: "Nome é obrigatório" })}
          >Nome:</TextField>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <EmailInput
          register={register}
          errors={errors}
        />

        <PasswordInput
          register={register}
          errors={errors}
        />

        <div>
          <TextField
          label="Confirme a Senha"
          variant="outlined"
          sx={{ width: '100%' }}
            type="password"
            {...register("confirmPassword", {
              required: "Confirmação obrigatória",
              validate: (value) =>
                value === password || "As senhas não coincidem!"
            })}
          >Confirme a Senha:</TextField>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="myButton"
        >
          Registrar
        </Button>

        <Button
          onClick={() => navigate("/")}
          className="myButton"
        >
          Já possui uma conta?
        </Button>
      </form>
    </div>
    </div>
  );
};

export default Register;
