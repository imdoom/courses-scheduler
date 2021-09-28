import React, {useState} from 'react';
import 'rbx/index.css';
import '../../App.css';
import { Button } from 'rbx';
import timeParts from './times.js';
import ModalComponent from '../ModalComponent';
import {db} from '../Firebase';


const days = ['M', 'Tu', 'W', 'Th', 'F'];

const terms = { F : 'Fall', W : 'Winter', S : 'Spring'};

const getCourseNumber = course =>(
  course.id.slice(1,4)
);

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const daysOverlap = (days1, days2) => ( 
  days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const courseConflict = (course1, course2) => (
  course1 !== course2
  && getCourseTerm(course1) === getCourseTerm(course2)
  && timeConflict(course1, course2)
);

const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

const moveCourse = (meets, course) => {
  if(!meets)
    return;
  const {days} = timeParts(meets);
  if (days) {
    db.child('courses').child(course.id).update({meets})
    .catch(error => alert(error));
  }
};
  
const Course = ({ course, state, user}) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <Button
        badge = {course.meets}
        badgeColor = "sucess"
        size = "medium"
        className = {state.selected.includes(course) ? "selected" : "default-button"}
        onMouseOver = {() => {
          if (!state.selected.includes(course)) {
            state.toggle(course);
            state.setHighlighted(course);
          }
        }}
        onMouseLeave = {() => {
          if (state.highlighted === course) {
            state.toggle(course);
          }
          state.setHighlighted(null);
        }}
        onClick = {() => {
          if (state.highlighted === course) {
            state.setHighlighted(null);
          } else {
            state.toggle(course);
          }
        }}
        onDoubleClick = {user ? () => setModalActive(!modalActive) : null}
        disabled = { hasConflict(course, state.selected) }>
        { getCourseTerm(course) + 'CS' + getCourseNumber(course) } : {course.title}
      </Button>
      <ModalComponent modalActive={modalActive} setModalActive={setModalActive} course={course} moveCourse={moveCourse}/>
    </>
  )
};
  
  export default Course;