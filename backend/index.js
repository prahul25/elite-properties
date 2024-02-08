const http = require("http");
const { data } = require("./data.json");

const server = http.createServer((req, res) => {
  const serverInfo = {
    serverName: "Crio Server",
    version: "1.0.0",
    currentDate: new Date().toDateString(),
    currentTime: new Date().toTimeString(),
  };
  
  // Through if else
  if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(` <h1>Currency Database</h1>\n`);
      res.end();
    } else if (req.url === "/currencies") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } else {
        for(let countries of data){
            
            if(req.url.toLowerCase() === `/${countries.id.toLowerCase()}`) {
                // console.log(data[i])

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(JSON.stringify(countries));
            return res.end();
      }
    }
    res.writeHead(404 , {'Content-Type':'text.plain'});
    res.write('Error 404 : Page not found');
    res.end();
  }

  // Through switch cases
  // switch (req.url) {
  //     case "/":{
  //         res.writeHead(200 , {"Content-Type": "text/plain"})
  // res.write(` <h1>Currency Database</h1>\n`)

  // res.end()
  // break;
  //     }
  //     case "/currencies":{
  //         res.writeHead(200, {"Content-Type": "application/json"});
  //     res.write(JSON.stringify(data))
  //     res.end()
  //     break;
  //     }

  // default:{
  //     res.writeHead( 404);
  // res.end();
  //     break
  // }}
});

server.listen(8082, () => console.log("listening on port 8082"));
