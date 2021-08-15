import React, { useRef, useCallback } from 'react';
import { FiLogOut, FiCalendar } from 'react-icons/fi';
import { BiPencil, BiMap, BiCalendarEdit, BiArrowToLeft } from 'react-icons/bi';
import { Form } from '@unform/web';
import { useToast } from '../../hooks/toast';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import IconP from '../../assets/iconperson.png';
import * as Yup from 'yup';
import logoImg from '../../assets/eventmngt.png';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import { Container, Header, HeaderContent, Profile, Content } from './styles';

interface AddEvent {
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    local: string;
    unity: string;
}


const CreateEvent: React.FC = () => {

    const formRef = useRef<FormHandles>(null);


    const { addToast } = useToast();
    const history = useHistory();
    const { signOut, name } = useAuth();

    const handleSubmit = useCallback(async (data: AddEvent) => {
        try {
            formRef.current?.setErrors({});

            const response = await api.post('/event-manager/events', data);
            console.log(data);

            history.push('/dashboard', response.data.id);

            addToast({
                type: 'success',
                title: 'Cadastro realizado com sucesso!',
                description: 'Evento adicionado ao feed!'
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
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="eventmngt" />

                    <Profile>
                        <img src={IconP} alt="user" />

                        <div>
                            <span>Bem-vinda(o),</span>
                            <strong>{name}</strong>
                        </div>
                    </Profile>

                    <Link to="/dashboard">
                        <BiArrowToLeft />
                        Voltar para Dashboard
                    </Link>

                    <button type="button" onClick={signOut}>
                        Sair <FiLogOut />
                    </button>
                </HeaderContent>
            </Header>

            <Content>

                <h1>Criar Evento</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>

                    <Input name="name" icon={BiCalendarEdit} placeholder="Nome" />

                    <Input name="startDate" icon={FiCalendar} placeholder="Início do Evento" />

                    <Input name="endDate" icon={FiCalendar} placeholder="Fim do Evento" />

                    <Input name="description" icon={BiPencil} placeholder="Descrição" />

                    <Input name="local" icon={BiMap} placeholder="Local" />

                    <Input name="unity" icon={BiMap} placeholder="Unidade do Evento" />

                    <Button type="submit">Cadastrar Evento</Button>

                </Form>



            </Content>


        </Container>
    );
};

export default CreateEvent;