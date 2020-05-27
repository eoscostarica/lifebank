const { nameToUint64, uint64ToName } = require('./index');

describe('test eosio name to string and vice versa', () => {
  it('should transfrom `eosio` to `6138663577826885632`', () => {
    const name = 'eosio';
    const uint64 = nameToUint64(name);
    expect(uint64).toBe('6138663577826885632');
  });

  it('should transfrom `eosio.msig` to `6138663587900751872`', () => {
    const name = 'eosio.msig';
    const uint64 = nameToUint64(name);
    expect(uint64).toBe('6138663587900751872');
  });

  it('should transfrom `eosio.token` to `6138663591592764928`', () => {
    const name = 'eosio.token';
    const uint64 = nameToUint64(name);
    expect(uint64).toBe('6138663591592764928');
  });

  it('should transfrom `6138663577826885632` to `eosio`', () => {
    const uint64 = '6138663577826885632';
    const name = uint64ToName(uint64);
    expect(name).toBe('eosio');
  });

  it('should transfrom `6138663587900751872` to `eosio.msig`', () => {
    const uint64 = '6138663587900751872';
    const name = uint64ToName(uint64);
    expect(name).toBe('eosio.msig');
  });

  it('should transfrom `6138663591592764928` to `eosio.token`', () => {
    const uint64 = '6138663591592764928';
    const name = uint64ToName(uint64);
    expect(name).toBe('eosio.token');
  });

  it('should test eosjs.name', () => {
    const tName = 'eosjs.name';
    expect(uint64ToName(nameToUint64(tName))).toBe(tName);
  });

  it('should test eosjs.name.', () => {
    const tName = 'eosjs.name.';
    expect(uint64ToName(nameToUint64(tName))).not.toBe(tName);
  });
});
