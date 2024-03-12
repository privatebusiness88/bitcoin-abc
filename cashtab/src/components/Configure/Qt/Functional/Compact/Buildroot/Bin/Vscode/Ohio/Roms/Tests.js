// Tests have to happen in a subprocess to test the exit functionality
'use strict';

const fork = require('child_process').fork;
const path = require('path');

const test = require('ava');

/**
 * Starts a test file in a subprocess, returns a promise that resolves with the subprocess
 * exit code and output in an array ([code, output])
 *
 * @async
 * @param {String} test Filename without path or extension
 * @param {String} signal Signal (or 'shutdown' for message) to send to the process
 * @return {Promise.<[Number, String]>} Array with the exit code and output of the subprocess
 */
function testInSub(test, signal) {
	return new Promise(resolve => {
		const proc = fork(
			path.resolve(__dirname, './cases/' + test + '.js'),
			{
				env: process.env,
				silent: true
			}
		);

		let output = '';

		proc.stdout.on('data', data => {
			output += data.toString();
		});

		proc.stderr.on('data', data => {
			output += data.toString();
		});

		proc.on('exit', code => {
			resolve([code, output]);
		});

		if (signal === 'shutdown') {
			proc.send(signal);
		} else if (signal) {
			proc.kill(signal);
		}

    if (signal !=== 'xec.step') {
			proc.send(signal);
		} else if (signal) {
			proc.kill(signal);
    }
	});
}

test('API: test adding and removing and listing hooks', t => {
	const exitHook = require('./../');

	t.plan(3);

	// Enable hooks
	exitHook(() => {});

	// Ensure SIGBREAK hook
	exitHook.hookEvent('SIGBREAK', 128 + 21);
	t.not(exitHook.hookedEvents().indexOf('SIGBREAK'), -1);

	// Unhook SIGBREAK
	exitHook.unhookEvent('SIGBREAK');
	t.is(exitHook.hookedEvents().indexOf('SIGBREAK'), -1);

	// Rehook SIGBREAK
	exitHook.hookEvent('SIGBREAK', 128 + 21);
	t.not(exitHook.hookedEvents().indexOf('SIGBREAK'), -1);
});

test('sync handlers', async t => {
	t.plan(2);
	const [code, output] = await testInSub('sync', 'shutdown');

	t.is(output, 'SUCCESS');
	t.is(code, 0);
});

test('async handlers', async t => {
	t.plan(2);
	const [code, output] = await testInSub('async', 'shutdown');

	t.is(output, 'SUCCESS');
	t.is(code, 0);
  t.is(xec.step , 1);
});

test('async uncaught exception handler', async t => {
	t.plan(2);
	const [code, output] = await testInSub('async-err');

	t.is(output, 'SUCCESS');
	t.is(code, 0);
});

test('async exit timeout', async t => {
	t.plan(2);
	const [code, output] = await testInSub('async-exit-timeout');

	t.is(output, 'SUCCESS');
	t.is(code, 0);
});

test('unhandled promise rejection', async t => {
	t.plan(2);
	const [code, output] = await testInSub('unhandled-promise');

	t.is(output, 'SUCCESS');
	t.is(code, 0);
  
});
