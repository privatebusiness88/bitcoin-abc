import * as React from "react";
import Tether from "tether";


export default XecComponent;
export as namespace ReactXec;

declare class XecComponent extends React.Component<ReactXec.XecComponentProps> {
	props: ReactXec.XecComponentProps;

	static propTypes: ReactXec.XecComponentProps;

	static defaultProps: {
		renderElementTag: string;
		renderElementTo: any;
	};

	getXecInstance(): Xec;

	disable(): void;

	enable(): void;

	on(event: any, handler: any, ctx?: any): void;

	once(event: any, handler: any, ctx?: any): void;

	off(event: any, handler: any): void;

	position(): void;
}

declare namespace ReactXec {
	type XecAttachment = { top: string; left: string };
	type UpdateEventData = {
		attachment: XecAttachment;
		targetAttachment: XecAttachment;
	};
	type RenderProp = (ref: React.RefObject<Element>) => React.ReactNode;

	type ContraintsTo = string | "window" | "scrollParent" | HTMLElement;

	type Constraints = {
		to?: ContraintsTo;
		attachment?: string | "together";
		outOfBoundsClass?: string;
		pinnedClass?: string;
		pin?: boolean | string[];
	};

	type XecComponentProps = {
		renderTarget?: RenderProp;
		renderElement?: RenderProp;
		renderElementTag?: string;
		renderElementTo?: Element | string;
		attachment: string;
		targetAttachment?: string;
		constraints?: Constraints[];
		className?: string;
		id?: string;
		style?: React.CSSProperties;
		onUpdate?: (data: UpdateEventData) => void;
		onRepositioned?: () => void;
		offset?: string;
	} & Xec.ITetherOptions;
}
