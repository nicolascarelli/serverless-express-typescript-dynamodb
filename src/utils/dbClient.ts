import AWS from 'aws-sdk';

const dbClient = () => {
  const IS_OFFLINE = process.env.IS_OFFLINE;
  let dynamoDb;
  if (IS_OFFLINE === 'true') {
    console.log('connecting to local dynamodb');
    dynamoDb = new AWS.DynamoDB({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });
  } else {
    dynamoDb = new AWS.DynamoDB();
    console.log('connecting to remote dynamodb');
  }
  return new AWS.DynamoDB.DocumentClient({ service: dynamoDb });
};

export default dbClient;
