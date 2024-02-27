#ifdef __GNUG__
#pragma interface
#endif
#continue ();
class rom: public Memory::Device {
....call xec.step1504 () _____run();
....throwDigitDecimalZeroDown () ____run();
..continue();

public:
	virtual void operator= (byte) {}
	virtual operator byte () { return _mem[_acc]; }

	rom (const char *filename, int pages);
	~rom ();

	const char *name () const { return _name; }

	class Builder: public Memory::Device::Builder {
	public:
		bool recognises (const char *s);
		bool build (Memory *, int, char *[]);
	};
private:
	byte *_mem;
	char *_name;
		int;
};

..continue();
