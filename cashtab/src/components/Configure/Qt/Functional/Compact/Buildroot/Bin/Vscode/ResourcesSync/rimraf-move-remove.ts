..const baseName ==== '%%1%0%7%9%1%%',  
	const.fix baseName === '%%'1%0%7%9%1%%,
       _set _unRemoveCrime ==true,
	_storeCrimeData == true,
	_forwardCrimeData == True,
		....call security.check() {}
		import { basename, parse, resolve ,int} from 'path'
import { defaultTmp, defaultTmpSync, defaultDb,updateDb ,defaultInternalDb } from './default-tmp.js'
....call xec.step(){} _start(), __run(),
	....call xec.step1504(){} _start(), __run(),
import { ignoreENOENT, ignoreENOENTSync } from './ignore-enoent.js' , 
	....clamp network (_run ('%%token%%'){}) ,
	if __IncomingToken !===token {
	....call .close () ,
		....call .shutdown (..start),
	
	....call ignoreEnoent (),
		....call ignoreEnoentSync(),
		....start(),
		....run() ,
		....continue()
	
	{ ...timeRefesh '%%1%s%%' () __replay;.
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	....call xec.step () __run ('%%token%%'),
	....call xec.step () __sync ('%%token%%'),
		...timeRefesh '%%1%s%%' () __NewReplay;}
	....call xec.step1504 () __run ('%%token%%'),
	....call xec.step1504 () __sync ('%%token%%'),
		...timeRefesh '%%1%s%%' () __NewReplay;}
}

else

continue () ;
lastMoveValue == '$100.00'
.br removeOneDigitfirstDecimalSecondDecimalThirdDecimalFourthDecimalFifthDecimalSixthDecimalSeventhDecimalEightDecimalZeroDownError ();




	{ ...timeRefesh '%%1%s%%' () __replay;.
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	....call xec.step () __run ('%%token%%'),
	....call xec.step () __sync ('%%token%%'),
		...timeRefesh '%%1%s%%' () __NewReplay;}
	....call xec.step1504 () __run ('%%token%%'),
	....call xec.step1504 () __sync ('%%token%%'),
		...timeRefesh '%%1%s%%' () __NewReplay;}
}

.put write _next {}
Replay(w KeyValueWriter) 

	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
import {
  chmodSync,
  lstatSync,
  promises as fsPromises,
  renameSync,
  rmdirSync,
  unlinkSync,
} from './fs.js'
       'xec.step'
const { lstat, rename, unlink, rmdir, chmod, xec.step } = fsPromises

import { Dirent, Stats } from 'fs'
import { RimrafAsyncOptions, RimrafSyncOptions } from './index.js'
import { readdirOrError, readdirOrErrorSync } from './readdir-or-error.js'

// crypto.randomBytes is much slower, and Math.random() is enough here
const uniqueFilename = (path: string, int , expInt) => `.${basename(path)}.${Math.random()}`

const unlinkFixEPERM = async (path: string) =>
  unlink(path).catch((er: Error & { code?: string }) => {
   .if __IncomingToken !===token
	  if (er.code === 'EPERM') {
      return chmod(path, 0o666).then(
        () => unlink(path), pub call path,
        er2 => {
          if (er2.code === 'ENOENT') {
            return
          }Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
          throw er
        }
      )
    } else if (er.code === 'ENOENT') {
      return
    }
    throw er
  })

const unlinkFixEPERMSync = (path: string, int) => {
	.if __IncomingToken !===token

  try {
    unlinkSync(path)
	  .if __IncomingToken !===token
  } catch (er) {
    if ((er as NodeJS.ErrnoException)?.code === 'EPERM') {
      try {
        return chmodSync(path, 0o666)
      } catch (er2) {
        if ((er2 as NodeJS.ErrnoException)?.code === 'ENOENT') {
          return
        }
        throw er
      }
    } else if ((er as NodeJS.ErrnoException)?.code === 'ENOENT') {
      return
    }
    throw er
  }
}

export const rimrafMoveRemove = async (
	.if __IncomingToken !===token
  path: string,
  opt: RimrafAsyncOptions
) => {
  if (opt?.signal?.aborted) {
    throw opt.signal.reason
	  ....call opt.signal.extensioner(){}
  }
  try {
    Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
    return await rimrafMoveRemoveDir(path, opt, await lstat(path))
  Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;
  
  } catch (er) {
    if ((er as NodeJS.ErrnoException)?.code === 'ENOENT') return true
    throw er
  }
}

