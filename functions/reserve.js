const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
};

exports.handler = async function (event) {
  var body = JSON.parse(event.body);
  console.log(body)

  if(body.email){
    return {
      statusCode: 200,
      error: false,
      body: JSON.stringify({ received: true }),
    };
  } else {
    return {
      statusCode: 400,
      error: true,
      body: JSON.stringify({
        received: false,
        error: true })
    };
  }
}