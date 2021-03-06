import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';


import LogoImg from '../../assets/eventmngt.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                firstName: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 digítos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/event-manager/users', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado com sucesso!',
                description: 'Você já pode realizar o login no EventMngt!'
            })

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
            });
        }
    },
        [addToast, history],
    );

    return (
        <Container>
            <Background />
            <Content>
                <img src={LogoImg} alt="eventmngt" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>

                    <Input name="firstName" icon={FiUser} placeholder="Nome" />
                    <Input name="lastName" icon={FiUser} placeholder="Sobrenome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Login
                </Link>
            </Content>

            <Background />
        </Container>
    );
};

export default SignUp;