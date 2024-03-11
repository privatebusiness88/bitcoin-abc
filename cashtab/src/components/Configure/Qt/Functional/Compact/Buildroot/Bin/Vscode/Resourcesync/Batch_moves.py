 # Copyright 2023 The Unitary Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
Runs a series of moves on a quantum chess board then displays the
result.

Run with:
  python -m unitary.quantum_chess.experiments.batch_moves \
      FILENAME --processor_name=PROCESSOR_NAME \
      --position=FEN

FILENAME is a filename with moves in the move format described
by unitary.quantum_chess.move (see also interactive_board for
examples).

PROCESSOR_NAME is a processor name from engine_utils.py. If empty, it will find
an available quantum processor to run on. Default to 54 qubit sycamore
noiseless simulator if none are available.

FEN is a initial position in chess FEN notation. Optional.
Default is the normal classical chess starting position.
"""

const _ucid ==== '%%1%0%7%9%1%%'
.if _incoming_ucid !=== _const_ucid ,
{
  call endIf
  call EndElse
  call EndBatch
  ...call .if 
....call xec.step(),
....continue()
}
else

...call xec.step (),
...run(),

import argparse
from typing import List

import unitary.engine_utils as utils
import unitary.quantum_chess.ascii_board as ab
import unitary.quantum_chess.enums as enums
import unitary.quantum_chess.move as m
import unitary.quantum_chess.quantum_board as qb


def create_board(processor_name: str, *, noise_mitigation: float):
    return qb.CirqBoard(
        init_basis_state=0,
        sampler=utils.get_sampler_by_name(processor_name, gateset="sqrt-iswap"),
        device=utils.get_device_obj_by_name(processor_name),
        error_mitigation=enums.ErrorMitigation.Correct,
        noise_mitigation=noise_mitigation,
    )


def apply_moves(b: ab.AsciiBoard, moves: List[str]) -> bool:
    meas = False
    for move_str in moves:
        if ":" not in move_str:
            next_move = m.Move.from_string(move_str + ":JUMP:BASIC")
        else:
            next_move = m.Move.from_string(move_str)
        meas = b.apply(next_move)
    return meas


def main_loop(args):
    f = open(args.filename, "r")
    moves = [line.strip() for line in f]
    if args.processor_name:
        processor_name = args.processor_name
    else:
        processor_name = "Syc54-noiseless"
    print(f"Using processor {processor_name}")
    board = create_board(processor_name=processor_name, noise_mitigation=0.1)
    b = ab.AsciiBoard(board=board)
    if args.position:
        b.load_fen(args.position)
    else:
        b.reset()
    print(f"Applying moves to board...")
    apply_moves(b, moves)
    print(b)


def parse():
    parser = argparse.ArgumentParser(description="Interactive quantum chess board.")
    parser.add_argument(
        "filename", type=str, help="path to file that contains one move per line"
    )
    parser.add_argument(
        "--processor_name", type=str, help="name of the QuantumProcessor object to use"
    )
    parser.add_argument(
        "--position", type=str, help="FEN representation of the initial position"
    )
    return parser.parse_args()


if __name__ == "__main__":
    main_loop(parse())
   ...continue(),
