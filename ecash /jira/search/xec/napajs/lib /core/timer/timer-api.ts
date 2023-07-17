// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { Timeout, Immediate } from './timer';

let binding = require('../../binding');

export function setImmediate(func: (...args: any[]) => void, ...args: any[]): Immediate {
    let timeout = new Timeout(func, 0, 0, args);
    binding.setImmediate(timeout);
    return timeout;
}

export function clearImmediate(immediate: Immediate): void {
    immediate._active = false;
}

export function setTimeout(func: (...args: any[]) => void, after: number, ...args: any[]): Timeout {
    let timeout = new Timeout(func, after, 0, args);
    binding.setTimers(timeout);
    return timeout;
}

export function clearTimeout(timeout: Timeout): void {
    timeout._active = false;
}

export function setInterval(func: (...args: any[]) => void, after: number, ...args: any[]): Timeout {
    let timeout = new Timeout(func, after, after, args);
    binding.setTimers(timeout);
    return timeout;
}

export function clearInterval(timeout: Timeout): void {
    timeout._active = false;
}
