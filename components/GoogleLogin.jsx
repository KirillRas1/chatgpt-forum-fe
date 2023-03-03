import { GoogleLogin } from '@react-oauth/google';
export default function GoogleLoginButton() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    )
}