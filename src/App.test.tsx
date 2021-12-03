// import React from 'react';
import {  render, screen } from '@testing-library/react';
// import App from './App'; 
// , {  defaultSemester }
import Tutorials from './components/Tutorials';


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
