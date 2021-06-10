 1-st slide

 Using the API FileSystem, we will be able to operate with large binary objects and provide access to applications outside the browser.

 Examples of applications using the API files and directories:
     - Applications with continuous loading.
     - Video games or other applications with a lot of media resources.
     - Audio or photo editor with the ability to work offline or a local cache.
     - Offline video player.
     - Offline email client.

*Today only Chrome has a full support of FileSystem API

2-nd slide
Reading slide

3-nd slide
A few words about the objects with which you have to work:
-File — the file itself
-FileList — An "array" of File objects.
-Blob — an entity that allows you to parse a file by byte.

4-th slide
A Function onInitFs() gets an object FileSystem, corresponding to the initiated file system.
type — storage type of file resources.
 Can take values TEMPORARY (resources can be deleted if there is not enough free space) and PERSISTENT
 (resources can be deleted only by the user or the application);

5-th slide
Here, the getFile () method creates a log file at the root of the created file system. 
A callback function here takes as arguments a FileEntry object (interface) that has all methods and properties of a regular file.

Epilog

The file system API is a powerful and easy-to-use technology that provides web developers with a host of new 
features when building web applications. This technology is still fairly new and not widely supported by major browsers.



