import React, { useState } from 'react';
import { Button, Modal, Field, Content, Delete, Input, Label  } from 'rbx';

const ModalComponent = ({modalActive, setModalActive, course, moveCourse}) => {
  const [schedule, setSchedule] = useState('');

  return (
  <Modal active={modalActive} closeOnBlur>
    <Modal.Background />
    <Modal.Card>
      <form onSubmit={() => {setModalActive(!modalActive); moveCourse(schedule, course);}}>
      <Modal.Card.Head>
        <Modal.Card.Title>Edit Schedule</Modal.Card.Title>
        <Delete onClick={() => setModalActive(!modalActive)}/>
      </Modal.Card.Head>
      <Modal.Card.Body>
        <Content>
          <Field>
              <Label>{`Enter new meeting data, in this format: DDD HH:MM-HH:MM`}</Label>
              <Input type="text" defaultValue={course.meets} onChange={e => setSchedule(e.target.value)} required/>
          </Field>
        </Content>
      </Modal.Card.Body>
      <Modal.Card.Foot>
        <Button color="success">Save changes</Button>
        <Button onClick={() => setModalActive(!modalActive)}>Cancel</Button>
      </Modal.Card.Foot>
      </form>
  </Modal.Card>
  </Modal>
  );
};

export default ModalComponent;