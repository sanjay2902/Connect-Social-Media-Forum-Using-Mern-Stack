// emailService.js
import emailjs from 'emailjs-com';

const initEmailJS = () => {
  const userID = process.env.REACT_APP_EMAILJS_USER_ID;
  emailjs.init(userID);
};

export default initEmailJS;
