import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Tutorials from "./components/Tutorials";
import AddCourseForm from "./components/AddCourseForm";
import {defaultOb} from "./interfaces/coursePool";

describe("Tutorials",()=>{
    test("renders Tutorials text", () => {
        render(<Tutorials showTutorial={true} setShowTutorial={jest.fn()}/>);
        const TextElement = screen.getByText(/This is a four year degree plan/);
        expect(TextElement).toBeVisible();
    });
    test("renders Tutorials html tag", () => {
        render(<Tutorials showTutorial={true} setShowTutorial={jest.fn()}/>);
        const TagElement = screen.getByRole("heading");
        expect(TagElement).toBeInTheDocument();
    });
});
const mockedOnAdd= jest.fn();
describe("AddCourseForm",  ()=>{
    test("input element placeholder",()=>{
        render(<AddCourseForm onAdd={mockedOnAdd} semesterPool = {[]}
            searchCourse={jest.fn()} checkPrerequisite={jest.fn()} defaultOb={defaultOb}
            editDbCourse={jest.fn()} checkDuplicate={jest.fn()}/>);
        const InputBoxElement = screen.getByPlaceholderText(/Ex. CISC106/i);
        expect(InputBoxElement).toBeInTheDocument();
    });
    test("input element value change",()=>{
        render(<AddCourseForm onAdd={mockedOnAdd} semesterPool = {[]}
            searchCourse={jest.fn()} checkPrerequisite={jest.fn()} defaultOb={defaultOb}
            editDbCourse={jest.fn()} checkDuplicate={jest.fn()}/>);
        const InputElement = screen.getByPlaceholderText(/Ex. CISC106/i) as  HTMLInputElement;
        fireEvent.change(InputElement, {target:{value:"cisc106"}}); //after a event happen
        expect(InputElement.value).toBe("cisc106");
    });
    test("input element not empty after search button is clicked",()=>{
        render(<AddCourseForm onAdd={mockedOnAdd} semesterPool = {[]}
            searchCourse={jest.fn()} checkPrerequisite={jest.fn()} defaultOb={defaultOb}
            editDbCourse={jest.fn()} checkDuplicate={jest.fn()}/>);
        const buttonElement = screen.getByRole("button", {name:/Search Course/i});
        const InputElement = screen.getByPlaceholderText(/Ex. CISC106/i) as  HTMLInputElement;
        fireEvent.change(InputElement, {target:{value:"cisc106"}});
        fireEvent.click(buttonElement);
        expect(InputElement.value).not.toBe("");
    });
});
