export default {
  secret: process.env.JWT_SECRET || 'examplesecret',
  database: process.env.MONGODB_URI || 'mongodb://localhost:27017/node_restful_example'
};