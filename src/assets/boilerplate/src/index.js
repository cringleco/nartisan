import app from "./app";

const port = process.env.PORT || 5001;

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Listening: http://localhost:${port}`);
});
