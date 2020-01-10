import React, {useState} from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import timeParts from './times.js'
import saveCourse from './../../App'

const days = ['M', 'Tu', 'W', 'Th', 'F'];

const terms = { F : 'Fall', W : 'Winter', S : 'Spring'};

const buttonColor = selected => (
  selected ? 'success' : null
);

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

const moveCourse = course => {
    const meets = prompt('Enter new meeting data, in this format:', course.meets);
    if (!meets) return;
      const {days} = timeParts(meets);
    if (days) saveCourse(course, meets); 
      else moveCourse(course);
  };
  
  const Course = ({ course, state, user }) => (
    <Button color = { buttonColor(state.selected.includes(course)) }
            onClick = {() => state.toggle(course)}  
            onDoubleClick = { user ? () => moveCourse(course) : null }
            disabled = { hasConflict(course, state.selected) }>
      { getCourseTerm(course) + 'CS' + getCourseNumber(course) } : {course.title}
    </Button>
  );
  
  export default { Course };