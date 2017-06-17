module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'super secret passphrase',
  // Database connection information
  database: 'mongodb://localhost:27017/seeme-starter',
  // Setting port for server
  port: 3000,
  // Configuring Mailgun API for sending transactional email
  mailgun_priv_key: 'mailgun private key here',
  // Configuring Mailgun domain for sending transactional email
  mailgun_domain: 'mailgun domain here',
  // SendGrid API key
  sendgridApiKey: 'sendgrid api key here',
  // necessary in order to run tests in parallel of the main app
  test_port: 3001,
  test_db: 'seeme-starter-test',
  test_env: 'test'
};
