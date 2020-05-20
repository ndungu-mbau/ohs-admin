let API = "";

if (window.location.href.includes('localhost')) {
  API = `http://localhost:4000`
  // API = `https://development-smartkids.herokuapp.com`
} else {
  API = 'http://158.101.165.50'
}

export {API}