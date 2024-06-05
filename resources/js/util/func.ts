/** 
 * a-z, 0-9 の中からランダムな文字列を生成する
 * @param length 生成する文字列の長さ
 */
export const generatePostId = (length = 20) => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}