import React from "react";
import TextField from "@mui/material/TextField";

const PasswordInput = ({ register, errors }) => {
    return (
        <div>
            <div>
                <TextField
                label="Senha"
                variant="outlined"
                type="password"
                sx={{width: '100%'}}
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
                    })}>Senha</TextField>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
        </div>
    );
};

export default PasswordInput;
