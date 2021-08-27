import React, {useState, useEffect} from 'react';
import 'rbx/index.css';
import './App.css';
import { Button,Notification, Container, Title, Message, Card } from 'rbx';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CourseList from './components/CourseList';
import timeParts from './components/Course/times';
import {db, uiConfig, firebase} from './components/Firebase';

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
    title: schedule.title,
    courses: Object.values(schedule.courses).map(addCourseTimes)
  })

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const Banner = ({ user, title }) => (
  <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn /> }
    <Title>{ title || '[loading...]' }</Title>
  </React.Fragment>
);

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setSchedule(addScheduleTimes(snap.val()));
      }
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  return ( 
    <Notification color="light" id="app">
      <Banner user={ user } title={ schedule.title } />
      <CourseList courses={ schedule.courses } user={user}/>
    </Notification>
  );
};

export default App;
