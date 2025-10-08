import React from "react";
import TextField from "@mui/material/TextField";

const EmailInput = ({ register, errors }) => {
  return (
    <div>
      <TextField
        label="Email"
        variant="outlined"
        sx={{ width: "100%" }}
        {...register("email", {
          required: "Email é obrigatório",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Formato de email inválido",
          },
        })}
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message}</p>
      )}
    </div>
  );
};

export default EmailInput;
