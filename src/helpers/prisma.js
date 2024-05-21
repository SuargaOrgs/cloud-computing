const { PrismaClient } = require('@prisma/client');
const url = require('url');

class ExtendedPrismaClient extends PrismaClient {
  constructor() {
    super();
    this.connectionDetails = this.getConnectionDetails();
    this.$connect()
      .then(() => console.log('Connected to the database successfully.'))
      .catch((error) => console.error('Failed to connect to the database:', error));
  }

  getConnectionDetails() {
    const dbUrl = process.env.DATABASE_URL;
    const parsedUrl = url.parse(dbUrl);

    return {
      protocol: parsedUrl.protocol,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      dbname: parsedUrl.pathname.split('/')[1],
      username: parsedUrl.auth.split(':')[0],
    };
  }
}

const prisma = new ExtendedPrismaClient();

module.exports = prisma;