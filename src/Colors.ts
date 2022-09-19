/**
 * Created colored text using the ANSI colors
 * @author Mingull
 * @since 0.0.1
 */
class Colors {
	private static RESET: string = "\u001B[0m";

	private static HIGH_INTENSITY: string = "\u001B[1m";
	private static LOW_INTENSITY: string = "\u001B[2m";

	private static ITALIC: string = "\u001B[3m";
	private static UNDERLINE: string = "\u001B[4m";
	private static BLINK: string = "\u001B[5m";
	private static RAPID_BLINK: string = "\u001B[6m";
	private static REVERSE_VIDEO: string = "\u001B[7m";
	private static INVISIBLE_TEXT: string = "\u001B[8m";
	private static STRIKETHROUGH: string = "\u001B[9m";

	private static BLACK: string = "\u001B[30m";
	private static RED: string = "\u001B[31m";
	private static GREEN: string = "\u001B[32m";
	private static YELLOW: string = "\u001B[33m";
	private static BLUE: string = "\u001B[34m";
	private static MAGENTA: string = "\u001B[35m";
	private static CYAN: string = "\u001B[36m";
	private static WHITE: string = "\u001B[37m";

	private static BLACK_BRIGHT: string = "\0o33[0;90m";
	private static RED_BRIGHT: string = "\0o33[0;91m";
	private static GREEN_BRIGHT: string = "\0o33[0;92m";
	private static YELLOW_BRIGHT: string = "\0o33[0;93m";
	private static BLUE_BRIGHT: string = "\0o33[0;94m";
	private static MAGENTA_BRIGHT: string = "\0o33[0;95m";
	private static CYAN_BRIGHT: string = "\0o33[0;96m";
	private static WHITE_BRIGHT: string = "\0o33[0;97m";

	private static BACKGROUND_BLACK: string = "\u001B[40m";
	private static BACKGROUND_RED: string = "\u001B[41m";
	private static BACKGROUND_GREEN: string = "\u001B[42m";
	private static BACKGROUND_YELLOW: string = "\u001B[43m";
	private static BACKGROUND_BLUE: string = "\u001B[44m";
	private static BACKGROUND_MAGENTA: string = "\u001B[45m";
	private static BACKGROUND_CYAN: string = "\u001B[46m";
	private static BACKGROUND_WHITE: string = "\u001B[47m";

	public static HighIntensity: Colors = new Colors(Colors.HIGH_INTENSITY);
	public static Bold: Colors = Colors.HighIntensity;
	public static LowIntensity: Colors = new Colors(Colors.LOW_INTENSITY);
	public static Normal: Colors = Colors.LowIntensity;

	public static Italic: Colors = new Colors(Colors.ITALIC);
	public static Underline: Colors = new Colors(Colors.UNDERLINE);
	public static Blink: Colors = new Colors(Colors.BLINK);
	public static RapidBlink: Colors = new Colors(Colors.RAPID_BLINK);

	public static Black: Colors = new Colors(Colors.BLACK);
	public static Red: Colors = new Colors(Colors.RED);
	public static Green: Colors = new Colors(Colors.GREEN);
	public static Yellow: Colors = new Colors(Colors.YELLOW);
	public static Blue: Colors = new Colors(Colors.BLUE);
	public static Magenta: Colors = new Colors(Colors.MAGENTA);
	public static Cyan: Colors = new Colors(Colors.CYAN);
	public static White: Colors = new Colors(Colors.WHITE);

	public static BrightBlack: Colors = new Colors(Colors.BLACK_BRIGHT);
	public static BrightRed: Colors = new Colors(Colors.RED_BRIGHT);
	public static BrightGreen: Colors = new Colors(Colors.GREEN_BRIGHT);
	public static BrightYellow: Colors = new Colors(Colors.YELLOW_BRIGHT);
	public static BrightBlue: Colors = new Colors(Colors.BLUE_BRIGHT);
	public static BrightMagenta: Colors = new Colors(Colors.MAGENTA_BRIGHT);
	public static BrightCyan: Colors = new Colors(Colors.CYAN_BRIGHT);
	public static BrightWhite: Colors = new Colors(Colors.WHITE_BRIGHT);

