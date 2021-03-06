# NTalk

This project is a didactic example used to learn Node.js.

## Requirements

The following items have to be installed and running:

* Node.js
* npm
* MongoDB
* Redis

## Installing

Clone the repository:

```
git clone https://github.com/pellizzetti/ntalk && cd ntalk
```

Installing Dependencies:

```
npm install
```

Rename the `.env.example` => `.env` and set the variables as needed.

## Running

Set `NODE_ENV=development`.

This is a simple application, users are automatically created at the `/POST login`.

```
npm start
```

## Testing

Set `NODE_ENV=test`.

```
npm test
```

## License

The MIT License (MIT)

Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
