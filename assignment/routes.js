const fs = require("fs");
const requestHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter Username</title></head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.setHeader("content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>User List</title></head>");
    res.write("<body>");
    res.write("<ul><li>User 1</li></ul>");

    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    //menggunakan event driven development
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      console.log(user);
    });
    res.statusCode = 302; //302 artinya redirect
    res.setHeader("Location", "/");
    res.end();
  }
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
