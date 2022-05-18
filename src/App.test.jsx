import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { UserData } from './services/UserData';


const server = setupServer(
    rest.post(`${process.env.SUPABASE_API_URL}/auth/v1/token`, (req, res, ctx) => 
    res(
       ctx.json(UserData)
    )
  ),

rest.get(`${process.env.SUPABASE_API_URL}/rest/v1/entries`, (req, res, ctx) => 
  res(
      ctx.json([
          {
            id: 1,
            guest_id: '12345',
            content: "Hello friends",
            created_at: "2022-05-05T22:22:10.187801Z"
          },
          {
            id: 2,
            guest_id: '12345',
            content: "Hello neighbor",
            created_at: "2022-05-05T16:13:26.583814+00:00"
          },
      ])
    )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<App />', () => {
  it('renders a list of user entries and has input for new user entries', async () => {
      render(
          <MemoryRouter>
            <UserProvider>
                <App />
            </UserProvider>
          </MemoryRouter>
      );

    const emailInput = screen.getByRole('textbox');
    userEvent.type(emailInput, 'test_user@example.com');

    const passwordInput = await screen.findByPlaceholderText(/password/i);
    userEvent.type(passwordInput, 'random password');

    const signInButton = await screen.findByRole('button', { name: /submit/i });
    userEvent.click(signInButton);

    waitForElementToBeRemoved(await screen.findByText(/loading/i));

    const userEntry = await screen.findAllByRole('heading', { level: 3 });
    expect(userEntry[0]).toBeInTheDocument();
    expect(userEntry).toHaveLength(2);

    const userEmail = await screen.findAllByRole('heading', { level: 4 });
    expect(userEmail[0]).toBeInTheDocument();
    expect(userEmail).toHaveLength(2);

    const createdAt = await screen.findAllByRole('heading', { level: 5 });
    expect(createdAt[0]).toBeInTheDocument();
    expect(createdAt).toHaveLength(2);

    const testContent1 = await screen.findByText(/hello friends/i);
    expect(testContent1).toBeInTheDocument();

    const testContent2 = await screen.findByText(/hello neighbor/i);
    expect(testContent2).toBeInTheDocument();

   const inputTest = await screen.findByPlaceholderText(/leave a thought/i);
   userEvent.type(inputTest, 'new entry');

   const entryButtonTest = await screen.findByRole('button', { name: /save entry/i });
   userEvent.click(entryButtonTest);
   
   const testContent3 = await screen.findByText(/new entry/i);
   expect(testContent3).toBeInTheDocument();

  });

});