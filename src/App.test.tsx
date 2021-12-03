import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Tutorials from './components/Tutorials';
import AddCourseForm from './components/AddCourseForm';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {defaultOb} from './interfaces/coursePool'

describe("Tutorials",()=>{
    test('renders Tutorials text', () => {
        render(<Tutorials />);
        const TextElement = screen.getByText(/This is a four year degree plan/);
        expect(TextElement).toBeVisible();
      });
    test('renders Tutorials html tag', () => {
        render(<Tutorials />);
        const TagElement = screen.getByRole("heading");
        expect(TagElement).toBeInTheDocument();
      });
})
const mockedOnAdd= jest.fn()
describe("AddCourseForm",  ()=>{
    test('input element placeholder',()=>{
        render(<AddCourseForm onAdd={mockedOnAdd} semesterPool = {[]} 
            searchCourse={jest.fn()} checkPrerequisite={jest.fn()} defaultOb={defaultOb}
            editDbCourse={jest.fn()}/>);
        const InputBoxElement = screen.getByPlaceholderText(/Ex. CISC106/i)
        expect(InputBoxElement).toBeInTheDocument();
    })
    test('input element value change',()=>{
        render(<AddCourseForm onAdd={mockedOnAdd} semesterPool = {[]} 
            searchCourse={jest.fn()} checkPrerequisite={jest.fn()} defaultOb={defaultOb}
            editDbCourse={jest.fn()}/>);
        const InputElement = screen.getByPlaceholderText(/Ex. CISC106/i) as  HTMLInputElement
        fireEvent.change(InputElement, {target:{value:"cisc106"}}) //after a event happen
        expect(InputElement.value).toBe("cisc106")
    })
    test('input element not empty after search button is clicked',()=>{
        render(<AddCourseForm onAdd={mockedOnAdd} semesterPool = {[]} 
            searchCourse={jest.fn()} checkPrerequisite={jest.fn()} defaultOb={defaultOb}
            editDbCourse={jest.fn()}/>);
        const buttonElement = screen.getByRole("button", {name:/Search Course/i})
        const InputElement = screen.getByPlaceholderText(/Ex. CISC106/i) as  HTMLInputElement
        fireEvent.change(InputElement, {target:{value:"cisc106"}}) 
        fireEvent.click(buttonElement)
        expect(InputElement.value).not.toBe("")
    })
})
const MockApp= ()=>{
    return (<DndProvider backend = {HTML5Backend}>
        <App/>
    </DndProvider>
    )}
describe("Add Semester button ",()=>{
    test('should render new semester table',()=>{
        render(<MockApp/>)
        const buttonElement = screen.getByRole("button", {name:/Add Semester/i})
        const tableElement = screen.getByText(/new semester/i)
        fireEvent.click(buttonElement)
        expect(tableElement).toBeInTheDocument()
    })
})