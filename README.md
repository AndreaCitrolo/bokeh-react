# bokeh-react
This repository includes a very basic example of how to integrate bokeh plots in react components 
as well as some nice receipts to create a working environment for full stack development exploiting
the new remote container features of VSCode.

What do you need to make this work:

- Docker >= 19.03, older versions may work as well but I haven't tested
- VSCode >= 1.53.1, older versions may work as well but I haven't tested

All the other dependencies will be installed as part of enviroment setup by vscode using the command:

`Remote-Containers: Rebuild and Reopen in Container`

from vscode command palette.

In order to start the frontend once the dev environment has started run: 
- `cd ui`
- `yarn start`
It will open the browser and the web application on port 3000.
The backend is started automatically on port 8080.
