# Manual deployment processes

> [!IMPORTANT]
>
> This is not my favorite way of doing things at all. I just did it since I wanted to get a feeling of the steps you usually need to take.

Here we use Nginx, and NodeJS.

1. [Launch an EC2 instance](../aws/EC2/launching-an-instance.md).
2. If you have not done it while creating EC2 now you can [assign a new security group to your EC2 to open its port 80 to the public](../aws/EC2/security-groups.md#opening-port-80-of-an-ec2-instance).
3. Now ssh to your EC2 instance via the `YourPrivate.pem` key. To do that:

   1. Right click on your EC2 instance and click on connect:

      ![Connect to EC2 instance option in menu](./assets/connect-to-ec2-instance.png)

   2. And in the new tab click on "SSH client", and there you can find a copy button next to a ssh command with the appropriate key, username and hostname. But if it needs some modifications do not be shy:

      ![Connect to client tab through SSH](./assets/connect-to-client-through-ssh.png)

4. Now head yo your terminal and paste the copied command (make sure your key is located in the same place you're running this command).
5. Then inside the container do a quick update:

   ```shell
   sudo apt update
   ```

6. Install necessary packages:

   ```shell
   sudo apt install nginx nodejs npm -y
   ```

7. <a id="findPublicIpv4DnsInAws" href="#findPublicIpv4DnsInAws">#</a> BTW if you need to access your EC2 instance just go to your instance detailed view page and copy your public IPv4 DNS address and enter it in your browser. Of course since we just installed Nginx in previous step you should see Nginx welcome page.

   ![Public IP v4 DNS record](./assets/public-ipv4-dns-address.png)

8. Install [`pm2`](https://pm2.keymetrics.io/) on your EC2 instance globally:

   ```shell
   sudo npm i --global pm2
   ```

   <details>
     <summary>A few commands you most likely will need while using <code>pm2</code></summary>
     <ul>
       <li>
         <code>pm2 logs processName</code>
         <br />
         This will log all the logs of that process. Similar to
         <code>docker logs containerName -f</code>.
       </li>
       <li>
         <code>pm2 start script.js --name processName</code>
         <br />
         This will start a new process with the passed name.
       </li>
       <li>
         <code>pm2 delete processName</code>
         <br />
         To delete a process by its name.
       </li>
       <li>
         <code>pm2 restart processName</code>
         <br />
         Restarts an existing process.
       </li>
     </ul>
   </details>

9. Install `n` globally and change your node version to match the one you selected in your GitHub actions:

   ```shell
   sudo npm i --global n
   sudo n 22
   hash -r # To reload your bash command line so that when you run `node -v` it uses node v22.
   ```

10. <a id="createRepositoryLevelVariable" href="#createRepositoryLevelVariable">#</a> Create a new variable in your GitHub repo named `FRONTEND_URL` and copypaste your ["Public IPv4 DNS"](#findPublicIpv4DnsInAws) as its value:

    1. Go to your repo's page.
    2. Open "Settings".
    3. Navigate to "Secrets and variables" in the sidebar on left hand side and click on "Actions", then switch to "Variables" tab, and finally click on "New repository variable" button:

       ![Add env variable](./assets/add-env-variable.png)

    4. Now we can add a new env variable:

       ![Add new variable page](./assets/add-new-variable-page.png)

11. Then go to your GitHub repo page and create an action to deploy this project to your EC2 instance:

    1. Click on "Actions".
    2. Add a new workflow for your ExpressJS app:

       1. Search for "node".
       2. Pick the one with "Node.js" name:

          ![NodeJS workflow](./assets/nodejs-workflow.png)

       3. Modify it the way you like. I am just gonna:

          1. Remove the on pull request event trigger since I do not need it. [Learn more here](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows).

             Instead I add `workflow_dispatch:` to be able to run this workflow manually too. Just in case.

             On another note, since the `actions/setup-node@v4` will look for a `package-lock.json` file in the root of our repo and in our case we do not have one (it is a monorepo). Thus we need to specify where is our `package-lock.json`. Read more [here](https://github.com/actions/setup-node?tab=readme-ov-file#caching-global-packages-data)

          2. Change the runner from `ubuntu-latest` to `self-hosted`. Indicating my intention of having the steps defined in this workflow to be executed on my EC2 instance.
          3. I just want it to run the steps of jobs in NodeJS version 22. So I will remove the other versions.
          4. Since this is a monorepo we need to change our working directory too.
          5. I removed the `npm test` too.
          6. And lastly I wanted to start/restart the backend on each deploy.

             Note that we are using [`vars` context](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs#vars-context) to access repository level variable we've created [here](#createRepositoryLevelVariable) as env variable.

          **This is the final product**:

          ```yaml
          # This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
          # For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs
          name: Node.js CI
          on:
            push:
              branches: ['main']
            workflow_dispatch:
          defaults:
            run:
              working-directory: ./deploying-exercises/expressjs-cors/backend
          jobs:
            build:
              runs-on: self-hosted
              strategy:
                matrix:
                  node-version: [22.x]
                  # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
              steps:
                - uses: actions/checkout@v4
                - name: Use Node.js ${{ matrix.node-version }}
                  uses: actions/setup-node@v4
                  with:
                    node-version: ${{ matrix.node-version }}
                    cache-dependency-path: deploying-exercises/expressjs-cors/backend/package-lock.json
                    cache: 'npm'
                - run: npm ci
                - run: npm run build --if-present
                - name: Restart the process on each new deploy or start the process if it does not exist
                  run: pm2 restart backend || pm2 start index.js --name backend
                  env:
                    FRONTEND_URL: ${{ vars.FRONTEND_URL }}
          ```

       4. Commit the file after necessary modifications.

12. Create a self hosted runner in GitHub:

    1. To do that got to "Settings" tab in your GitHub repo.
    2. On the left, inside the sidebar you click on "Actions" and then "Runners":

       ![Create self hosted runner](./assets/create-self-hosted-runner.png)

    3. In order to have a functional self-hosted runner you need to download, configure, and execute the **GitHub Actions Runner**. So we need to follow the instructions written down under the "Download" section:

       ![choose linux self hosted runner](./assets/choose-linux-self-hosted-runner.png)

       Following those steps:

       ![Following steps to configure self hosted runner](./assets/following-steps-to-configure-self-hosted-runner.png)

       **☝️ Note that we've accepted the default path for where our artifacts will be generated and pushed which is `_work`. Meaning if you cd into it and run `ls` you should be able to see a directory with your repository's name ☝️**.

       > [!CAUTION]
       >
       > We diverge a little bit, after we've executed `./config.hs ...` we need to do the following steps:
       >
       > ![use svc.sh bash script instead of run.sh](./assets/run-svc-script-instead-of-run.png)
       >
       > I tried to follow GitHub's steps and ran `./run.sh` but it did not work.

    4. Finally after a couple of minutes if you go back to "Runners" tab in "Settings" you should see something like this:

       ![Final result, you can see your newly configured self hosted runner in settings page](./assets/newly-configured-self-hosted-runner.png)

13. Now it is time to move on and configure our Nginx to show our frontend app:

    1. Copy the path to `index.html` that we have in our frontend directory.

       BTW this file most of the times will be generated after you build your ReactJS app. Thus you need to check where it is located exactly inside the `_work` directory (it should be inside `dist`, or `build`).

       To find the path first `cd` to where your `index.html` is inside `_work` and the run the following command and copy the printed path.

       ```shell
       pwd
       ```

    2. ```shell
       sudo nano /etc/nginx/sites-available/default
       ```
    3. Instead of `root /var/www/html;` you need `root /home/ubuntu/actions-runner/_work/cloud/cloud/deploying-exercises/expressjs-cors/frontend;`

       Do **not** forget the semicolon at the end of your [`root` directive](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/).

    4. And add a [`location` block directive](http://nginx.org/en/docs/http/ngx*http_core_module.html#location) for the backend right after `server_name *;`:

       ```nginx
       location /api/ {
         proxy_pass       http://localhost:3000;
         proxy_set_header Host            $host;
         proxy_set_header X-Real-IP       $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
       ```

       > [!CAUTION]
       >
       > Keep your `APP_PORT` number in your backend app's env variable in line with the number entered here. Worth mentioning that its default value is 3000.

    5. Save changes and then reload Nginx:

       ```shell
       sudo systemctl reload nginx
       ```

       > [!NOTE]
       >
       > Note that I do not like restarting this service since if you've made any sort of mistake reload will yell at you and won't kill the old process unless it is sure there is no syntax error in your nginx config file.

## 404 -- Nginx issue

1. Check whether I can access my backend.
2. Check the `systemctl` logs for nginx: `sudo systemctl status nginx`.
3. Check Nginx logs: `cat /var/log/nginx/error.log`.
4. Tried to restart the Nginx, sometimes it only needed a restart after `chmod 777` for testing.
   1. Still dunno what is wrong with ubuntu and default permissions.
