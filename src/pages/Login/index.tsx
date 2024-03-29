import LoginBackground from "@/assets/login-background.jpg";
import Logo from "@/assets/logo.png";
import { ElementRef, FormEvent, useRef, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import Input from "antd/es/input/Input";
import { Button, Switch } from "antd";
import toast from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();
    const image = useRef<ElementRef<"img"> | null>(null);
    const imageWrapper = useRef<ElementRef<"div"> | null>(null);
    const [signInDetails, setSignInDetails] = useState({
        rememberMe: false,
        email: "",
        password: "",
    });

    const onImageLoad = function () {
        imageWrapper.current?.classList.add("loaded");
    };

    const onInputChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setSignInDetails((currentState) => {
            return {
                ...currentState,
                [name]: value,
            };
        });
    };

    const rememberMe = function (isChecked: boolean) {
        setSignInDetails((currentState) => {
            return {
                ...currentState,
                rememberMe: isChecked,
            };
        });
    };

    const signIn = function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const isValid = true;

        if (isValid) {
            toast.success("Uğurla giriş etdiniz!");
            navigate("/dashboard");
        }
    };

    return (
        <div className='login-wrapper'>
            <div className='form-wrapper'>
                <div className='logo-wrapper'>
                    <img className='logo' src={Logo} />
                    <h1>Guide Service</h1>
                </div>
                <form onSubmit={signIn}>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <label htmlFor='email'>Email adresi</label>
                        <Input
                            name='email'
                            value={signInDetails.email}
                            onChange={onInputChange}
                            id='email'
                            placeholder='Email adresini qeyd edin'
                            type='email'
                        />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <label htmlFor='password'>Şifrə</label>
                        <Input
                            name='password'
                            value={signInDetails.password}
                            onChange={onInputChange}
                            id='password'
                            placeholder='Şifrəni qeyd edin'
                            type='password'
                        />
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className='flex items-center space-x-2'>
                            <Switch checked={signInDetails.rememberMe} onChange={rememberMe} id='airplane-mode' />
                            <label htmlFor='airplane-mode'>Yadda saxla</label>
                        </div>
                        <p className='forgot-password'>Şifrəmi unutdum?</p>
                    </div>

                    <Button htmlType='submit'>Giriş et</Button>
                </form>
            </div>
            <div ref={imageWrapper} className='blur-load'>
                <img onLoad={onImageLoad} ref={image} loading='lazy' src={LoginBackground} />
            </div>
        </div>
    );
}
