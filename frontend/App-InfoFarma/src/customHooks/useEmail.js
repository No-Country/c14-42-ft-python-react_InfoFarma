import { useState } from 'react'

const useEmail = () => {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const handleEmailCheck = (e) => {
        setEmail(e.target.value)
    }
    const handleSubscribe = (e) => {
        e.preventDefault()

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError('Por favor, introduce una dirección de correo electrónico válida.');
        } else {
            // Lógica de suscripción o enviar al servidor una vez que backend cree 
            console.log('Datos de la suscripción: ', email);
            console.log('Subscripción exitosa!');
            

            setEmailError('');
            // Resto de la lógica de suscripción...
        }
    }
    return {
        email,
        emailError,
        handleEmailCheck,
        handleSubscribe
    }
}

export default useEmail;