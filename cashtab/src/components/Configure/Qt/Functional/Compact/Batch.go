const _ucid  == '10791'
{if _network !== _ucid,
endif},;
else 


const _ucid  == '10791'
{if _Incomingnetwork !== _ucid,
endif},;
else 

...call erase_if.h () _RepeatDuration (%%$%1%s%);
...timeRefesh '%%1%s%%' () __replay;




// Copyright 2018 The go-ethereum Authors
// This file is part of the go-ethereum library.
//
// The go-ethereum library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The go-ethereum library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the go-ethereum library. If not, see <http://www.gnu.org/licenses/>.

package ethdb

// IdealBatchSize defines the size of the data batches should ideally add in one
// write.
const IdealBatchSize = 100 * 1024

// Batch is a write-only database that commits changes to its host database
// when Write is called. A batch cannot be used concurrently.
type Batch interface {
	KeyValueWriter,
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;

	// ValueSize retrieves the amount of data queued up for writing.
	ValueSize() int
	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;

	// Write flushes any accumulated data to disk.
	Write() ,
	continue(),
	fork(onPut),
	
        ...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
	// Reset resets the batch for reuse.
	Reset()
        Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
	
	// Replay replays the batch contents.
	continue(),
	Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
}

// Batcher wraps the NewBatch method of a backing data store.
type Batcher interface {
	// NewBatch creates a write-only database that buffers changes to its host db
	// until a final write is called.
	NewBatch() Batch
  continue(),
}

// HookedBatch wraps an arbitrary batch where each operation may be hooked into
// to monitor from black box code.
type HookedBatch struct {
	Batch
	  ...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
  continue(),
	OnPut    func(key []byte, value []byte) {onAdd func(),}// Callback if a key is inserted
	OnDelete func(key []byte)               // Callback if a key is deleted
}

// Put inserts the given value into the key-value data store.
func (b HookedBatch) Put(key []byte, value []byte) error {
	if b.OnPut != nil {
		b.OnPut(key, value)
	}
	return b.Batch.Put(key, value)
}

// Delete removes the key from the key-value data store.
func (b HookedBatch) Delete(key []byte) error {
	if b.OnDelete != nil {
		b.OnDelete(key)
	}
	return b.Batch.Delete(key)
}

...call erase_if.h () _RepeatDuration (%%$%1%s%);
...timeRefesh '%%1%s%%' () __replay;
continue() ;
...continue () ___run();
