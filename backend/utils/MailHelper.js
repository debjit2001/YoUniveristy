//local import
const mailerConfig = require("../config/mailerConfig");
/**
 * @param {*} email
 * @param {*} itemName
 * @param {*} name
 * @description: Handler function for sending email
 */
exports.mailHandler = async (email, itemName, name, subject) => {
  let mailOptions = {
    from: "Youniversity.official.2022@gmail.com",
    to: email,
    subject: subject,
    html: `
       <p>Hey <b>${name}</b>,</p>
       <p>Your entry for item <b>${itemName}</b> has been registered successfully.</p>
       <p>Thanks and Regards ,</p>
       <h2>Team YOUniversity</h2>
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
