const colors = require('colors');
const glob = require("glob");

// App object
const app = {};
app.config = require('./config');
app.attrs = () => app.config.get();


//Utils
app.utils = {};
app.utils.excludeFromArray = (files, ignoreThese, withKey = false) => {
    const whitelisted = [];
    for (const f of files) {
        for (const ig of ignoreThese) {
            if (withKey && !(new RegExp(`^${ig}`)).test(f.Key)) {
                whitelisted.push({ Key: f.Key });
            }
            if (!withKey && !(new RegExp(`^${ig}`)).test(f)) {
                whitelisted.push(f);
            }
            break;
        }

    }

    return whitelisted;
}
app.utils.getDirectories = (src) => {
    return glob.sync(src + '/**/*.*');
};


//Clear Bucket objects
app.clearS3 = async () => {

    //AWS
    const AWS = require('./lib/aws/aws').config(app.attrs());


    // A) Init S3
    app.s3 = new AWS.S3({ apiVersion: '2006-03-01' });

    // B) Get S3 Data
    var params = { Bucket: app.attrs().s3Bucket };
    const s3Objects = await app.s3.listObjectsV2(params).promise();
    console.log('> '.green + 'Got objects');


    // C) Empty S3
    var params = {
        Bucket: app.attrs().s3Bucket,
        Delete: {
            Objects: app.utils.excludeFromArray(s3Objects.Contents, app.attrs().ignore, true),
            Quiet: false
        }
    };
    if (params.Delete.Objects.length) {
        const deleted = await app.s3.deleteObjects(params).promise().catch((err) => { throw (err) });
        console.log('> '.green + 'Deleted from S3:');
        deleted.Deleted.map(el => console.log(('  |-> ' + el.Key).grey));
    } else {
        console.log('> Nothing to delete.'.yellow);
    }
}

//Upload to S3
app.uploadToS3 = async () => {

    //AWS
    const AWS = require('./lib/aws/aws').config(app.attrs());
    app.s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const fs = require('fs');

    // A) Read all data needs to be uploaded
    var files = app.utils.excludeFromArray(app.utils.getDirectories(app.attrs().path), app.attrs().ignore.map(el => app.attrs().path + '/' + el), false);
    console.log('> '.green + 'Data loaded..');
    console.log(files);

    // B) Then upload the new files
    console.log('> '.green + 'Upload initiated..');

    const proms = [];
    for (const file of files) {
        var filename = file.split('/').pop();
        var s3name = file.replace(app.attrs().path, '');
        if (s3name[0] == '/') { s3name = s3name.slice(1); }

        // Read content from the file
        const fileContent = fs.readFileSync(file);

        // Setting up S3 upload parameters
        var thisContType = filename.split('.');
        switch (thisContType.pop()) {
            case 'html':
                thisContType = 'text/html';
                break;
            case 'css':
                thisContType = 'text/css';
                break;
            case 'js':
                thisContType = 'application/javascript';

                break;
            case 'txt':
                thisContType = 'text/plain';
                break;

            default:
                thisContType = 'text/html';
                break;
        }
        const params = {
            Bucket: app.attrs().s3Bucket,
            Key: s3name, // File name you want to save as in S3
            Body: fileContent,
            ContentType: thisContType
        };

        //C) Uploading files to the bucket
        proms.push(app.s3.upload(params).promise().then((data) => {
            console.log(`  |->`.green + ` File uploaded successfully. ${data.Key}`);
        }));
    }
    await Promise.all(proms);
}
//Run the script
app.run = async () => {
    try {
        await app.clearS3();
        await app.uploadToS3();
        console.log('> '.green + ' Completed  ');
    } catch (error) {
        console.error(error);
        throw (new Error(error.message.red));
    }

}
module.exports = app;