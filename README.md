# 🌌 `deploytos3`

## A simple CLI tool for uploading files to an S3 Bucket

#### ✅Perfect use for your FrontEnd projects on your S3 Bucket

<br>

### 📍 TODO LIST

- Add option of delete S3 files or just upload
- Detailed Documentation


___

### 📍 Install

Install with Npm or Manually:

#### **-NPM**  

`npm install @siourdas-vasilis/deploytos3 -g`

*or*

#### **-Manually to your folder of your choice**

1) Move the files to a directory of your choice

2) Run `npm install` to install all dependencies

3) Run `npm link` to be able to run the app globally

___

### 📍 How to use

1) Test that the tool is working globally by running:

    ```powershell
    $ deploytos3 -v
    
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
    |       Deploy To S3 \_/     |
    |~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
     version: 2.0.60
    
    ```

2) Create config file in your project's root path, named `.deploytos3`

3) Add your project as well your AWS, details.
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
                "path": "./dist",       //your path to be uploaded  /required/  
                "ignore": ["assets"],   //paths you want to ignore  
                "clearS3": true,        //clear S3 before upload
                "ignoreS3": ["styles.css"],//paths you want to ignore from S3 deletion (if clearS3=true)
                "profile": "default",   //your AWS profile      /required/
                "region": "<region>",   //your AWS region       /required/
                "s3Bucket": "arn:aws:s3:<region>:<account-id>:accesspoint/xxxx"//your S3 accesspoint    /required/
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

4) Run the `upload` command in the directory of your project which contains your config file:

    ```powershell
    $ deploytos3 upload
    ```

___

### 📍 Default behaviors

- Auto loads `.deploytos3` file inside your root path


___

### 📍 Commands
  
> #### ***upload [options]***

```powershell
$ deploytos3 upload [options]

Upload your files to your S3 bucket

Options:
  -c, --config <configPath>                 Specify the config file of the project (default: ".deploytos3")
  -e, --env <env>                           Specify environment that will be used from `config.js` file.
                                            (default: "dev")
  -p, --path <path>                         Specify path of the folder that will be uploaded.
  -pr, --profile <profile>                  Specify AWS profile
  -s3, --s3-bucket <bucket>                 Specify the S3 bucket
  -ig, --ignore <ignorePathsJSON>           Ignore paths or files for the upload procedure (JSON format)
  -ig-s3, --ignore-s3 <ignorePathsJSON_S3>  Ignore paths of S3 (JSON format)
  -cl-s3, --clear-s3                        Option to delete existing files in S3 before upload begins 
                                            (used with --ignore-s3  to avoid deletion of specific paths/files)
```

___

> #### ***check [options]***

```powershell
$ deploytos3 check [options]

Check config settings
(this command is a tool to check if the config file is found and parsed successfully.)

Options:
  -c, --config <configPath>     (default: ".deploytos3")
```

___

*the end*
