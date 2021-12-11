const fs = require("fs");
const requestHandler = (req, res) => {
  console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    //menggunakan event driven development
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      //writeFile memanggil function setelah selesai
      //writeFileSync menahan/memblock kodingan hingga selesai
      fs.writeFile("message.txt", message, (err) => {
        //err akan null jika tidak ada error
        res.statusCode = 302; //302 artinya redirect
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

//BEBERAPA CARA export
//1
// module.exports = requestHandler;
//2
// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// };
//3
// module.exports.handler = requestHandler;
// module.exports.someText = "Some hard coded text";
//4
exports.handler = requestHandler;
exports.someText = "Some hard coded text";
