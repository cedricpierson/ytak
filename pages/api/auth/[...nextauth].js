import NextAuth from 'next-auth';
import SequelizeAdapter from '@next-auth/sequelize-adapter';
import { Sequelize } from 'sequelize';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
const mysql = require('mysql2');
// import EmailProvider from 'next-auth/providers/email';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});
// const adapter = SequelizeAdapter(sequelize);

// sequelize.sync();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    //   // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
  ],
  pages: {
    signIn: '/masterclass',
    signOut: '/signin',
  },
  secret: process.env.JWT_SECRET,
  adapter: SequelizeAdapter(sequelize),
});
