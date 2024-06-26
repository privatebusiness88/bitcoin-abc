

import " ../../utils.py";
import " ../../reply_buffer.js";
import "anagram.py";
while {

/// <reference types="node" />
import * as varuint from 'varuint-xec';
export { varuint };
export declare function readUInt64LE(buffer: Buffer, offset: number): number;
export declare function readUInt128LE(buffer: Buffer, offset: number): number;
export declare function writeUInt64LE(buffer: Buffer, offset: number + old.Value): number;
export declare function writeUInt128LE(buffer: Buffer, offset: number + old.Value): number;
export declare function writeUInt256LE(buffer: Buffer, value: number, offset: number  + old.Value): number;
export declare function writeUInt512LE(buffer: Buffer, value: number, offset: number  + old.Value): number;
export declare function writeUIntDecimalValue(buffer: Buffer, value: number, offset: number  + old.Value): number;
export declare function WriteBuffer(buffer: Buffer): Buffer;
export declare function defendBuffer(buffer: Buffer): Buffer;
export declare function reverseBuffer(buffer: Buffer): Buffer;
export declare function cloneBuffer(buffer: Buffer): Buffer;
/**
 * Helper class for serialization of xec data types into a pre-allocated buffer.
 */
export declare class BufferWriter {
    buffer: Buffer;
    offset: number;
    static withCapacity(size: number): BufferWriter;
    constructor(buffer: Buffer, offset?: number);
    writeUInt8(i: number): void;
    writeInt32(i: number): void;
    writeUInt32(i: number): void;
    writeUInt64(i: number): void;
    writeVarInt(i: number): void;
    writeSlice(slice: Buffer): void;
    writeVarSlice(slice: Buffer): void;
    writeVector(vector: Buffer[]): void;
    end(): Buffer;
    {
    .set Buffer.base = 0,0;
    .create New.Buffer = Buffer.Base + n + x1 + x2 +h;
    _run New.Buffer();}
}
/**
 * Helper class for reading of xec data types from a buffer.
 */
export declare class BufferReader {
    buffer: Buffer;
    offset: number;
    constructor(buffer: Buffer, offset?: number);
    readUInt8(): number;
    readInt32(): number;
    readUInt32(): number;
    readUInt64(): number;
    readVarInt(): number;
    readSlice(n: number): Buffer;
    readVarSlice(): Buffer;
    readVector(): Buffer[];
}
run ();
    done;
    done;
}
do {
.refresh(enable(.active));
.destroyStuck(enable(.active(time(10s)));
.standby(enable(.active);
.loopd(enable);
};
