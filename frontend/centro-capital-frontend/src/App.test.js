import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

//Divided button components into unit tests for ease of accesibility
test('Ensures daily button is accesible', () => {
  render(<App />);
  const button = screen.getByRole('button', {name: 'Daily'})
  fireEvent.click(button)
});
test('Ensures weekly button is accesible', () => {
  render(<App />);
  const button = screen.getByRole('button', {name: 'Weekly'})
  fireEvent.click(button)
});
test('Ensures monthly button is accesible', () => {
  render(<App />);
  const button = screen.getByRole('button', {name: 'Monthly'})
  fireEvent.click(button)
});
test('Ensures yearly button is accesible', () => {
  render(<App />);
  const button = screen.getByRole('button', {name: 'Yearly'})
  fireEvent.click(button)
});
test('Ensures quarterly button is accesible', () => {
  render(<App />);
  const button = screen.getByRole('button', {name: 'Quarterly'})
  fireEvent.click(button)
});

test('Purposefully failing missing component in home page for presentation purposes', () =>{
    const {container} = render(<App />)
  //here we expect to identify 3 graphs but in reality there is only one
    const graphs = container.getElementsByClassName('recharts-wrapper')
    expect(graphs.length).toBe(3)
})

// Since the test below deals with navigation an async component is helpful
test('Testing hyperlinks take to relevant locations', async () =>{
  render(<App />);
  expect(screen.getByText('About')).toBeInTheDocument()
  fireEvent.click(screen.getByText('About'))
  expect(screen.getByText('About Us')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Insights'))
  expect(screen.getAllByText('Insights')[0]).toBeInTheDocument()
  fireEvent.click(screen.getByText('Compare'))
  expect(screen.getAllByText('Compare')[0]).toBeInTheDocument()
  fireEvent.click(screen.getByText('Welcome'))

})