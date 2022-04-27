const https = require("https");
const fs = require("fs-extra")
const serverCertAuthConfig = {
    requestCert: true,
    cert: fs.readFileSync('cert/server_cert.pem','utf8'),
    key: fs.readFileSync('cert/server_key.pem','utf8'),
    ca: fs.readFileSync('cert/server_cert.pem','utf8'),
};

const host = "localhost";
const port = 53002;
const server = https.createServer(serverCertAuthConfig, (req, res) => {
    res.writeHead(200);
    const cert = req.socket.getPeerCertificate();
    res.end(cert.subject.CN);
});
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});