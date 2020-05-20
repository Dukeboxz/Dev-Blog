---
title: Automating my project start up.
date: "2020-05-19"
description: "Tired of having to start multiple programs and code files everytime I started on my project I created a bash script to do it all.  This is how:"
tags: ["linux"]
---

One of my current side projects is to create a website for a kids tech club that will let the kids earn points for coding tasks they complete.  To expand my knowledge I am using the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(solution_stack)) since I have not used those technologies before.  

What I was finding that each time I went to start the project I always had to go through the following steps.

1. Open code for front end Angular project and run dev server
2. Open code for back end NodeJS project and get that server running
3. Start the dev MongoDb server 
4. Open Postman for testing end points 
5. Open web pages I would need for reference

Not a major problem but time spent doing all that clicking and having to redo things when I got file paths wrong was a bit of a pain.  

Since my dev machine is running Linux I have found a way to do all this just by typing one word in terminal through creating a bash script. 

This is how I did

### Step 1: Create your Bash file 

In a folder you have permissions for create a bash file.  So I have used developTechClub .sh 

### Step 2: Write lines to open code in editor 

I am using visual studio code which has the command line keyword of code to open files or folders. So first lines of bash files are 
```
#!/bin/bash
echo "Loading front end code"
code [File Path To Front End Code]

echo "Loading back end code"

code [File Path To Back End Code]

```
Make sure you add the #!/bin/bash to show it is a bash script

### Step 3: Write lines to start MongoDB

To start a mongodb server you must start its installed script and also give it the path of where data is to be stored.

```
[FilePath]/mongodb/bin/mongod --dbpath=[DataFilePath] &
```

### Step 4: Write lines that set up test servers 

For the front end and the back end to be worked on and tested at the same time both test servers need to be running.  

Note:  For this to work both Angular CLI and NodeJS will have to be installed globally on your machine.  For my nodejs server I am using the package [nodemon](https://www.npmjs.com/package/nodemon) so that it is restarted each time I do a change.

```
ng serve [filePath To application] & nodemon [ file path to node app]

```
<div >

>**The Importance of  the & symbol!**
>
>You may have noticed that I have used the & symbol after the mongoDb line and between the starting of the servers.  This is important becuase it means that multiple process are run at the same time.  Without this it would just run the first command and not run the others until that server had been shut down. 

</div>

### Step 5: Open other applications 

I use postman to test end points and I also have firefox open for reference so may as well start them up to show the information.  

```
firefox https://angular.io/guide/displaying-data https://www.npmjs.com & 
/[FilePathToPostman]/Postman/app/Postman
```

### Step 6: Create an alias

Once you have saved the file take note of its full file path.

Then open the file bashrc with a text editor
```console
user@computer:~$ gedit ~/.bashrc
```

Then at the bottom of the file add the line 

alias techclubapp='[FilePathToScript]/developTechClub.sh'
Save the file and restart the terminal then type techclubapp and wait 

![funny gif](tenor.gif)