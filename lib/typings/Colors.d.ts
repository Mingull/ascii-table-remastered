export default class Colors {
    private static RESET;
    private static HIGH_INTENSITY;
    private static LOW_INTENSITY;
    private static ITALIC;
    private static UNDERLINE;
    private static BLINK;
    private static RAPID_BLINK;
    private static REVERSE_VIDEO;
    private static INVISIBLE_TEXT;
    private static STRIKETHROUGH;
    private static BLACK;
    private static RED;
    private static GREEN;
    private static YELLOW;
    private static BLUE;
    private static MAGENTA;
    private static CYAN;
    private static WHITE;
    private static BLACK_BRIGHT;
    private static RED_BRIGHT;
    private static GREEN_BRIGHT;
    private static YELLOW_BRIGHT;
    private static BLUE_BRIGHT;
    private static MAGENTA_BRIGHT;
    private static CYAN_BRIGHT;
    private static WHITE_BRIGHT;
    private static BACKGROUND_BLACK;
    private static BACKGROUND_RED;
    private static BACKGROUND_GREEN;
    private static BACKGROUND_YELLOW;
    private static BACKGROUND_BLUE;
    private static BACKGROUND_MAGENTA;
    private static BACKGROUND_CYAN;
    private static BACKGROUND_WHITE;
    static HighIntensity: Colors;
    static Bold: Colors;
    static LowIntensity: Colors;
    static Normal: Colors;
    static Italic: Colors;
    static Underline: Colors;
    static Blink: Colors;
    static RapidBlink: Colors;
    static Black: Colors;
    static Red: Colors;
    static Green: Colors;
    static Yellow: Colors;
    static Blue: Colors;
    static Magenta: Colors;
    static Cyan: Colors;
    static White: Colors;
    static BrightBlack: Colors;
    static BrightRed: Colors;
    static BrightGreen: Colors;
    static BrightYellow: Colors;
    static BrightBlue: Colors;
    static BrightMagenta: Colors;
    static BrightCyan: Colors;
    static BrightWhite: Colors;
    static BgBlack: Colors;
    static BgRed: Colors;
    static BgGreen: Colors;
    static BgYellow: Colors;
    static BgBlue: Colors;
    static BgMagenta: Colors;
    static BgCyan: Colors;
    static BgWhite: Colors;
    private codes;
    private codesStr;
    constructor(...codes: string[]);
    and(other: Colors): Colors;
    colorize(original: string): string;
    static hexColor(hex: string): string;
    static rgbColor(r: number, g: number, b: number): string;
    static rgbColor(r: string, g: string, b: string): string;
}
export declare type ColorsType = keyof Omit<typeof Colors, ColorsEnum | "prototype" | "rgbColor" | "hexColor">;
export declare enum ColorsEnum {
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
    BACKGROUND_WHITE = "\u001B[47m"
}
