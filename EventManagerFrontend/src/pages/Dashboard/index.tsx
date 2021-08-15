import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { FiLogOut, FiPlusSquare } from 'react-icons/fi';
import { BiHeart } from 'react-icons/bi';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/eventmngt.png';
import { useAuth } from '../../hooks/auth';
import { Container, Header, HeaderContent, Profile, Content, PaginationButton, PaginationItem } from './styles';
import { BytesOptions } from 'bytes';
import IconP from '../../assets/iconperson.png';

interface EventState {
  name: string;
  description: string;
  numberOfLikes: string;
  id: string;
  start_date: Date;
  end_date: Date;
  picByte: BytesOptions;
}

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<EventState[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [body, setBody] = useState("");


  const useStyles = makeStyles({
    card: {
      maxWidth: 345,
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fafafa",
    },
    media: {
      height: 300,
    },
  });

  const classes = useStyles();


  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  useEffect(() => {


    async function loadEvents() {
      const response = await api.get(`/event-manager/events/total/page/${currentPage}`);
      setTotal(response.headers['totalelements']);
      const totalPages = Math.ceil(total / 6);

      const arrayPages = [] as any;
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setEvents(response.data);

    }
    loadEvents();
    console.log(events);
  }, [currentPage, total]);

  async function handleLikeRepository(id: string) {
    await api.post(`/event-manager/events/likes/${id}`);

    api.get(`/event-manager/events/total/page/${currentPage}`).then(response => {
      setEvents(response.data);
    });
  }

  const handleSubmit = () => {

    const data = {
      body
    }

    handleSearchPost(data.body);

  }

  async function handleSearchPost(body: string) {
    const response2 = await api.get(`/event-manager/events/name/${body}`);

    console.log(response2.data.id);


    history.push(`/eventPost/${response2.data.id}/`, `${response2.data.id}`);
  }

  const { signOut, name } = useAuth();
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

          <Link to="/createEvent">
            <FiPlusSquare />
            Criar Evento
          </Link>

          <button type="button" onClick={signOut}>
            Sair <FiLogOut />
          </button>

        </HeaderContent>
      </Header>

      <Content>

        <h1>Eventos Agendados</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setBody(e.currentTarget.value)
          } placeholder="Nome do Evento" />
          <Button type="submit" style={{ width: "100px", height: "20px", marginBottom: "30px" }}>Pesquisar</Button>
        </Form>

        <Grid container spacing={3}>
          {events.map(eventData => (


            <Grid item xs={12} sm={4} key={eventData.id}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={`data:image/jpeg;base64,${eventData?.picByte}`} />
                <CardContent>
                  <Typography color="primary" variant="h5">
                    {eventData.name}
                  </Typography>
                  <Typography color="secondary" variant="h6">
                    <Link to={
                      {
                        pathname: `/eventPost/${eventData.id}`,
                        state: `${eventData.id}`
                      }
                    } style={{ textDecoration: 'none' }}>
                      <FiPlusSquare />
                      Descrição
                    </Link>
                  </Typography>
                  <Typography color="textSecondary" variant="subtitle2">

                    <Button onClick={() => handleLikeRepository(eventData.id)} type="submit" style={{ width: "80px", height: "20px", backgroundColor: "#E57F84" }}>  <BiHeart /> {eventData.numberOfLikes} </Button>

                  </Typography>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1} style={{ marginTop: "20px", marginLeft: "200px" }}>
          <PaginationButton>
            {currentPage > 1 && (
              <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>
                Anterior
              </PaginationItem>
            )}
            {pages.map((page) => (
              <PaginationItem
                key={page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PaginationItem>
            ))}
            {currentPage < pages.length && (
              <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>
                Próxima
              </PaginationItem>
            )}
          </PaginationButton>
        </Grid>
      </Content>
    </Container>
  );
};
export default Dashboard;