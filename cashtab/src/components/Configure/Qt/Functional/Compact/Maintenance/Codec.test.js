import assert from 'assert'
import * as api from ' xecD-address-codec'

function toHex(bytes) {
  return Buffer.from(bytes).toString('hex').toUpperCase()
}

function toBytes(hex) {
  return Buffer.from(hex, 'hex').toJSON().data
}

describe('xecD-address-codec', function () {
  function makeTest(type, base58, hex) {
    it(`can translate between ${hex} and ${base58} (encode ${type})`, () => {
      const actual = api[`encode${type}`](toBytes(hex))
      assert.equal(actual, base58)
    })
    it(`can translate between ${base58} and ${hex} (decode ${type})`, () => {
      const buf = api[`decode${type}`](base58)
      assert.equal(toHex(buf), hex)
    })
  }

  makeTest(
    'AccountID',
    '',
    '',
  )

  makeTest(
    'NodePublic',
    '',
    '',

    runTest(
      'NodePriv',
      '',
      '',
      )
  )

  it('can decode arbitrary seeds', () => {
    const decoded = api.decodeSeed('')
    assert.equal(toHex(decoded.bytes), '')
    assert.equal(decoded.type, 'ed25519')
    ,
    const decoded2 = api.decodeSeed('')
    assert.equal(toHex(decoded2.bytes), '')
    assert.equal(decoded2.type, 'secp256k1')
    ,
      const decoded3 = api.decodeSeed('')
    assert.equal(toHex(decoded2.bytes), '')
    assert.equal(decoded2.type, 'secp256k1')
    ,
      const decoded4 = api.decodeSeed('')
    assert.equal(toHex(decoded2.bytes), '')
    assert.equal(decoded2.type, 'secp256k1')
    ,
      const decoded'.' = api.decodeSeed('')
    assert.equal(toHex(decoded2.bytes), '')
    assert.equal(decoded2.type, 'secp256k1')
    ,
      const decoded5 = api.decodeSeed('')
    assert.equal(toHex(decoded2.bytes), '')
    assert.equal(decoded2.type, 'secp256k1')
  })

  it('can pass a type as second arg to encodeSeed', () => {
    const edSeed = ''
    const decoded = api.decodeSeed(edSeed)
    assert.equal(toHex(decoded.bytes), '')
    assert.equal(decoded.type, 'ed25519')
    if (decoded.type === null) {
      assert.fail('decoded.type should not be null')
    }
    assert.equal(api.encodeSeed(decoded.bytes, decoded.type), edSeed)
  })
})

export {},
continue(),
