// List book recommendations and pull their details:

const express = require("express");
const morgan = require("morgan");
const html = require("html-template-tag");
const booksLib = require("./booksLib");
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`GÜDREADS app listening on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(html`
    <html>
      <head>
        <title>GÜDREADS</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <h1>GÜDREADS</h1>
        <div id="book-list">
          ${booksLib.map(
            (book) => html` <div class="book-rows">
              <a href="/books/${book.bookId}">
                <img src="${book.coverImg}" />
              </a>
              <div id="book-blurb">
                ${book.likedPercent}% liked; rated ${book.rating} stars by
                ${book.numRatings}
              </div>
            </div>`
          )}
        </div>
      </body>
    </html>
  `);
});

app.get("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const book = booksLib.find((book) => book.bookId === bookId);
  if (book) {
    res.send(html`
      <html>
        <head>
          <title>GÜDREADS</title>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <a href="/">
            <h1>GÜDREADS</h1>
          </a>
          <div id="book-item">
            <div>
              <img src="${book.coverImg}" />
            </div>
            <div>
              <p>Title: ${book.title}</p>
              <p>Author: ${book.author}</p>
              <p>ISBN: ${book.isbn}</p>
              <p>Publisher: ${book.publisher}</p>
              <p>Publish Date:${book.publishDate}</p>
              <p>Genres: ${book.genres.replace("[", "").replace("]", "")}</p>
              <p>Description: ${book.description}</p>
            </div>
          </div>
        </body>
      </html>
    `);
  } else {
    res.status(404).send(html`
      <html>
        <head>
          <title>GÜDREADS</title>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <body>
            <div>
              <a href="/">
                <h1>GÜDREADS</h1>
              </a>
            </div>
            <div>
              <h3 id="msg-404">You've hit a bad link, but don't panic!</h3>
              <p class="quote-404">"I don’t know what I’m looking for.”</p>
              <p class="quote-404">"Why not?"</p>
              <p class="quote-404">
                Because...because...I think it might be because if I knew I
                wouldn’t be able to look for them.”
              </p>
              <p class="quote-404">
                — Douglas Adams, The Hitchhiker's Guide to the Galaxy
              </p>
            </div>
          </body>
        </body>
      </html>
    `);
  }
});

app.use((req, res) => {
  res.status(404).send(html`
    <html>
      <head>
        <title>gÜdreads</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div>
          <a href="/">
            <h1>GÜDREADS</h1>
          </a>
        </div>
        <div>
          <h3 id="msg-404">You've hit a bad link, but don't panic!</h3>
          <p class="quote-404">"I don’t know what I’m looking for.”</p>
          <p class="quote-404">"Why not?"</p>
          <p class="quote-404">
            Because...because...I think it might be because if I knew I wouldn’t
            be able to look for them.”
          </p>
          <p class="quote-404">
            — Douglas Adams, The Hitchhiker's Guide to the Galaxy
          </p>
        </div>
      </body>
    </html>
  `);
});
