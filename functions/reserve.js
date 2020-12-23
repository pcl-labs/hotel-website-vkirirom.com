const email_from = process.env.EMAIL_FROM;
const email_from_name = process.env.EMAIL_FROM_NAME;
const sendGridAPI = process.env.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGridAPI);
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
//hicki.okamoto@kit.edu.kh
const vat = body.payment.amount * .1;
  console.log(body)
  try {
    const msg = {
      to: 'chris@whynot.earth,mrjoeelia@gmail.com',
      from: `${email_from_name} <${email_from}>`,
      replyTo: `${email_from_name} <${email_from}>`,
      bcc: '',
      subject: `Reservation Requested (Cash) - Contact ${body.name} to confirm their arrival on ${body.start}`,
      text: `PREVIEW TEXT HERE`,
      html: `
      <html lang="en">
  <body style="font-family: sans-serif; color: #191C21;">
    <img style="max-width: 100%;" src="" />
    <h2>TODO RESORTNAME BASED OFF ID</h2>
    <p>{{numberOfGuests}} Guests</p>
    <p>${body.start} <span>&#11208;</span> ${body.end}</p>

    <hr />
    <p>TODO NIGHTS COUNT nights total</p>
    {{#each prices}}
    TODO NIGHTs DETAIL ARRAY
    <div><small>{{this.date}} - ${body.payment.amount}</small></div>
    {{/each}}
    <p>VAT 10% - ${vat}</p>
    <hr />

    <h3>Total - ${body.payment.amount}</h3>
    <h3>Customer Details</h3>
    <div>
      <p>Customer name: ${body.name}</p>
      <p>Country: {{phoneCountry}}???????</p>
      <p>Phone Number: ${body.phone}</p>
      <p>Email: ${body.email}</p>
    </div>
    
    {{#if message}}
    <h3>Special Requirements</h3>
    <p>{{message}}</p>
    TODO IF MESSAGE EXISTS
    {{/if}}
    
    <hr />

    
    <h1>Thank You!</h1>
    <p>
      Thank you for selecting vKirirom Resort as your preferred resort. Please be prepaired to pay ${body.payment.amount}} upon arrival.
    </p>
    <h2>vKirirom Pine Resort</h2>
    <p>Preah Soramarith-Kosamak National Park (Kirirom), Phnom Srouch District, Kompong Speu Province, Cambodia</p>
    <p><a href="https://goo.gl/maps/PqV15Qcq9dSSJcso9">Get Directions</a></p>
    <p><a href="tel:+(855) 78 777 284">+(855) 78 777 284</a></p>
    <p><a href="mailto:info@vkirirom.com">info@vkirirom.com</a></p>
    <h3>Need Transportation?</h3>
    <p>
      vKirirom Pine Resort offers a easy shuttle service for visitors between Kirirom and Phnom Penh. Click to reserve
      your shuttle now.
    </p>
    <a href="http://shuttlebus.vkirirom.com/login">Book Shuttle Transportation</a>
    
    <h3>Room Description</h3>
    {{{roomDescriptionHTML}}}
    NEED THIS TOO
  </body>
</html>`
    };
    await sgMail.send(msg);
    return {
      statusCode: 200,
      error: false,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Mail cannot send with ${err}`);

    return {
      statusCode: 400,
      body: `Mail Error: ${err.message}`,
    };
  }
}