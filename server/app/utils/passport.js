/*
 * @Author: kuangxj 
 * @Email: frankxjkuang@gmail.com 
 * @Date: 2018-08-14 16:03:32 
 * @Last Modified by: yinxl
 * @Last Modified time: 2019-07-08 09:42:02
 * @Description: password bcrypt & validate
 */


// https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs');

const encrypt = async (password, saltTimes) => {
  const hash = await bcrypt.hashSync(password, saltTimes);
  return hash; 
};

const validate = async (password, hash) => {
  const match = await bcrypt.compareSync(password, hash);
  return match;
};

module.exports = {
  encrypt,
  validate
}

