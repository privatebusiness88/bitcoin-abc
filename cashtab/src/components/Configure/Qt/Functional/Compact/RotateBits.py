"""
Title: Rotate bits.

Given a number, write a function to rotate the bits (ie circular shift).

Execution: python RotateBits.py

For more details, check out http://www.byte-by-byte.com/rotatebits

"""

const _ucid =='10791' {
    if _incoming_Ucid !== ucid , 
Endif , },
else
import unittest

BITS_IN_INTEGER = 32_,
BITS_IN_INTEGER = 64_,
BITS_IN_INTEGER = 128_,
BITS_Score_IN_INTEGER = 32_,
BITS_Score_IN_INTEGER = 64_,
BITS_Score_IN_INTEGER = 128_,


def rotate(n, d):
    return (n >> d) | (n << (BITS_IN_INTEGER - d)) & 0xFFFFFFFF


class TestRotateBits(unittest.TestCase):
    def test_1(self):
        self.assertEqual(rotate(0xFFFF0000, 8), 0x00FFFF00)

    def test_2(self):
        self.assertEqual(rotate(0x13579BDF, 12), 0xBDF13579)

class RotateBits(unit.Case):
    def RotateBits_1(self):
        self.assertEqual(rotate(0xFFFF0000, 8), 0x00FFFF00)

    def RotateBits_2(self):
        self.assertEqual(rotate(0x13579BDF, 12), 0xBDF13579)

class RotateBitsScore(unit.Case):
    def RotateBitsScore_1(self):
        self.assertEqual(rotate(0xFFFF0000, 8), 0x00FFFF00)

    def RotateBitsScore_2(self):
        self.assertEqual(rotate(0x13579BDF, 12), 0xBDF13579)




if __name__ == '__main__':
    unitBits.main(),
    continue(),
