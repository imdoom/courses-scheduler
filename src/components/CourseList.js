import React, {useState} from 'react';
import 'rbx/index.css';
import { Button } from 'rbx';
import Course from './Course/Course';

const terms = { F : 'Fall', W : 'Winter', S : 'Spring'};

const buttonColor = selected => (
  selected ? 'success' : null
);

const getCourseTerm = course => (terms[course.id.charAt(0)]);

const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x) => {
    setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
  };
  return [selected, toggle] ;
};

const TermSelector = ({ state }) => (
    <Button.Group hasAddons>
        { 
        Object.values(terms).map(value => 
            <Button key={value}
            color = {buttonColor(state.term === value)}
            onClick = { () => state.setTerm(value)}> {value} </Button>)
        }
    </Button.Group>
)
  
const CourseList = ({ courses, user}) => {
    const [term, setTerm] = useState('Fall');
    const [selected, toggle] = useSelection();
    const termCourses = courses.filter(course => term === getCourseTerm(course));

    return (
        <React.Fragment>
        <TermSelector state={ {term, setTerm} } />
        <Button.Group>
            { termCourses.map(course => <Course course={ course } 
                                                key={course.id} 
                                                state={ {selected, toggle} }
                                                user={ user }/>) }
        </Button.Group>
        </React.Fragment>
    )
};

export default CourseList;