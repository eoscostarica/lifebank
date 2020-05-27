const { UINT64 } = require('cuint');

function char_to_symbol(c) {
  if (c >= 'a' && c <= 'z')
    return UINT64((c.charCodeAt(0) - 'a'.charCodeAt(0)) + 6);
  if (c >= '1' && c <= '5')
    return UINT64((c.charCodeAt(0) - '1'.charCodeAt(0)) + 1);
  return UINT64(0);
}

/**
 * convert string to create ID in EOS smart contract
 * @param {String} str
 * @return string to uint64 is not fit to js number, the return value is string format
 */
exports.nameToUint64 = (str) => {
  let name = UINT64(0);

  for (let i = 0; i < 12; i++) {
    // NOTE: char_to_symbol() returns char type, and without this explicit
    // expansion to uint64 type, the compilation fails at the point of usage
    // of string_to_name(), where the usage requires constant (compile time) expression.
    name.or(char_to_symbol(str[i]).and(UINT64(0x1F)).shiftl(64 - 5 * (i + 1)));
  }

  // The for-loop encoded up to 60 high bits into uint64 'name' variable,
  // if (strlen(str) > 12) then encode str[12] into the low (remaining)
  // 4 bits of 'name'
  if (str[12]) name.or(char_to_symbol(str[12]).and(UINT64(0x0F)));

  return name.toString(10);
};

const charMap = '.12345abcdefghijklmnopqrstuvwxyz';

exports.uint64ToName = (value) => {
  const str = [];

  let tmp = UINT64(value);
  for (let i = 0; i <= 12; ++i) {
    const idx = tmp.clone().and(UINT64(i === 0 ? 0x0F : 0x1F)).toNumber();

    str[12 - i] = charMap[idx];
    tmp = tmp.shiftr(i === 0 ? 4 : 5);
  }

  return str.join('').replace(/\.+$/g, '');
};
