const axios = require('axios');

async function run() {
  try {
    // Register
    const reg = await axios.post('http://localhost:5000/api/auth/register', {
      name: "Test", email: "test@example.com", phone: "1234567890", password: "password", role: "farmer"
    });
    console.log("REGISTER RESPONSE:", reg.data);

    // Login
    const log = await axios.post('http://localhost:5000/api/auth/login', {
      email: "test@example.com", password: "password"
    });
    console.log("LOGIN RESPONSE:", log.data);
  } catch (err) {
    if (err.response) {
      console.log("ERROR RESPONSE:", err.response.data);
    } else {
      console.log("ERROR:", err.message);
    }
  }
}

run();
