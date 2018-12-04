Simple dockerized (so you can easily deploy to aks or aci) node/express server to convert office files to pdf. It uses Libreoffice to do the job.

Default port is `3000`, you can change it by providing the `PORT` env var. Don't forget to expose the new port if you do so.

There is one `POST` endpoint `/topdf` , where you can send the office file as `multipart/form-data` in the `document` field of the form-data.

`curl --request POST 
  --url http://localhost:3000/topdf 
  --form document=<doc_bytes_here>`