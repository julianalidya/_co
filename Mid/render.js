export function layout(title, content) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ffe3eb; 
          color: #333;
        }
        .container {
          text-align: center;
          background-color: #fff;
          border-radius: 15px;
          padding: 20px 40px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        a {
          display: inline-block;
          margin: 10px;
          padding: 10px 20px;
          background-color: #ffb9c5;
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
          border: 2px solid #ff91a4;
        }
        a:hover {
          background-color: #ff91a4;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${content}
      </div>
    </body>
    </html>
  `;
}

export function home(user) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Home</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #ffe8f2; 
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .home-container {
          background-color: #fff;
          border-radius: 20px;
          padding: 50px 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 350px;
          text-align: center;
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center;
        }
        h1 {
          font-size: 26px;
          margin-bottom: 20px;
          color: #000000;
          font-weight: bold;
        }
        .btn-group {
          display: flex;
          justify-content: center;
          margin-bottom: 5px;
          align-items: center;
        }
        .btn-group a {
          margin: 0 10px;
          padding: 10px 20px;
          background-color: #ffb9c5;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          border: 2px solid #ff91a4;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-group a:hover {
          background-color: #a55b6e; 
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .menu {
          margin-top: 15px; 
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .menu a {
          display: block;
          width: 80%;
          margin-bottom: 10px;
          padding: 12px;
          background-color: #ffb9c5;
          border: 2px solid #ff91a4;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          text-align: center; 
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .menu a:hover {
          background-color: #a55b6e;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .user-info {
          margin-top: 10px;
          color: #000000;
        }
      </style>
    </head>
    <body>
      <div class="home-container">
        <h1>Welcome to Snake Game!</h1>
        ${
          user
            ? `<p class="user-info">Logged in as <strong>${user.username}</strong> | <a href="/logout" style="color: #ff91a4; text-decoration: none;">Logout</a></p>`
            : `<div class="btn-group">
                <a href="/login">Log In</a>
                <a href="/signup">Sign Up</a>
               </div>`
        }
        <div class="menu">
          <a href="/game">Play Game</a>
          <a href="/leaderboard">Leaderboard</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function game(username, highScore) {
  return layout(
    "Snake Game",
    `
    <div class="header">
      <div class="score-container" style="display: flex; justify-content: space-between; padding: 10px; background-color: #ffb9c5; border-radius: 10px; color: white; font-weight: bold;">
        <span id="current-score">Score: 0</span>
        <span id="high-score">High Score: ${highScore}</span>
      </div>
    </div>
    <div id="game"></div>
    <a href="/" style="display: block; margin-top: 20px; text-align: center; background-color: #ffb9c5; color: white; padding: 10px; border-radius: 5px; text-decoration: none;">Back to Home</a>
    <script src="/game.js"></script>
  `
  );
}

export function leaderboard(data) {
  const leaderboardHtml = data
    .map(
      (entry, index) => `<tr><td>${index + 1}</td><td>${entry.username}</td><td>${entry.highScore}</td></tr>`
    )
    .join("");

  return layout(
    "Leaderboard",
    `
    <h1>Leaderboard</h1>
    <table border="1" style="margin: 0 auto; border-collapse: collapse;">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>High Score</th>
        </tr>
      </thead>
      <tbody>
        ${leaderboardHtml}
      </tbody>
    </table>
    <p><a href="/">Back to Home</a></p>
  `
  );
}

export function signupUi() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Sign Up</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #ffe3eb; 
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .signup-container {
          background-color: #fff;
          border-radius: 20px;
          padding: 50px 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 350px;
          text-align: center;
        }
        h1 {
          font-size: 26px;
          margin-bottom: 20px;
          color: #000000;
          font-weight: bold;
        }
        form {
          display: flex;
          flex-direction: column; 
          align-items: center;
        }
        input {
          width: 100%;
          max-width: 280px; 
          padding: 12px;
          margin: 10px 0;
          border: 2px solid #ffd3da; 
          border-radius: 8px;
          font-size: 16px;
          color: #333;
          outline: none;
        }
        input:focus {
          border-color: #ff91a4; 
          box-shadow: 0 0 5px rgba(255, 145, 164, 0.5);
        }
        button {
          width: 100%;
          max-width: 280px;
          padding: 12px;
          background-color: #ff91a4;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 10px;
        }
        button:hover {
          background-color: #a55b6e;
        }
        p {
          margin-top: 15px;
          font-size: 14px;
          color: #a55b6e;
        }
        p a {
          text-decoration: none;
          color: #ff91a4;
          font-weight: bold;
        }
        p a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="signup-container">
        <h1>Sign Up</h1>
        <form method="post" action="/signup">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <input type="email" name="email" placeholder="Email" required />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </body>
    </html>
  `;
}

export function loginUi() {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Login</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #ffe3eb; 
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .login-container {
          background-color: #fff; 
          border-radius: 20px;
          padding: 50px 40px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 350px;
          text-align: center;
        }
        h1 {
          font-size: 26px;
          margin-bottom: 20px;
          color: #000000;
          font-weight: bold;
        }
        form {
          display: flex;
          flex-direction: column; 
          align-items: center;
        }
        input {
          width: 100%; 
          max-width: 280px; 
          padding: 12px;
          margin: 10px 0;
          border: 2px solid #ffd3da; 
          border-radius: 8px;
          font-size: 16px;
          color: #333;
          outline: none;
        }
        input:focus {
          border-color: #ff91a4; 
          box-shadow: 0 0 5px rgba(255, 145, 164, 0.5);
        }
        button {
          width: 100%;
          max-width: 280px;
          padding: 12px;
          background-color: #ff91a4; 
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 10px;
        }
        button:hover {
          background-color: #a55b6e; 
        }
        p {
          margin-top: 15px;
          font-size: 14px;
          color: #a55b6e; 
        }
        p a {
          text-decoration: none;
          color: #ff91a4; 
          font-weight: bold;
        }
        p a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="login-container">
        <h1>Log In</h1>
        <form method="post" action="/login">
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Register</a></p>
      </div>
    </body>
    </html>
  `;
}

export function success(message) {
  return layout(
    "Success",
    `
    <h1>${message}</h1>
    <p><a href="/login">Go to Login</a></p>
  `
  );
}

export function fail(message) {
  return layout(
    "Failure",
    `
    <h1>${message}</h1>
    <p><a href="javascript:history.back()">Go Back</a></p>
  `
  );
}
