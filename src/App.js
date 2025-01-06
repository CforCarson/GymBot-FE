// src/App.js

import React from 'react';
import Chat from './components/Chat';
import UploadPDF from './components/UploadPDF';
import AvailableDocuments from './components/AvailableDocuments';
import WorkoutPlanner from './components/WorkoutPlanner/WorkoutPlanner';  // Import the WorkoutPlanner component
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Tab.Container defaultActiveKey="chat">
        <Row className="justify-content-md-center">
          <Col xs={12} md={4}>
            <Nav variant="pills" className="flex-column mt-5">
              <Nav.Item>
                <Nav.Link eventKey="chat">PDF Chatbot</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="workout">Workout Planner</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={12} md={8}>
            <Tab.Content>
              <Tab.Pane eventKey="chat">
                <UploadPDF />
                <AvailableDocuments />
                <Chat />
              </Tab.Pane>
              <Tab.Pane eventKey="workout">
                <WorkoutPlanner />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default App;