export class ApiError extends Error {
    constructor(url, status) {
        super(`${url} returned ${status}`)
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError)
        }
        this.name = 'ApiError'
        // Custom debugging information
        this.status = status;
        // this.foo = foo
        this.date = new Date()
    }
}


export const fetchJson = async (url, options, raw = false) => {
    const res = await fetch(url, options)
    // console.log(res)
    if (!raw) {
        if (!res.ok) {
            throw new ApiError(url, res.status)
        }
        return await res.json()
    } else {
        return res
    }
}

