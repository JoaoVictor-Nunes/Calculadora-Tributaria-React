import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTheme, Box, Typography, Alert, Collapse, Skeleton, TextField, Paper } from "@mui/material"
import { tokens } from "../Tema";
import EmailInput from "../Components/Inputs/EmailInput";
import ButtonUsage from "../Components/ButtonUsage";
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contatos = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const watchedFields = watch();

    const areAllFIeldsFilled =
        watchedFields.email &&
        watchedFields.name &&
        watchedFields.message &&
        watchedFields.phone;

    const isButtonDisabled = !areAllFIeldsFilled;

    const errorName = errors.name ? errors.name.message : "";
    const errorPhone = errors.phone ? errors.phone.message : "";
    const errorMessage = errors.message ? errors.message.message : "";

    const [alertVisible, setAlertVisible] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMapLoaded(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleMapLoaded = () => {
        setMapLoaded(true);
    }

    const onSubmit = (data) => {
        console.log("Dados enviados: ", data);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 2000);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "25vh",
            }}>
            <Typography variant="h1" align="center" sx={{ p: 1, mt: 2, fontWeight: "bold" }}>
                Nos contate!
            </Typography>

            <Typography variant="body1" align="center" sx={{ p: 2 }}>
                Perguntas? Dúvidas? Estamos aqui para ajudar! Entre em contato conosco:
            </Typography>

            <Box
                sx={{
                    mx: "auto",
                    px: 4,
                    py: 7,
                    backgroundColor: colors.primary[500],
                    borderRadius: 2,
                    borderColor: "#878787",
                    borderWidth: 1,
                    boxShadow: 3,
                    width: { xs: '92vw', sm: '90vw', md: '95vw', lg: 1200 },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: { xs: "100%", md: "50%" },
                        flexShrink: 0
                    }}
                >
                    <Box>
                        <TextField
                            label="Nome"
                            variant="outlined"
                            size="small"
                            sx={{
                                width: "100%",
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: colors.primary[500],
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
                            {...register("name", { required: "Nome é obrigatório!" })}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                minHeight: "20px",
                                fontWeight: "bold",
                                color: errors.name ? colors.redAccent[100] : "transparent",
                                visibility: errors.name ? "visible" : "hidden",
                                marginTop: "4px",
                                display: "block",
                                fontSize: "12px"
                            }}
                        >
                            {errorName}
                        </Typography>
                    </Box>

                    <EmailInput register={register} errors={errors} />

                    <Box>
                        <TextField
                            label="Telefone"
                            variant="outlined"
                            size="small"
                            placeholder="(99) 99999-9999"
                            sx={{
                                width: "100%",
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: colors.primary[500],
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
                            {...register("phone", {
                                required: "Telefone é obrigatório!",
                                pattern: {
                                    value: /^\(?\d{2}\)?\s?(?:9\d{4}|\d{4})-?\d{4}$/,
                                    message: "Formato de telefone inválido!",
                                },
                            })}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                minHeight: "20px",
                                fontWeight: "bold",
                                color: errors.phone ? colors.redAccent[100] : "transparent",
                                visibility: errors.phone ? "visible" : "hidden",
                                marginTop: "4px",
                                display: "block",
                                fontSize: "12px"
                            }}
                        >
                            {errorPhone}
                        </Typography>
                    </Box>


                    <Box>
                        <TextField
                            label="Mensagem"
                            variant="outlined"
                            size="small"
                            multiline
                            minRows={4}
                            sx={{
                                width: "100%",
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: colors.primary[500],
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
                            {...register("message", { required: "Mensagem é obrigatória!" })}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                minHeight: "20px",
                                fontWeight: "bold",
                                color: errors.message ? colors.redAccent[100] : "transparent",
                                visibility: errors.message ? "visible" : "hidden",
                                marginTop: "4px",
                                display: "block",
                                fontSize: "12px"
                            }}
                        >
                            {errorMessage}
                        </Typography>
                    </Box>

                    <ButtonUsage
                        type="submit"
                        disabled={isButtonDisabled}
                    >
                        Enviar
                    </ButtonUsage>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            mt: 2,
                            gap: 5
                        }}
                    >
                        <Typography variant="body1" sx={{
                            color: colors.grey[100],
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}
                        >
                            < EmailIcon />
                            naf01.dl@unichristus.edu.br
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: colors.grey[100],
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}
                        >
                            < InstagramIcon />
                            @naf.unichristus
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" },
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {mapLoaded ? (
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.344439541306!2d-38.493394099999996!3d-3.7349013999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7487d0c53520f%3A0xd568fa9590e225b9!2sR.%20Cel.%20Linhares%2C%20771%20-%20Meireles%2C%20Fortaleza%20-%20CE%2C%2060170-075!5e0!3m2!1spt-BR!2sbr!4v1760978253111!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="470"
                            style={{ border: 0, borderRadius: 8 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização do NAF"
                            onLoad={handleMapLoaded}
                        ></iframe>
                    ) : (
                        <Skeleton variant="rectangular"
                            sx={{
                                width: "100%",
                                height: 530,
                                borderRadius: 2,
                            }} />
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "block",
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: { xs: '92vw', sm: '90vw', md: '95vw', lg: 1200 },
                    mx: "auto",
                    mt: 2,
                    mb: 2,
                    px: 4,
                }}
            >
                <Collapse in={alertVisible}>
                    <Alert
                        severity="success"
                        onClose={() => setAlertVisible(false)}
                        sx={{
                            backgroundColor: colors.greenAccent[100],
                            color: colors.greenAccent[900],
                            width: "100%",
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', // centraliza horizontalmente
                            textAlign: 'center', // centraliza o texto
                            '& .MuiAlert-icon': {
                                color: colors.greenAccent[500],
                                fontSize: 'inherit',
                            },
                            '& .MuiAlert-message': {
                                fontSize: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1, // ocupa todo o espaço disponível
                                textAlign: 'center',
                            },
                        }}
                    >
                        Mensagem Enviada! Obrigado.
                    </Alert>
                </Collapse>
            </Box>
        </Box>
    )
}
export default Contatos;