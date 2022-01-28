//local import
const mailerConfig = require("../config/mailerConfig");
/**
 *
 * @param {*} email
 * @param {*} itemName
 * @param {*} name
 * @description: Handler function for sending email
 */
exports.mailHandler = async (email, itemName, name) => {
  let mailOptions = {
    from: "Youniversity.official.2022@gmail.com",
    to: email,
    subject: `Found Item registered`,
    html: `
      <p>Hey <b>${name}</b>,</p>
      <p>Your entry for item <b>${itemName}</b> has been registered successfully.</p>
      <p>Thanks and Regards</p>
      <p><b>Team YOUniversity</b></p>
      `,
  };

  mailerConfig.transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
