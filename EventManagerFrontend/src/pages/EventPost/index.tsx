import React, { useState, useEffect } from 'react';
import { FiLogOut, FiUserPlus } from 'react-icons/fi';
import { BiHeart, BiArrowToLeft } from 'react-icons/bi';
import api from '../../services/api';
import { Link, useLocation } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, FacebookMessengerShareButton, FacebookMessengerIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon, PinterestIcon, PinterestShareButton, LinkedinShareButton, LinkedinIcon } from 'react-share';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Button from '../../components/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import logoImg from '../../assets/eventmngt.png';
import { useAuth } from '../../hooks/auth';
import { Container, Header, HeaderContent, Profile, Content, Event } from './styles';
import { BytesOptions } from 'bytes';
import IconP from '../../assets/iconperson.png';

interface EventState {
  name: string;
  description: string;
  numberOfLikes: string;
  participants: string;
  id: string;
  startDate: Date;
  endDate: Date;
  local: string;
}

interface ImageState {
  name: string;
  picByte: BytesOptions;
}


const Dashboard: React.FC = () => {
  const { signOut, name, userid } = useAuth();
  let Location = useLocation();
  const [events, setEvents] = useState<EventState>();
  const [images, setImages] = useState<ImageState>();
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let l = Location.state as string

  useEffect(() => {
    async function loadEvents() {
      const response = await api.get(`/event-manager/events/id/${l}`);
      console.log(response);
      console.log("nome: " + name);


      setTotal(response.headers['totalelements']);
      const totalPages = Math.ceil(total / 4);

      const arrayPages = [] as any;
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i);
      }

      setPages(arrayPages);
      setEvents(response.data);
      setImages(response.data);

    }

    loadEvents();

  }, [currentPage, total]);

  async function handleLikeRepository(id: string) {
    await api.post(`/event-manager/events/likes/${id}`);

    api.get(`/event-manager/events/id/${l}`).then(response => {
      setEvents(response.data);
    });
  }

  async function handleSubscribeEvent(id: string) {
    await api.post(`/event-manager/users/subscription/${userid}/${id}`);

    api.get(`/event-manager/events/id/${l}`).then(response => {
      setEvents(response.data);
    });

  }

  const useStyles = makeStyles((theme) => ({
    card: {
      [theme.breakpoints.up('sm')]: {
        width: 1000,
        flexShrink: 0,
        flexGrow: 1,
      },


      flexGrow: 1,
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fafafa",
      marginBottom: 30,
    },
    media: {
      height: 270,
    },
  }));

  const classes = useStyles();

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
        <Grid item xs={12} md={8} >
          <Typography variant="h6" gutterBottom>

          </Typography>

          <Card className={classes.card}>
            <CardMedia className={classes.media} image={`data:image/jpeg;base64,${images?.picByte}`} />
            <CardContent>
              <Typography color="primary" variant="h5">
                {events?.name}
              </Typography>

              <Typography color="textSecondary" variant="subtitle2">
                Data do Evento: {events?.startDate} até {events?.endDate} -  Inscritos: {events?.participants}
              </Typography>

              <Typography paragraph>
                <Event>
                  <Typography color="textPrimary" variant="body1">
                    {events?.description}

                  </Typography>

                </Event>
              </Typography>

              <Typography color="textPrimary" variant="subtitle1">
                Local: {events?.local}
              </Typography>

              <Typography color="textSecondary" variant="subtitle2" style={{ marginTop: "10px" }}>

                <Button type="submit" onClick={() => handleSubscribeEvent(events?.id as string)} style={{ width: "200px", backgroundColor: "#E57F84" }}>  <FiUserPlus /> Inscrever-se</Button>
              </Typography>

              <Typography color="textSecondary" variant="subtitle2" >
                <Button onClick={() => handleLikeRepository(events?.id as string)} type="submit" style={{ width: "100px", backgroundColor: " #4297A0", marginBottom: "30px" }}>  <BiHeart /> {events?.numberOfLikes} </Button>

              </Typography>

              <FacebookShareButton
                url="https://localhost:3000"
                quote="teste"
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <FacebookMessengerShareButton
                url="https://www.globo.com/"
                appId="521270401588372"
                className="Demo__some-network__share-button"
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>

              <WhatsappShareButton
                url="https://www.globo.com/"
                title="teste"
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <TwitterShareButton
                url="https://www.globo.com/"
                title="teste"
                className="Demo__some-network__share-button"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <LinkedinShareButton url="https://localhost:3000" className="Demo__some-network__share-button">
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <PinterestShareButton
                url={String(window.location)}
                media={`${String(window.location)}/${logoImg}`}
                className="Demo__some-network__share-button"
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>

            </CardContent>
          </Card>
        </Grid>
      </Content>
    </Container >
  );
};
export default Dashboard;