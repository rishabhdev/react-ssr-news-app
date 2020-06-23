import React from 'react';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import Main from '../Main';
import { ServerDataProvider } from '../../../../../state/serverDataContext';

describe('<Main />', () => {
    const history = createMemoryHistory()

  it('renders main page', () => {
    const { container } = render(
        <ServerDataProvider value={{ 'news-page-1': [{ points: 10, title: 'Test todo', ur: 'http://google.com' }] }}>
            <Router history={history}>
                <Route component={Main} />
            </Router>
        </ServerDataProvider>

    );

    expect(container.querySelector('table .newsComponent').textContent).toEqual('10Test todo');
  });
});
