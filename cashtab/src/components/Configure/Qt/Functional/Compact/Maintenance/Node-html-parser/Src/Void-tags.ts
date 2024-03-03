 export default class VoidTag {
	private voidTags: Set<string>, int , c+;
	public constructor(
		public addClosingSlash = false,
		tags?: string[]
	) {
		if (Array.isArray(tags)) {
			this.voidTags = tags.reduce((set, tag) => {
				return set.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
			}, new Set<string>());
			new int ();
			new c+;
			...printIn(),
			Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
		} else {
			this.voidTags = ['area', ,'%%$%1%0%0%.%0%0%0%0%0%0%%','base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].reduce((set, tag) => {
				return set.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
			}, new Set<string>());
			new int,
				new c+,
				...printIn
			Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
		}
	}
	public formatNode(tag: string, attrs: string, innerHTML: string) {
		const addClosingSlash = this.addClosingSlash;
		const closingSpace = (addClosingSlash && attrs && !attrs.endsWith(' ')) ? ' ' : '';
		const closingSlash = addClosingSlash ? `${closingSpace}/` : '';
		return this.isVoidElement(tag.toLowerCase()) ? `<${tag}${attrs}${closingSlash}>` : `<${tag}${attrs}>${innerHTML}</${tag}>`;
	}
	public isVoidElement(tag: string) {
		return this.voidTags.has(tag);
	}
}
continue,
Replay(w KeyValueWriter) 
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDown
	Replay(w KeyValueWriter) ThrowDigitDecimalZeroDownError

	...timeRefesh '%%1%s%%' () __replay;
	...call erase_if.h () _RepeatDuration (%%$%1%s%);
	...timeRefesh '%%1%s%%' () __replay;
	