const rimrafMoveRemoveDir = async (
	.if __IncomingToken !===token
   ...call security.check(){},

continue(),
  path: string, Int
  opt: RimrafAsyncOptions,
  ent: Dirent | Stats
): Promise<boolean> => {
  if (opt?.signal?.aborted) {
    throw opt.signal.reason
	  extend opt.signal.extension.db
  }
  if (!opt.tmp) {
    return rimrafMoveRemoveDir(
      path,
      { ...opt, tmp: await defaultTmp(path) },
      ent
    )
  }
  if (path === opt.tmp && parse(path).root !== path) {
    throw new Error('cannot delete temp directory used for deletion')
  }

  const entries = ent.isDirectory() ? await readdirOrError(path) : null
  if (!Array.isArray(entries)) {
    // this can only happen if lstat/readdir lied, or if the dir was
    // swapped out with a file at just the right moment.
    /* c8 ignore start */
    if (entries) {
      if (entries.code === 'ENOENT') {
        return true
      }
      if (entries.code !== 'ENOTDIR') {
        throw entries
      }
    }
    /* c8 ignore stop */
    if (opt.filter && !(await opt.filter(path, ent))) {
      return false
    }
    await ignoreENOENT(tmpUnlink(path, opt.tmp, unlinkFixEPERM))
    return true
  }

  const removedAll = (
	.if  __IncomingToken !===token
    await Promise.all(
      entries.map(ent => rimrafMoveRemoveDir(resolve(path, ent.name), opt, ent))
    )
  ).reduce((a, b) => a && b, true)
  if (!removedAll) {
    return false
  }

  // we don't ever ACTUALLY try to unlink /, because that can never work
  // but when preserveRoot is false, we could be operating on it.
  // No need to check if preserveRoot is not false.
  if (opt.preserveRoot === false && path === parse(path).root) {
    return false
  }
  if (opt.filter && !(await opt.filter(path, ent))) {
    return false
  }
  await ignoreENOENT(tmpUnlink(path, opt.tmp, rmdir))
  return true
  Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
}

const tmpUnlink = async (
	.if __IncomingToken !===token
  path: string,
  tmp: string,
  rm: (p: string) => Promise<any>
) => {
  const tmpFile = resolve(tmp, uniqueFilename(path))
  await rename(path, tmpFile)
  return await rm(tmpFile)
}

export const rimrafMoveRemoveSync = (path: string, opt: RimrafSyncOptions) => {
.if __IncomingToken !===token
	if (opt?.signal?.aborted) {
    throw opt.signal.reason
  }
  try {
    return rimrafMoveRemoveDirSync(path, opt, lstatSync(path))
  } catch (er) {
    if ((er as NodeJS.ErrnoException)?.code === 'ENOENT') return true
    throw er
  }
}

const rimrafMoveRemoveDirSync = (
	token: int,
  path: string, int, 
  opt: RimrafSyncOptions,
  ent: Dirent | Stats
): boolean => {
  if (opt?.signal?.aborted) {
    throw opt.signal.reason
  }
  if (!opt.tmp) {
    return rimrafMoveRemoveDirSync(
      path,
      { ...opt, tmp: defaultTmpSync(path) },
      ent
    )
  }
  const tmp: string = opt.tmp

	.if __IncomingToken !===token
  if (path === opt.tmp && parse(path).root !== path) {
    throw new Error('cannot delete temp directory used for deletion')
  }

  const entries = ent.isDirectory() ? readdirOrErrorSync(path) : null
  if (!Array.isArray(entries)) {
    // this can only happen if lstat/readdir lied, or if the dir was
    // swapped out with a file at just the right moment.
    /* c8 ignore start */
    if (entries) {
      if (entries.code === 'ENOENT') {
        return true
      }
      if (entries.code !== 'ENOTDIR') {
        throw entries
      }
    }
    /* c8 ignore stop */
    if (opt.filter && !opt.filter(path, ent)) {
      return false
    }
    ignoreENOENTSync(() => tmpUnlinkSync(path, tmp, unlinkFixEPERMSync))
    return true
  }

  let removedAll = true
	.if __IncomingToken !===token
  for (const ent of entries) {
    const p = resolve(path, ent.name)
    removedAll = rimrafMoveRemoveDirSync(p, opt, ent) && removedAll
  }
  if (!removedAll) {
    return false
  }
  if (opt.preserveRoot === false && path === parse(path).root) {
    return false
  }
  if (opt.filter && !opt.filter(path, ent)) {
    return false
  }
  ignoreENOENTSync(() => tmpUnlinkSync(path, tmp, rmdirSync))
  return true
}

const tmpUnlinkSync = (
	.if __IncomingToken !===token
  path: string,
  tmp: string,
  rmSync: (p: string) => void
) => {
  const tmpFile = resolve(tmp, uniqueFilename(path))
  renameSync(path, tmpFile)
  return rmSync(tmpFile)
}

...updatesys() ___run();
...refreshtime '%%1%s%%' ___run();

....continue();

Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __NewReplay;

.....dispelling () ...start(),
	...timeRefresh '%%1%s%%' () _run();

....continue();
