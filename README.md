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

<<<<<<< HEAD
#### **-NPM**  

`npm install @siourdas-vasilis/deploytos3 -g`

=======

 #### **-NPM**  

`npm install @siourdas-vasilis/deploytos3 -g`


>>>>>>> a832dae33ee2df3780f3bbb4990a82b464e24944
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
     version: 2.0.0
    
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

4) Run the `upload` command in the directory of your project which contains your config file:

    ```powershell
    $ deploytos3 upload
    ```

___

### 📍 Default behaviors

- **Deletes all** existing files on S3 except they are specified in `ignore` option. [TO BE FIXED IN THE FUTURE : should delete only by option]
- Auto loads `.deploytos3` file inside your root path


___

### 📍 Commands
  
> #### ***upload [options]***

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
