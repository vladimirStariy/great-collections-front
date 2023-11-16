import { useState, useEffect } from 'react'
import InputGroup from '../../UI/input-group/input.group';
import { IRegisterRequest } from '../../store/models/auth';
import { useLoginMutation, useRegisterMutation } from '../../store/services/auth.service';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

import { isErrorWithMessage, isFetchBaseQueryError } from '../../store/error-helpers/error.typifier';

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, SubmitHandler } from "react-hook-form"

import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { authValidationSchema } from './validation.schema';

interface IAuthFormData {
    email: string;
    password: string;
    name: string;
}

const AuthScreen = () => {
    const [selected, setSelected] = useState<string>("login");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signup, {isLoading: signupLoading, error: signupError, isError: isRegisterError}] = useRegisterMutation();
    const [signin, {isLoading: signinLoading, error: signinError, isError: isLoginError}] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAuthFormData>({resolver: yupResolver(authValidationSchema)})

    const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {
        if(selected === "sign-up") {
            await signup(data);
            setSelected("login")
        } else {
            const response = await signin(data).unwrap();
            dispatch(setCredentials({access: response.access}))
            navigate('/my-collections');
        }
    }

    const checker = () => {
        console.log(errors)
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
                        <Tab key="login" title="Login">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div className='w-full text-center'>
                                    <Input {...register("email")}
                                        color={errors.email ? 'danger' : 'default'}
                                        label="Email" 
                                        placeholder="Enter your email" 
                                        type="email" 
                                    />
                                    {errors.email ? <p className='text-danger'>{errors.email.message}</p> : <></>}
                                </div>
                                <div className='w-full text-center'>
                                    <Input {...register("password")}
                                        color={errors.password ? 'danger' : 'default'}
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    {errors.password ? <p className='text-danger'>{errors.password.message}</p> : <></>}
                                </div>
                                <p className="text-center text-small py-4">
                                    Need to create an account?{" "}
                                    <Link className="cursor-pointer" size="sm" onPress={() => setSelected("sign-up")}>
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button onClick={checker} type='submit' fullWidth color="primary">
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title="Sign up">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div className='w-full text-center'>
                                    <Input {...register("name")} 
                                        color={errors.password ? 'danger' : 'default'}
                                        label="Name" 
                                        placeholder="Enter your name" 
                                        type="text" 
                                    />
                                    {errors.name ? <p className='text-danger'>{errors.name.message}</p> : <></>}
                                </div>
                                <div className='w-full text-center'>
                                    <Input {...register("email")} 
                                        color={errors.password ? 'danger' : 'default'}
                                        label="Email" 
                                        placeholder="Enter your email" 
                                        type="email" 
                                    />
                                    {errors.email ? <p className='text-danger'>{errors.email.message}</p> : <></>}
                                </div>
                                <div className='w-full text-center'>
                                    <Input {...register("password")}
                                        color={errors.password ? 'danger' : 'default'}
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    {errors.password ? <p className='text-danger'>{errors.password.message}</p> : <></>}
                                </div>
                                <p className="text-center text-small py-4">
                                    Already have an account?{" "}
                                    <Link className="cursor-pointer" size="sm" onPress={() => setSelected("login")}>
                                        Login
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button type='submit' fullWidth color="primary">
                                        Sign up
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