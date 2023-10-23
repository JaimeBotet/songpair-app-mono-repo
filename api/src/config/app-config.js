const dotenv = require("dotenv");
const fs = require("fs");

const result = dotenv.config();

if (result.error) {
	console.log("⚠️  Couldn't find .env file, creating one from .env.example");
	fs.copyFileSync('.env.example', '.env');
	dotenv.config();
}

module.exports = {
	development: {
		app: {
			port: process.env.PORT,
			accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
			refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
			clientDomain: process.env.CLIENT_DOMAIN,
			BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
		},
		db: {
			url: process.env.MONGO_DB_URL_DEVELOPMENT,
		}
	},
	test: {
		app: {
			port: process.env.PORT,
			accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
			refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
			clientDomain: process.env.CLIENT_DOMAIN_DEV,
			BCRYPT_SALT_ROUNDS: 10,
		},
		db: {
			url: process.env.MONGO_DB_URL_TEST,
		}
	},
	production: {
		app: {
			port: process.env.PORT,
			accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
			refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
			clientDomain: process.env.CLIENT_DOMAIN,
			BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
		},
		db: {
			url: process.env.MONGO_DB_URL_PRODUCTION,
		}
	}
};