import LoginBackground from "@/assets/login-background.jpg";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ElementRef, useRef, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";

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

    const signIn = function () {
        // TOOD: Add validation function
        const isValid = true;

        if (isValid) {
            navigate("");
        }
    };

    return (
        <div className='login-wrapper'>
            <div className='form-wrapper'>
                <div className='logo-wrapper'>
                    <img className='logo' src={Logo} />
                    <h1>Guide Service</h1>
                </div>
                <form>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label htmlFor='email'>Email adresi</Label>
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
                        <Label htmlFor='password'>Şifrə</Label>
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
                            <Switch checked={signInDetails.rememberMe} onCheckedChange={rememberMe} id='airplane-mode' />
                            <Label htmlFor='airplane-mode'>Yadda saxla</Label>
                        </div>
                        <p className='forgot-password'>Şifrəmi unutdum?</p>
                    </div>

                    <Button onClick={signIn} type='button'>
                        Giriş et
                    </Button>
                </form>
            </div>
            <div ref={imageWrapper} className='blur-load'>
                <img onLoad={onImageLoad} ref={image} loading='lazy' src={LoginBackground} />
            </div>
        </div>
    );
}
