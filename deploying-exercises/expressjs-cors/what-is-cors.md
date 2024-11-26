# CORS intricacies

1. Our client needs to be whitelisted.

   In other word tell your server that you want it to allow requests from a specific origin to get through.

   To do this we need to add `Access-Control-Allow-Origin` (ACAO) to our response which also includes the client's origin. It is an array:

   ```shell
   Access-Control-Allow-Origin: https://website-host.domain
   ```

2. For `PUT`/`DELETE`/`PATCH` requests

   1. Client will make a preflight request with:

      - `OPTION` http method.
      - `Access-Control-Request-Method: PUT` in request headers.

        **Note** that the value can be any other HTTP verb.

   2. Server responses, and inside the response header we have:

      `Access-Control-Allow-Method: GET,POST,PUT` header. Note that this list can contain more HTTP verbs.

3. For credentials and passing cookies:
   1. Client will make a preflight request with:
      - `OPTION` http method.
      - And `Access-Control-Allow-Method: PUT` in request header.
        - **Note** that the value can be any other HTTP verb.
        - **IMPORTANT**: We do not have `Access-Control-Allow-Credentials` in the request though.
   2. Your server's response should have a `Access-Control-Allow-Credentials` header.

[Here](https://gist.github.com/kasir-barati/4ecaf458fed2bce299de783448233d18) you can see a very ver very simple implementation of it in ExpressJS. But here you can see how it is done in the bigger picture.
