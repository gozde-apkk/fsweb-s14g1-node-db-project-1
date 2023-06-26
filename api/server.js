const express = require("express");

const server = express();

server.use(express.json());
server.use("/api/accounts", accountRouter);
server.get("/", (req, res) => {
  res.send("Server is up and running!...");
});
//globale error middleware eklenmiş oldu, bu bir custom error handler
//bunu routera da yazabilirdik ama o zman sadece routerda çalışırdı
//tüm uygulamada standart bi response kullanacağımız için buraya yazdık. account gibi farklı dosyalar olsa ve herbirinde farklı bi error mesajı döneceksek onların rouerına yazardık
server.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error..." });
});
module.exports = server;


