const fs = require('fs');


template = `async function handleRequest(request) {
  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  }
  return new Response(someHTML, init)
}
addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request))
})
const someHTML = \`{{HTML}}\``;

html = fs.readFileSync('index.html').toString();

output = template.replace('{{HTML}}', html.replace(/`/g, '\\`'));

fs.writeFileSync('dist/index.js', output);

console.log('Done building!');