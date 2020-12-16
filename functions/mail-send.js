const email_from = process.env.EMAIL_FROM;
const email_from_name = process.env.EMAIL_FROM_NAME;
const sendGridAPI = process.env.SENDGRID_API_KEY;
axios = require("axios");
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Max-Age': '2592000',
  'Access-Control-Allow-Credentials': 'true',
};

exports.handler = async function(event, context, callback) {
  var body = JSON.parse(event.body);
  var dynamic_template_data = body.dynamic_template_data
  var template_id = body.template_id
  const data = {
    from: {
      email: email_from,
      name: email_from_name
    },
    // doc: https://sendgrid.com/docs/for-developers/sending-email/personalizations/
    personalizations: [
      {
        subject: body.email_subject,
        to: body.email_to,
        ...(body.email_bcc && {
          bcc: body.email_bcc
        }),
        dynamic_template_data
      }
    ],
    template_id
  };
  
  try {
    const result = await axios({
      method: "post",
      url: "https://api.sendgrid.com/v3/mail/send",
      data,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sendGridAPI}`
      }
    });
    return { error: false, status: 200, data: {} };
  } catch (error) {
    return {
      error: true,
      status: error.response.status,
      data: error.response.data
    };
  }
}