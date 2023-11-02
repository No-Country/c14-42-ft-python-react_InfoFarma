import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App';

const server = require('http').createServer((req, res) => {
  const html = render(<App />);

  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

function render(component) {
  return ReactDOMServer.renderToString(component);
}

export { render };
