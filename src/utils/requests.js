let API = "";

if (window.location.href.includes('localhost')) {
  API = `http://localhost:4000`
  // API = `https://development-smartkids.herokuapp.com`
} else {
  API = `http://138.197.108.96:4000`
}

export {API}