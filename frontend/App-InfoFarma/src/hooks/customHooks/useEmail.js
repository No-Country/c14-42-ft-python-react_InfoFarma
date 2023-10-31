import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postSubscription } from '../../redux/actions';

const useEmail = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [emailSuccess, setEmailSuccess] = useState('')

    const handleEmailCheck = (e) => {
        setEmail(e.target.value)
    }
    const handleSubscribe = (e) => {
        e.preventDefault()

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError('Por favor, introduce una dirección de correo electrónico válida.');
            setEmailSuccess(false);
        } else {
            // Lógica de suscripción o enviar al servidor una vez que backend cree endpoint
            // console.log({email});
            // console.log('Subscripción exitosa!');

            dispatch(postSubscription({email}))

            setEmailError('');
            setEmailSuccess(true);
        }
    }
    return {
        email,
        emailError,
        emailSuccess,
        handleSubscribe,
        handleEmailCheck
    }
}

export default useEmail;