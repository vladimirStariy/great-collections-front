import { useState } from 'react'
import InputGroup from '../../UI/input-group/input.group';
import Button from '../../UI/button/button';
import { IAuthFormErrors, IRegisterRequest } from '../../store/models/auth';
import { useLoginMutation, useRegisterMutation } from '../../store/services/auth.service';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

const AuthScreen = () => {
    const dispatch = useDispatch();
    
    const [authMode, setAuthMode] = useState<number>(0);

    const [signup, {isLoading: signupLoading}] = useRegisterMutation();
    const [signin, {isLoading: signinLoading}] = useLoginMutation();
    
    const [formErrors, setFormError] = useState<IAuthFormErrors>({
        emailError: false,
        passwordError: false
    })

    const [formData, setFormData] = useState<IRegisterRequest>({
        email: null,
        password: null
    })

    const handleAuth = async () => {
        validateUserInput();
        if(!formErrors.emailError && !formErrors.passwordError) {
            if(authMode === 0) {
                const response = await signin(formData).unwrap();
                dispatch(setCredentials(response))
                handleClearForm();
            } else {
                await signup(formData);
                handleClearForm();
            }
        }
    }

    const handleChangeFormData = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangeFormErrors = (name: string, value: boolean) => {
        setFormError((prev) => ({ ...prev, [name]: value }))
    }

    const handleClearForm = () => {
        setFormData((prev) => ({ ...prev, email: null}));
        setFormData((prev) => ({ ...prev, password: null}));
    }

    const validateUserInput = () => {
        if(formData.email === null) { 
            handleChangeFormErrors('emailError', true);
            return false;
        } 
        if(formData.password === null) {
            handleChangeFormErrors('passwordError', true);
            return false;
        }
    }

    const handleAuthMode = () => {
        if(authMode === 0) setAuthMode(1) 
        else setAuthMode(0)
    }

    return <>
        <div className='flex flex-column w-full justify-center items-center'>
            <div className='flex flex-col w-full gap-6 pt-16 justify-center items-center'>
                <div className='flex flex-col w-full gap-8 pt-16 justify-center items-center'>
                    <div className='text-5xl font-bold'>{authMode === 0 ? 'SIGN IN' : 'SIGN UP'}</div>
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