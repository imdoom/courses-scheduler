import React, {useState, useEffect} from 'react';
import 'rbx/index.css';
import './App.css';
import { Button,Notification, Title, Message, Card } from 'rbx';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CourseList from './components/CourseList';
import timeParts from './components/Course/times';
import {db, uiConfig, firebase} from './components/Firebase';

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
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

const Banner = ({ user }) => (
  <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn /> }
    <Title>CS Courses Scheduler</Title>
  </React.Fragment>
);

const App = () => {
  const [schedule, setSchedule] = useState({ courses: [] });
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setSchedule(addScheduleTimes(snap.val()));
        setLoading(false);
      }
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  return ( 
    <Notification color="light" id="app">
      <Banner user={ user } />
      {loading ? <div className="loader"/> : <CourseList courses={ schedule.courses } user={user}/>}
    </Notification>
  );
};

export default App;
