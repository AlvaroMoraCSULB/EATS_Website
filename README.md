# EATS_Website


1. Clone the repo in a manner of your own choosing. 

2. Running this project requires node.js version 22.13.1(LTS) or later and npm version 10.9.2 (or later). You can download node.js [here](https://nodejs.org/en/download).

3. After downloading and installing node and npm, verify they are installed correctly by typing `node -v` and `npm -v` into your shell terminal (requires bash or zsh).

4. After verifying node and npm are installed correctly, navigate to the project's root directory and run `npm install` to install the required the required dependencies.

5. Dependencies must also be installed in each child directory with a package.json file. From the project's root directory, cd into the directory named "my" and run `npm install`. 
Then, cd into the directory named "client" and run `npm install`. Finally, cd back in the the directory named "my" then cd into the directory named "server" and run `npm install` there. 
This should install all required dependencies.

6. Two open terminals are required to run the website locally. In one terminal, navigate to the "server" directory, and in the other terminal navigate to the "client" directory.
In the server terminal, run `node server.js`. In the client terminal, run `npm start`. This should open the website locally on your machine. 

