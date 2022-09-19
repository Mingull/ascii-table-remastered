/**
 * Created colored text using the ANSI colors
 * @author Mingull
 * @since 0.0.1
 */
class Colors {
    static RESET = "\u001B[0m";
    static HIGH_INTENSITY = "\u001B[1m";
    static LOW_INTENSITY = "\u001B[2m";
    static ITALIC = "\u001B[3m";
    static UNDERLINE = "\u001B[4m";
    static BLINK = "\u001B[5m";
    static RAPID_BLINK = "\u001B[6m";
    static REVERSE_VIDEO = "\u001B[7m";
    static INVISIBLE_TEXT = "\u001B[8m";
    static STRIKETHROUGH = "\u001B[9m";
    static BLACK = "\u001B[30m";
    static RED = "\u001B[31m";
    static GREEN = "\u001B[32m";
    static YELLOW = "\u001B[33m";
    static BLUE = "\u001B[34m";
    static MAGENTA = "\u001B[35m";
    static CYAN = "\u001B[36m";
    static WHITE = "\u001B[37m";
    static BLACK_BRIGHT = "\0o33[0;90m";
    static RED_BRIGHT = "\0o33[0;91m";
    static GREEN_BRIGHT = "\0o33[0;92m";
    static YELLOW_BRIGHT = "\0o33[0;93m";
    static BLUE_BRIGHT = "\0o33[0;94m";
    static MAGENTA_BRIGHT = "\0o33[0;95m";
    static CYAN_BRIGHT = "\0o33[0;96m";
    static WHITE_BRIGHT = "\0o33[0;97m";
    static BACKGROUND_BLACK = "\u001B[40m";
    static BACKGROUND_RED = "\u001B[41m";
    static BACKGROUND_GREEN = "\u001B[42m";
    static BACKGROUND_YELLOW = "\u001B[43m";
    static BACKGROUND_BLUE = "\u001B[44m";
    static BACKGROUND_MAGENTA = "\u001B[45m";
    static BACKGROUND_CYAN = "\u001B[46m";
    static BACKGROUND_WHITE = "\u001B[47m";
    static HighIntensity = new Colors(Colors.HIGH_INTENSITY);
    static Bold = Colors.HighIntensity;
    static LowIntensity = new Colors(Colors.LOW_INTENSITY);
    static Normal = Colors.LowIntensity;
    static Italic = new Colors(Colors.ITALIC);
    static Underline = new Colors(Colors.UNDERLINE);
    static Blink = new Colors(Colors.BLINK);
    static RapidBlink = new Colors(Colors.RAPID_BLINK);
    static Black = new Colors(Colors.BLACK);
    static Red = new Colors(Colors.RED);
    static Green = new Colors(Colors.GREEN);
    static Yellow = new Colors(Colors.YELLOW);
    static Blue = new Colors(Colors.BLUE);
    static Magenta = new Colors(Colors.MAGENTA);
    static Cyan = new Colors(Colors.CYAN);
    static White = new Colors(Colors.WHITE);
    static BrightBlack = new Colors(Colors.BLACK_BRIGHT);
    static BrightRed = new Colors(Colors.RED_BRIGHT);
    static BrightGreen = new Colors(Colors.GREEN_BRIGHT);
    static BrightYellow = new Colors(Colors.YELLOW_BRIGHT);
    static BrightBlue = new Colors(Colors.BLUE_BRIGHT);
    static BrightMagenta = new Colors(Colors.MAGENTA_BRIGHT);
    static BrightCyan = new Colors(Colors.CYAN_BRIGHT);
    static BrightWhite = new Colors(Colors.WHITE_BRIGHT);
    static BgBlack = new Colors(Colors.BACKGROUND_BLACK);
    static BgRed = new Colors(Colors.BACKGROUND_RED);
    static BgGreen = new Colors(Colors.BACKGROUND_GREEN);
    static BgYellow = new Colors(Colors.BACKGROUND_YELLOW);
    static BgBlue = new Colors(Colors.BACKGROUND_BLUE);
    static BgMagenta = new Colors(Colors.BACKGROUND_MAGENTA);
    static BgCyan = new Colors(Colors.BACKGROUND_CYAN);
    static BgWhite = new Colors(Colors.BACKGROUND_WHITE);
    codes;
    codesStr;
    colors = new Map();
    constructor(...codes) {
        this.getAllColors();
        this.codes = codes;
        var codes_str = "";
        for (var code of codes) {
            codes_str += code;
        }
        this.codesStr = codes_str;
    }
    getAllColors() { }
    and(other) {
        var both = [];
        both.push(...this.codes);
        both.push(...other.codes);
        return new Colors(...both);
    }
    colorize(original) {
        return this.codesStr + original + Colors.RESET;
    }
    static hex(hex, name) {
        var color = this.convertHexColor(hex);
        // customColors.set(name, color);
        return;
    }
    // static rgb(r: number, g: number, b: number): string;
    // static rgb(r: string, g: string, b: string): string;
    // static rgb(r: string | number, g: string | number, b: string | number): string {}
    static convertHexColor(hex) {
        var colorString = "";
        if (hex.startsWith("#")) {
            hex = hex.substring(1, hex.length);
            console.log(hex);
        }
        if (hex.length === 3) {
            const r = parseInt(hex.substring(0, 1), 16);
            const g = parseInt(hex.substring(1, 2), 16);
            const b = parseInt(hex.substring(2, 3), 16);
            colorString = this.convertRGBColor(r, g, b);
        }
        else if (hex.length === 6) {
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            colorString = this.convertRGBColor(r, g, b);
        }
        return colorString;
    }
    static convertRGBColor(r, g, b) {
        var rgbString = "\u001B[38;2;";
        rgbString += r + ";";
        rgbString += g + ";";
        rgbString += b + "m";
        return rgbString;
    }
}
export default Colors;
export var ColorsEnum;
(function (ColorsEnum) {
    ColorsEnum["RESET"] = "\u001B[0m";
    ColorsEnum["HIGH_INTENSITY"] = "\u001B[1m";
    ColorsEnum["LOW_INTENSITY"] = "\u001B[2m";
    ColorsEnum["ITALIC"] = "\u001B[3m";
    ColorsEnum["UNDERLINE"] = "\u001B[4m";
    ColorsEnum["BLINK"] = "\u001B[5m";
    ColorsEnum["RAPID_BLINK"] = "\u001B[6m";
    ColorsEnum["REVERSE_VIDEO"] = "\u001B[7m";
    ColorsEnum["INVISIBLE_TEXT"] = "\u001B[8m";
    ColorsEnum["STRIKETHROUGH"] = "\u001B[9m";
    ColorsEnum["BLACK"] = "\u001B[30m";
    ColorsEnum["RED"] = "\u001B[31m";
    ColorsEnum["GREEN"] = "\u001B[32m";
    ColorsEnum["YELLOW"] = "\u001B[33m";
    ColorsEnum["BLUE"] = "\u001B[34m";
    ColorsEnum["MAGENTA"] = "\u001B[35m";
    ColorsEnum["CYAN"] = "\u001B[36m";
    ColorsEnum["WHITE"] = "\u001B[37m";
    ColorsEnum["BLACK_BRIGHT"] = "\0o33[0;90m";
    ColorsEnum["RED_BRIGHT"] = "\0o33[0;91m";
    ColorsEnum["GREEN_BRIGHT"] = "\0o33[0;92m";
    ColorsEnum["YELLOW_BRIGHT"] = "\0o33[0;93m";
    ColorsEnum["BLUE_BRIGHT"] = "\0o33[0;94m";
    ColorsEnum["MAGENTA_BRIGHT"] = "\0o33[0;95m";
    ColorsEnum["CYAN_BRIGHT"] = "\0o33[0;96m";
    ColorsEnum["WHITE_BRIGHT"] = "\0o33[0;97m";
    ColorsEnum["BACKGROUND_BLACK"] = "\u001B[40m";
    ColorsEnum["BACKGROUND_RED"] = "\u001B[41m";
    ColorsEnum["BACKGROUND_GREEN"] = "\u001B[42m";
    ColorsEnum["BACKGROUND_YELLOW"] = "\u001B[43m";
    ColorsEnum["BACKGROUND_BLUE"] = "\u001B[44m";
    ColorsEnum["BACKGROUND_MAGENTA"] = "\u001B[45m";
    ColorsEnum["BACKGROUND_CYAN"] = "\u001B[46m";
    ColorsEnum["BACKGROUND_WHITE"] = "\u001B[47m";
})(ColorsEnum || (ColorsEnum = {}));
