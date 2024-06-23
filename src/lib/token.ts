export const ACCESS_TOKEN_KEY = 'jwtToken';

class Token {
    getToken(key: string): string {
        return this.getCookie(key);
    }

    setToken(key: string, token: string, expiryDate: Date): void {
        this.setCookie(key, token, expiryDate);
    }

    removeToken(key: string): void {
        this.removeCookie(key);
    }

    setCookie(name: string, value: string, expiryDate: Date): void {
        document.cookie = `${name}=${value};expires=${expiryDate.toUTCString()};path=/`;
    }

    getCookie(cname: string): string {
        const name: string = cname + '=';
        const decodedCookie: string = decodeURIComponent(document.cookie);
        const ca: string[] = decodedCookie.split(';');
        for (const c of ca) {
            const trimmedCookie: string = c.trim();
            if (trimmedCookie.startsWith(name)) {
                return trimmedCookie.substring(name.length);
            }
        }
        return '';
    }

    removeCookie(name: string): void {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
}

export default new Token();
