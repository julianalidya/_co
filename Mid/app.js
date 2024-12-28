import { Application, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions/mod.ts";
import * as render from "./render.js";

const users = {};

async function loadData() {
  try {
    const data = await Deno.readTextFile("data.json");
    Object.assign(users, JSON.parse(data));
  } catch {
    console.log("No existing data file found. Starting fresh.");
  }
}

async function saveData() {
  await Deno.writeTextFile("data.json", JSON.stringify(users, null, 2));
}

const router = new Router();
router
  .get("/", home)
  .get("/signup", signupUi)
  .post("/signup", signup)
  .get("/login", loginUi)
  .post("/login", login)
  .get("/logout", logout)
  .get("/game", gameUi)
  .post("/game/score", submitScore)
  .get("/leaderboard", leaderboard)
  .get("/game.js", async (ctx) => {
    ctx.response.type = "application/javascript";
    ctx.response.body = await Deno.readTextFile("./game.js");
  });

const app = new Application();
app.use(Session.initMiddleware());
app.use(router.routes());
app.use(router.allowedMethods());

async function parseForm(ctx) {
  const body = ctx.request.body({ type: "form" });
  return Object.fromEntries(await body.value);
}

async function home(ctx) {
  const user = await ctx.state.session.get("user");
  ctx.response.body = render.home(user);
}

async function signupUi(ctx) {
  ctx.response.body = render.signupUi();
}

async function signup(ctx) {
  const form = await parseForm(ctx);
  if (users[form.username]) {
    ctx.response.body = render.fail("Username already exists.");
  } else {
    users[form.username] = { password: form.password, highScore: 0 };
    await saveData();
    ctx.response.body = render.success("Sign-up successful! Please log in.");
  }
}

async function loginUi(ctx) {
  ctx.response.body = render.loginUi();
}

async function login(ctx) {
  const form = await parseForm(ctx);
  const user = users[form.username];
  if (user && user.password === form.password) {
    await ctx.state.session.set("user", { username: form.username });
    ctx.response.redirect("/");
  } else {
    ctx.response.body = render.fail("Invalid username or password.");
  }
}

async function logout(ctx) {
  await ctx.state.session.set("user", null);
  ctx.response.redirect("/");
}

async function gameUi(ctx) {
  const user = await ctx.state.session.get("user");
  if (user) {
    const highScore = users[user.username]?.highScore || 0; 
    ctx.response.body = render.game(user.username, highScore); 
  } else {
    ctx.response.body = render.fail("You must log in to play.");
  }
}

async function submitScore(ctx) {
  const user = await ctx.state.session.get("user");
  if (!user) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  const { score } = await ctx.request.body({ type: "json" }).value;
  if (isNaN(score)) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Invalid score submitted." };
    return;
  }

  if (score > users[user.username].highScore) {
    users[user.username].highScore = score;
    await saveData(); 
  }

  ctx.response.body = { success: true, highScore: users[user.username].highScore };
}

async function leaderboard(ctx) {
  const leaderboard = Object.entries(users)
    .map(([username, data]) => ({ username, highScore: data.highScore }))
    .sort((a, b) => b.highScore - a.highScore);
  ctx.response.body = render.leaderboard(leaderboard);
}

await loadData();
console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
