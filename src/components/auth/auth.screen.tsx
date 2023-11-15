import { useState, useEffect } from 'react'
import InputGroup from '../../UI/input-group/input.group';
import { IRegisterRequest } from '../../store/models/auth';
import { useLoginMutation, useRegisterMutation } from '../../store/services/auth.service';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

import { isErrorWithMessage, isFetchBaseQueryError } from '../../store/error-helpers/error.typifier';

import { useForm, SubmitHandler } from "react-hook-form"

import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";

interface IAuthFormData {
    email: string;
    password: string;
    name: string;
}

const AuthScreen = () => {
    const [selected, setSelected] = useState<string>("login");
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IAuthFormData>()
    const onSubmit: SubmitHandler<IAuthFormData> = (data) => console.log(data)

    const [signup, {isLoading: signupLoading, error: signupError, isError: isRegisterError}] = useRegisterMutation();
    const [signin, {isLoading: signinLoading, error: signinError, isError: isLoginError}] = useLoginMutation();
    
    const [formError, setFormError] = useState<string | null>(null)

    const [formData, setFormData] = useState<IRegisterRequest>({
        email: null,
        password: null
    })

    const handleAuth = async () => {
        validateUserInput();
       
    }

    const handleChangeFormData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeFormErrors = (value: string) => {
        setFormError(value);
    }

    const handleClearForm = () => {
        setFormData((prev) => ({ ...prev, email: null}));
        setFormData((prev) => ({ ...prev, password: null}));
    }

    const validateUserInput = () => {
        if(formData.email === null) { 
            handleChangeFormErrors('Email must be filled.');
            return false;
        } else if(formData.password === null) {
            handleChangeFormErrors('Password must be filled.');
            return false;
        }
    }

    useEffect(() => {
        if (isFetchBaseQueryError(signupError) && isErrorWithMessage(signupError.data))
            setFormError(signupError.data.message)
    }, [signupError])
    
    useEffect(() => {
        if (isFetchBaseQueryError(signinError) && isErrorWithMessage(signinError.data))
            setFormError(signinError.data.message)
    }, [signinError])

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
                                <Input {...register("email", { required: true })} isRequired label="Email" placeholder="Enter your email" type="email" />
                                <Input
                                    {...register("password", { required: true })}
                                    isRequired
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                />
                                <p className="text-center text-small">
                                    Need to create an account?{" "}
                                    <Link className="cursor-pointer" size="sm" onPress={() => setSelected("sign-up")}>
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="primary">
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title="Sign up">
                            <form className="flex flex-col gap-4 h-[300px]">
                                <Input {...register("name", { required: true })} isRequired label="Name" placeholder="Enter your name" type="password" />
                                <Input {...register("email", { required: true })} isRequired label="Email" placeholder="Enter your email" type="email" />
                                <Input
                                    {...register("password", { required: true })}
                                    isRequired
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                />
                                <p className="text-center text-small">
                                    Already have an account?{" "}
                                    <Link className="cursor-pointer" size="sm" onPress={() => setSelected("login")}>
                                        Login
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="primary">
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