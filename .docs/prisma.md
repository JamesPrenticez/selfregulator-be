[https://www.prisma.io/docs/getting-started/quickstart]
npx prisma init --datasource-provider sqlite - only need to do this at the very beginning
npx prisma migrate dev --name init

Start here
npx prisma generate
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&appName=<appName>"
