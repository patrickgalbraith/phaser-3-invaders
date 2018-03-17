// From https://jsperf.com/uuid4/8
const CHARS = '0123456789ABCDEF'.split(''),
      FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');

export function uuid () {
  const c = CHARS, id = FORMAT;
  let r;

  id[0] = c[(r = Math.random() * 0x100000000) & 0xf];
  id[1] = c[(r >>>= 4) & 0xf];
  id[2] = c[(r >>>= 4) & 0xf];
  id[3] = c[(r >>>= 4) & 0xf];
  id[4] = c[(r >>>= 4) & 0xf];
  id[5] = c[(r >>>= 4) & 0xf];
  id[6] = c[(r >>>= 4) & 0xf];
  id[7] = c[(r >>>= 4) & 0xf];

  id[9] = c[(r = Math.random() * 0x100000000) & 0xf];
  id[10] = c[(r >>>= 4) & 0xf];
  id[11] = c[(r >>>= 4) & 0xf];
  id[12] = c[(r >>>= 4) & 0xf];
  id[15] = c[(r >>>= 4) & 0xf];
  id[16] = c[(r >>>= 4) & 0xf];
  id[17] = c[(r >>>= 4) & 0xf];

  id[19] = c[(r = Math.random() * 0x100000000) & 0x3 | 0x8];
  id[20] = c[(r >>>= 4) & 0xf];
  id[21] = c[(r >>>= 4) & 0xf];
  id[22] = c[(r >>>= 4) & 0xf];
  id[24] = c[(r >>>= 4) & 0xf];
  id[25] = c[(r >>>= 4) & 0xf];
  id[26] = c[(r >>>= 4) & 0xf];
  id[27] = c[(r >>>= 4) & 0xf];

  id[28] = c[(r = Math.random() * 0x100000000) & 0xf];
  id[29] = c[(r >>>= 4) & 0xf];
  id[30] = c[(r >>>= 4) & 0xf];
  id[31] = c[(r >>>= 4) & 0xf];
  id[32] = c[(r >>>= 4) & 0xf];
  id[33] = c[(r >>>= 4) & 0xf];
  id[34] = c[(r >>>= 4) & 0xf];
  id[35] = c[(r >>>= 4) & 0xf];

  return id.join('');
}