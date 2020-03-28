var http = require("http")

var fs = require("fs")

http
  .createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    if (req.url === '/') {
      const form = `
      <form method="POST" action="/message">
        <input type="text" name="message" /><br>
        <button>Submit</button>
      </form>
      `
      res.write(form);
      res.end()
    }    
    else if (req.url === '/message' && req.method === 'POST') {
      let data = ''
      req.on('data', (chunk) => {
        data += chunk.toString().split('=')[1]
      })
      req.on('end', () => {
        if (data.length < 1) {
          res.end('Saving failed, no message was entered')
        } 
        else {
          fs.appendFile('message.txt', data, (err) => {
            if (err) {
              res.end('Saving Failed :' + err)
            } else {
              res.end('Message saved')
            }
          })
        }
      })

    }
    else {
      res.write('404 Page not found')
      res.end()
    }
  })
  .listen(8080);
  console.log('App started now running at localhost:8080')