import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../Tema";
import Typography from "@mui/material/Typography";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

const PasswordInput = ({ register, errors }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [showPassword, setShowPassword] = useState(false);

    const errorMessage = errors.password ? errors.password.message : "Mensagem de erro";
    return (
        <div>
            <div>
                <TextField
                    label="Senha"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: "100%",
                        '& .MuiOutlinedInput-root': {
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
                            color: colors.grey[300],
                            '&.Mui-focused': {
                                color: colors.blueAccent[500],
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            color: colors.grey[100],
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
                {/* {errors.password && (
                    <p style={{ color: colors.redAccent[500], marginTop: '4px', fontSize: '0.875rem' }}>
                        {errors.password.message}
                    </p>
                )} */}
                <Typography
                    variant="caption"
                    sx={{
                        minHeight: "20px",
                        fontWeight: "bold",
                        color: errors.password ? colors.redAccent[100] : "transparent",
                        visibility: errors.email ? "visible" : "hidden",
                        marginTop: "4px",
                        display: "block",
                    }}
                >
                    {errorMessage}
                </Typography>
            </div>
        </div>
    );
};

export default PasswordInput;
