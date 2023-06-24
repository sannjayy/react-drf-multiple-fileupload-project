import { TOKEN_STORE_NAME } from '../config'
import moment from 'moment';
import 'moment-timezone';


export const getTokens = () => {
    const tokens = localStorage.getItem(TOKEN_STORE_NAME);
    if (tokens) {
        const { access, refresh } = JSON.parse(tokens)
        return {
            accessToken: access,
            refreshToken: refresh
        }
    } else {
        return {
            accessToken: '',
            refreshToken: ''
        }
    }

}

export const formatDateTime = (datetime, format = 'YYYY-MM-DD') => {
    if (datetime === 'today') {
        return moment().tz('Asia/Kolkata').format(format)
    } else if (datetime) {
        return moment(datetime).tz('Asia/Kolkata').format(format)
    } else {
        return '-'

    }
}