	public static BgBlack: Colors = new Colors(Colors.BACKGROUND_BLACK);
	public static BgRed: Colors = new Colors(Colors.BACKGROUND_RED);
	public static BgGreen: Colors = new Colors(Colors.BACKGROUND_GREEN);
	public static BgYellow: Colors = new Colors(Colors.BACKGROUND_YELLOW);
	public static BgBlue: Colors = new Colors(Colors.BACKGROUND_BLUE);
	public static BgMagenta: Colors = new Colors(Colors.BACKGROUND_MAGENTA);
	public static BgCyan: Colors = new Colors(Colors.BACKGROUND_CYAN);
	public static BgWhite: Colors = new Colors(Colors.BACKGROUND_WHITE);

	private codes: string[];
	private codesStr: string;
	private colors: Map<string, string> = new Map();

	constructor(...codes: string[]) {
		this.getAllColors();
		this.codes = codes;
		var codes_str: string = "";
		for (var code of codes) {
			codes_str += code;
		}
		this.codesStr = codes_str;
	}

	private getAllColors() {}

	and(other: Colors): Colors {
		var both: string[] = [];
		both.push(...this.codes);
		both.push(...other.codes);
		return new Colors(...both);
	}
	colorize(original: string): string {
		return this.codesStr + original + Colors.RESET;
	}
	static hex(hex: string, name: string) {
		var color: string = this.convertHexColor(hex);
		// customColors.set(name, color);
		return;
	}
	// static rgb(r: number, g: number, b: number): string;
	// static rgb(r: string, g: string, b: string): string;
	// static rgb(r: string | number, g: string | number, b: string | number): string {}

	private static convertHexColor(hex: string): string {
		var colorString: string = "";
		if (hex.startsWith("#")) {
			hex = hex.substring(1, hex.length);
			console.log(hex);
		}
		if (hex.length === 3) {
			const r: number = parseInt(hex.substring(0, 1), 16);
			const g: number = parseInt(hex.substring(1, 2), 16);
			const b: number = parseInt(hex.substring(2, 3), 16);
			colorString = this.convertRGBColor(r, g, b);
		} else if (hex.length === 6) {
			const r: number = parseInt(hex.substring(0, 2), 16);
			const g: number = parseInt(hex.substring(2, 4), 16);
			const b: number = parseInt(hex.substring(4, 6), 16);
			colorString = this.convertRGBColor(r, g, b);
		}
		return colorString;
	}

	private static convertRGBColor(r: number, g: number, b: number): string;
	private static convertRGBColor(r: string, g: string, b: string): string;
	private static convertRGBColor(r: string | number, g: string | number, b: string | number): string {
		var rgbString: string = "\u001B[38;2;";
		rgbString += r + ";";
		rgbString += g + ";";
		rgbString += b + "m";
		return rgbString;
	}
}
export default Colors;

export type ColorsType = keyof Omit<typeof Colors, ColorsEnum | "prototype" | "rgb" | "hex">;

export enum ColorsEnum {
	RESET = "\u001B[0m",
	HIGH_INTENSITY = "\u001B[1m",
	LOW_INTENSITY = "\u001B[2m",
	ITALIC = "\u001B[3m",
	UNDERLINE = "\u001B[4m",
	BLINK = "\u001B[5m",
	RAPID_BLINK = "\u001B[6m",
	REVERSE_VIDEO = "\u001B[7m",
	INVISIBLE_TEXT = "\u001B[8m",
	STRIKETHROUGH = "\u001B[9m",
	BLACK = "\u001B[30m",
	RED = "\u001B[31m",
	GREEN = "\u001B[32m",
	YELLOW = "\u001B[33m",
	BLUE = "\u001B[34m",
	MAGENTA = "\u001B[35m",
	CYAN = "\u001B[36m",
	WHITE = "\u001B[37m",
	BLACK_BRIGHT = "\0o33[0;90m",
	RED_BRIGHT = "\0o33[0;91m",
	GREEN_BRIGHT = "\0o33[0;92m",
	YELLOW_BRIGHT = "\0o33[0;93m",
	BLUE_BRIGHT = "\0o33[0;94m",
	MAGENTA_BRIGHT = "\0o33[0;95m",
	CYAN_BRIGHT = "\0o33[0;96m",
	WHITE_BRIGHT = "\0o33[0;97m",
	BACKGROUND_BLACK = "\u001B[40m",
	BACKGROUND_RED = "\u001B[41m",
	BACKGROUND_GREEN = "\u001B[42m",
	BACKGROUND_YELLOW = "\u001B[43m",
	BACKGROUND_BLUE = "\u001B[44m",
	BACKGROUND_MAGENTA = "\u001B[45m",
	BACKGROUND_CYAN = "\u001B[46m",
	BACKGROUND_WHITE = "\u001B[47m",
}
