___
## `deploytos3` 

#### A simple tool for uploading files to an S3 Bucket.
___
<br>

### How to use:

1) Move the files to a directory of your choice

2) Run `npm install` to install all dependencies

3) Run `npm link` to be able to run the app globally

3) Test that the tool is working globally by running:

```powershell
$ deploytos3 -v

|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|       Deploy To S3 \_/     |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
 version: 2.0.0

```

5) Create config file in your project's root path, named `.deploytos3`

6) Add your project as well your AWS, details.
For example:

```javascript
{
    // *required
    "defaults": {         
        "env": "dev"//default environment to load
    },

    // Specify your environments
    // you can add as many you wish here
    // *required 
    "env": {              
        "dev": {          
            "path": "./dist",//your path to be uploaded
            "ignore": ["assets"],//paths you want to ignore
            "profile": "default",//your AWS profile 
            "region": "<region>",//your AWS region
            "s3Bucket": "arn:aws:s3:<region>:<account-id>:accesspoint/xxxx"//your S3 accesspoint
        },
        "prod": {
            "path": "./dist",
            "ignore": [],
            "profile": "default",
            "region": "<region>",
            "s3Bucket": "arn:aws:s3:<region>:<account-id>:accesspoint/xxxx"  
        },
        ...
    }
}
```
---


7) Run the `upload` command in the directory of your project which contains your config file:

```powershell
$ deploytos3 upload
```

<br>

### Commands:
<br>

> ***upload [options]***
```powershell
$ deploytos3 upload [options]

Upload your FrontEnd files to the S3 bucket

Options:
  -e, --env <env>                  Specify environment that will be used from `config.js` file.  (default: "dev")
  -p, --path <path>                Specify path of the folder that will be uploaded.
  -pr, --profile <profile>         Specify AWS profile
  -s3, --s3-bucket <bucket>        Specify the S3 bucket
  -ig, --ignore <ignorePathsJSON>  Ignore paths or file for the upload procedure (JSON format)
  -c, --config <configPath>        Specify the config file of the project (default: ".deploytos3")
```
---
> ***check [options]***
```powershell
$ deploytos3 check [options]

Check config settings
(this command is a tool to check if the config file is found and parsed successfully.)

Options:
  -c, --config <configPath>     (default: ".deploytos3")
```

---
### TODO LIST :
- Create NPM Package
---
*the end*
