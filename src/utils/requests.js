let API = "";

if (window.location.href.includes('localhost')) {
  API = `http://localhost:4000`
  // API = `http://ohs.adriankenya.com`
} else {
  API = 'http://ohs.adriankenya.com'
}

export {API}