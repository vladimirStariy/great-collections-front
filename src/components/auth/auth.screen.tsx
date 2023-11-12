import { useState, useEffect } from 'react'
import InputGroup from '../../UI/input-group/input.group';
import Button from '../../UI/button/button';
import { IRegisterRequest } from '../../store/models/auth';
import { useLoginMutation, useRegisterMutation } from '../../store/services/auth.service';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

import { isErrorWithMessage, isFetchBaseQueryError } from '../../store/error-helpers/error.typifier';

const AuthScreen = () => {
    const dispatch = useDispatch();
    
    const [authMode, setAuthMode] = useState<number>(0);

    const [signup, {isLoading: signupLoading, error: signupError, isError: isRegisterError}] = useRegisterMutation();
    const [signin, {isLoading: signinLoading, error: signinError, isError: isLoginError}] = useLoginMutation();
    
    const [formError, setFormError] = useState<string | null>(null)

    const [formData, setFormData] = useState<IRegisterRequest>({
        email: null,
        password: null
    })

    const handleAuth = async () => {
        validateUserInput();
        if(authMode === 0) {
            const response = await signin(formData).unwrap();
            if(!isLoginError) {
                dispatch(setCredentials(response))
                handleClearForm();
            }
        } else {
            await signup(formData);
            if(!isRegisterError)
                handleClearForm();
        }
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

    const handleAuthMode = () => {
        if(authMode === 0) setAuthMode(1) 
        else setAuthMode(0)
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
        <div className='flex flex-column w-full justify-center items-center'>
            <div className='flex flex-col w-full gap-6 justify-center items-center'>
                <div className='flex flex-col w-full gap-8 justify-center items-center'>
                    <div className='text-5xl font-bold'>{authMode === 0 ? 'SIGN IN' : 'SIGN UP'}</div>
                        {isRegisterError ? 
                        <div>{formError}</div> 
                        : <></>}
                        <InputGroup 
                            type="text"
                            label="Email"
                            name="email"
                            placeholder="Type here"
                            value={formData.email === null ? '' : formData.email}
                            onChange={handleChangeFormData}
                        />
                        <InputGroup 
                            type="password"
                            label="Password"
                            name="password"
                            placeholder="Type here"
                            value={formData.password === null ? '' : formData.password}
                            onChange={handleChangeFormData}
                        />
                        <Button 
                            label={`${authMode === 0 ? 'Sign in' : 'Sign up'}`}
                            className="btn w-full max-w-xs"
                            isLoading={authMode === 0 ? signinLoading : signupLoading}
                            onClick={handleAuth}
                        />
                </div>
                <div className='flex flex-row'>
                    <span onClick={handleAuthMode} className='link link-primary'>
                        { authMode === 0 ? 'No account? Create one!' : 'Already have account? Sign in!' }
                    </span>
                </div>
            </div>
        </div>
    </>
}

export default AuthScreen;