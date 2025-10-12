import React from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";

const PasswordInput = ({ register, errors }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <div>
                <TextField
                    label="Senha"
                    variant="outlined"
                    type="password"
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: colors.primary[100],
                            '& fieldset': {
                                borderColor: colors.grey[300],
                            },
                            '&:hover fieldset': {
                                borderColor: colors.blueAccent[500],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: colors.blueAccent[500],
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: colors.grey[600],
                            '&.Mui-focused': {
                                color: colors.blueAccent[500],
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            color: colors.grey[900],
                        },
                    }}
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
                {errors.password && (
                    <p style={{ color: colors.redAccent[500], marginTop: '4px', fontSize: '0.875rem' }}>
                        {errors.password.message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PasswordInput;
