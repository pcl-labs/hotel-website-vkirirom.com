import marked from 'marked';

// https://marked.js.org/
const renderer = new marked.Renderer();
marked.setOptions({
  headerIds: false,
  renderer,
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

export default marked;
