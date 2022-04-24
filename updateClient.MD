# Update the client file(type script)
1. Add dependency in package.json 
```
"dependencies": {
    "fs-extra": "^10.1.0"
  }

```

2. Update the auth provider code snippet
```
import * as fs from "fs-extra";

const authProvider = new CertificateAuthProvider(
  // Please add code to read your cert and private key, replace "<your-cert>" and "<your-private-key>" with actual value.
  // If you have a .pfx cert, you can use "createPfxCertOption" function to initialize your cert option.
  createPemCertOption(
    fs.readFileSync('../client_cert.pem', 'utf8'),
    fs.readFileSync('../client_key.pem','utf8'),
    {
      ca: fs.readFileSync('../server_cert.pem', 'utf8'),
    }
  )
);
```
3. Config client key file.
