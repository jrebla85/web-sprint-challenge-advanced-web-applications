import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import { render, screen, wait, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';
import fetchColorService from '../services/fetchColorService';

jest.mock('../services/fetchColorService')

const testColor = {
    color: "blue",
    code: { hex: "#7fffd4" },
    id: 1
}

test("Renders without errors", ()=> {
    render(<BubblePage colors={testColor}/>)
    
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    fetchColorService.mockResolvedValueOnce(testColor);

    render(<BubblePage colors={testColor}/>);
    const colors = screen.getAllByTestId("color");

    await waitFor(() => {
        expect(colors).toHaveLength(1);
    })
    //Keep in mind that our service is called on mount for this component.
});