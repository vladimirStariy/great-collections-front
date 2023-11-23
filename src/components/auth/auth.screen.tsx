import { useState } from 'react'
import { useLoginMutation, useRegisterMutation } from '../../store/services/auth.service';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form"

import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { authValidationSchema, loginValidationSchema } from './validation.schema';
import { useTranslation } from 'react-i18next';

interface IAuthFormData {
    email: string;
    password: string;
    name: string;
}

interface ILoginFormData {
    email: string;
    password: string;
}

const AuthScreen = () => {
    const [selected, setSelected] = useState<string>("login");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const [signup, {isLoading: signupLoading, error: signupError, isError: isRegisterError}] = useRegisterMutation();
    const [signin, {isLoading: signinLoading, error: signinError, isError: isLoginError}] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IAuthFormData>({resolver: yupResolver(authValidationSchema)})

    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        formState: loginFormState,
    } = useForm<ILoginFormData>({resolver: yupResolver(loginValidationSchema)})

    const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {
        await signup(data);
        setSelected("login")
    }

    const onLoginSubmit: SubmitHandler<ILoginFormData> = async (data) => {
        const response = await signin(data).unwrap();
        dispatch(setCredentials({access: response.access}))
        navigate('/my-collections');
    }

    return <>
        <div className="flex flex-col w-full items-center justify-center">
            <Card className="max-w-md w-full">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key.toString())}
                    >
                        <Tab key="login" title={`${t("loginTabName")}`}>
                            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col gap-4">
                                <div className='w-full text-center'>
                                    <Input {...loginRegister("email")}
                                        color={loginFormState.errors.email ? 'danger' : 'default'}
                                        label={`${t("emailInputLabel")}`} 
                                        placeholder={`${t("emailInputPlaceholder")}`}
                                        type="email" 
                                    />
                                    {loginFormState.errors.email ? <p className='text-danger'>{loginFormState.errors.email.message}</p> : <></>}
                                </div>
                                <div className='w-full text-center'>
                                    <Input {...loginRegister("password")}
                                        color={loginFormState.errors.password ? 'danger' : 'default'}
                                        label={`${t("passwordInputLabel")}`}
                                        placeholder={`${t("passwordInputPlaceholder")}`}
                                        type="password"
                                    />
                                    {loginFormState.errors.password ? <p className='text-danger'>{loginFormState.errors.password.message}</p> : <></>}
                                </div>
                                <p className="text-center text-small py-4">
                                    {`${t("needAccountLabel")}`}{" "}
                                    <Link className="cursor-pointer" size="sm" onPress={() => setSelected("sign-up")}>
                                        {`${t("needAccountSugnup")}`}
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button isLoading={signinLoading} onSubmit={handleLoginSubmit(onLoginSubmit)} type='submit' fullWidth color="primary">
                                        {`${t("loginTabName")}`}
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title={`${t("signupTabName")}`}>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div className='w-full text-center'>
                                    <Input {...register("name")} 
                                        color={errors.name ? 'danger' : 'default'}
                                        label={`${t("nameInputLabel")}`}
                                        placeholder={`${t("nameInputPlaceholder")}`} 
                                        type="text" 
                                    />
                                    {errors.name ? <p className='text-danger'>{errors.name.message}</p> : <></>}
                                </div>
                                <div className='w-full text-center'>
                                    <Input {...register("email")} 
                                        color={errors.email ? 'danger' : 'default'}
                                        label={`${t("emailInputLabel")}`}
                                        placeholder={`${t("emailInputPlaceholder")}`} 
                                        type="email" 
                                    />
                                    {errors.email ? <p className='text-danger'>{errors.email.message}</p> : <></>}
                                </div>
                                <div className='w-full text-center'>
                                    <Input {...register("password")}
                                        color={errors.password ? 'danger' : 'default'}
                                        label={`${t("passwordInputLabel")}`}
                                        placeholder={`${t("passwordInputPlaceholder")}`}
                                        type="password"
                                    />
                                    {errors.password ? <p className='text-danger'>{errors.password.message}</p> : <></>}
                                </div>
                                <p className="text-center text-small py-4">
                                    {`${t("hasAccountLabel")}`}{" "}
                                    <Link className="cursor-pointer" size="sm" onPress={() => setSelected("login")}>
                                        {`${t("hasAccountLogin")}`} 
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button isLoading={signupLoading} type='submit' fullWidth color="primary">
                                        {`${t("signupTabName")}`}
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    </>
}

export default AuthScreen;