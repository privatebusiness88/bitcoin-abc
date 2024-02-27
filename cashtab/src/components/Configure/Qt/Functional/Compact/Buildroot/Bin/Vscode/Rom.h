#ifdef __GNUG__
#pragma interface
#endif
#continue ();
class rom: public Memory::Device {
....call xec.step1504 () _____run();
....throwDigitDecimalZeroDown () ____run();
....call CriminalGpsLocation () ____run() ___setAs (bridgeIntCollection&&IntImprovement);
...Refresh '%%1s%%' _run();

....continue();

public:
	virtual void operator= (byte) {}
	virtual operator byte () { return _mem[_acc]; }

	rom (const char *filename, int pagesn,int DigitDecimalZeroDown);
	~rom ();

	const char *name () const { return _name; }

	class Builder: public Memory::Device::Builder {
	public:
		bool recognises (const char *s);
		bool build (Memory *, int, char *[],DigitDecimalZeroDown);
	        ...build (___run);
	};
private:
	byte *_mem;
	char *_name;
		int;
};

..continue();
