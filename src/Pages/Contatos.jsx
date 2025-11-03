import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTheme, Box, Typography, Alert, Collapse, Skeleton, TextField } from "@mui/material"
import { tokens } from "../Tema";
import EmailInput from "../Components/Inputs/EmailInput";
import ButtonUsage from "../Components/ButtonUsage";
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';

const Contatos = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // useForm do react-hook-form para controlar o formulário
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // Watch monitora os campos para validação em tempo real
    const watchedFields = watch();

    // Verifica se todos os campos principais estão preenchidos
    const areAllFIeldsFilled =
        watchedFields.email &&
        watchedFields.name &&
        watchedFields.message &&
        watchedFields.phone;


    // Desabilita o botão se algum campo estiver vazio
    const isButtonDisabled = !areAllFIeldsFilled;

    // Extrai mensagens de erro para cada campo ou string vazia se não houver erro
    const errorName = errors.name ? errors.name.message : "";
    const errorPhone = errors.phone ? errors.phone.message : "";
    const errorMessage = errors.message ? errors.message.message : "";

    // ESTADOS DA APLICAÇÃO
    const [alertVisible, setAlertVisible] = useState(false); // Controla visibilidade do alerta de sucesso
    const [mapLoaded, setMapLoaded] = useState(false); // Controla carregamento do mapa

    // Define um timeout para mostrar o skeleton loading por 3 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setMapLoaded(true);
        }, 3000);

        return () => clearTimeout(timer); // Cleanup do timeout
    }, []);

    // HANDLER DE CARREGAMENTO DO MAPA
    // Chamado quando o iframe do mapa termina de carregar
    const handleMapLoaded = () => {
        setMapLoaded(true);
    }

    // SUBMISSÃO DO FORMULÁRIO
    // Processa os dados do formulário e mostra alerta de sucesso
    const onSubmit = (data) => {
        console.log("Dados enviados: ", data);
        setAlertVisible(true);
        // Auto-esconde o alerta após 2 segundos
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
            {/* CABEÇALHO DA PÁGINA */}
            <Typography variant="h1" align="center" sx={{  fontWeight: "bold" }}>
                Nos contate!
            </Typography>

            {/* DESCRIÇÃO DA PÁGINA */}
            <Typography variant="body1" align="center" sx={{ p: 2 }}>
                Perguntas? Dúvidas? Estamos aqui para ajudar! Entre em contato conosco:
            </Typography>

            {/* CONTAINER PRINCIPAL DO CONTEÚDO */}
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
                    flexDirection: { xs: "column", md: "row" }, // Responsivo: coluna em mobile, linha em desktop
                    gap: 4,
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}>

                {/* FORMULÁRIO DE CONTATO (lado esquerdo) */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: { xs: "100%", md: "50%" }, // 100% em mobile, 50% em desktop
                        flexShrink: 0
                    }}
                >
                    {/* INPUT NOME */}
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
                        {/*  MENSAGEM DE ERRO DO NOME */}
                        <Typography
                            variant="caption"
                            sx={{
                                minHeight: "20px",
                                fontWeight: "bold",
                                color: errors.name ? colors.redAccent[100] : "transparent", // Vermelho se erro, transparente se não
                                visibility: errors.name ? "visible" : "hidden", // Mostra apenas se houver erro
                                marginTop: "4px",
                                display: "block",
                                fontSize: "12px"
                            }}
                        >
                            {errorName}
                        </Typography>
                    </Box>

                    {/*  COMPONENTE EMAIL INPUT REUTILIZÁVEL */}
                    <EmailInput register={register} errors={errors} />

                    {/* INPUT TELEFONE */}
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
                                    value: /^\(?\d{2}\)?\s?(?:9\d{4}|\d{4})-?\d{4}$/, // Regex para validar telefone brasileiro
                                    message: "Formato de telefone inválido!",
                                },
                            })}
                        />
                        {/*  MENSAGEM DE ERRO DO TELEFONE */}
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

                    {/*  INPUT MENSAGEM (Textarea) */}
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
                        {/*  MENSAGEM DE ERRO DA MENSAGEM */}
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

                    {/*  BOTÃO DE ENVIAR REUTILIZÁVEL */}
                    <ButtonUsage
                        type="submit"
                        disabled={isButtonDisabled}
                    >
                        Enviar
                    </ButtonUsage>

                    {/*  INFORMAÇÕES DE CONTATO ALTERNATIVAS */}
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
                        {/*  EMAIL NAF */}
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
                        
                        {/*  INSTAGRAM NAF */}
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

                {/*  MAPA DE LOCALIZAÇÃO (lado direito) */}
                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" }, // 100% em mobile, 50% em desktop
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    {mapLoaded ? (
                        // 🔗 localização no Google Maps da sede do NAF
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.344439541306!2d-38.4933941!3d-3.7349014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c7487d0c53520f%3A0xd568fa9590e225b9!2sR.%20Cel.%20Linhares%2C%20771%20-%20Meireles%2C%20Fortaleza%20-%20CE%2C%2060170-075!5e0!3m2!1spt-BR!2sbr"
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
                        //  SKELETON LOADING ENQUANTO MAPA CARREGA
                        <Skeleton variant="rectangular"
                            sx={{
                                width: "100%",
                                height: 470,
                                borderRadius: 2,
                            }} />
                    )}
                </Box>
            </Box>

            {/*  ALERTA DE SUCESSO (Após envio do formulário) */}
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
                            justifyContent: 'center', // Centraliza horizontalmente
                            textAlign: 'center', // Centraliza o texto
                            '& .MuiAlert-icon': {
                                color: colors.greenAccent[500],
                                fontSize: 'inherit',
                            },
                            '& .MuiAlert-message': {
                                fontSize: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1, // Ocupa todo o espaço disponível
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