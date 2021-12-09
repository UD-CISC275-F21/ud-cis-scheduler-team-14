// import { useState } from 'react';
import React from "react";
import { Modal } from "react-bootstrap";
// import ReactJoyride from "react-joyride";
export interface tutorials{
  showTutorial: boolean
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>
}
const Tutorials = ({showTutorial,setShowTutorial}:tutorials):JSX.Element => {


    return (
        <>
            <Modal show={showTutorial} onHide={()=>setShowTutorial(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tutorials</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3> <strong>This is a four year degree plan editor </strong></h3>
                    <p>for students who would like to visuilize courses in each semester and test courses<br></br>
                  for academic advisors who needs to get to know students&apos s academic lives</p>
                    <p><strong>Save to Local</strong>: store current plan to local storage for later use </p>
                    <p><strong>Export as XLSX</strong>: export existing plan to local xlsx file</p>
                    <p><strong>Pool of Course</strong>: drag and drop course to any semester table</p>
                    <p><strong>Degree Requirement</strong>: list all required action for degree plan, includes credits requirement,
                and number of elective courses requirement </p>
                    <p><strong>Add semester</strong>: add a new empty semester table below</p>
                    <p><strong>Course Action Box</strong><br></br>
                        <strong>Search Course</strong>: type in course id, then press &apossearch course&apos button<br></br>
                        <strong>Add Course</strong>: choose a desired semester--{">"}type in course id--{">"}click search course button--{">"}then in the pop-up window,click save course (needs to pass prerequisite check)<br></br>
                        <strong>Edit Course</strong>: after searching a course, press &aposedit course&apos button, then in the pop-up window, modify the data in the database<br></br>
                    </p>
                    <p><strong>Semester Board</strong> <br></br>
                        <strong>X</strong> delete current semester <br></br>
                        <strong>Clear Courses</strong>: delete all courses in current semester <br></br>
                        <strong>Edit Icon</strong>: edit information only displayed in this semester table<br></br>
                        <strong>Delete Icon</strong>: remove current course
                    </p>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>
    );
};

export default Tutorials;
