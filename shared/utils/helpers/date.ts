import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDateOriginal(date: string) {
    if (!date) return undefined;
    const formattedDate = dayjs(date).format('DD/MM/YYYY');
    return formattedDate;
}
export function formatDateBasic(date: Date | string | number) {
    let dateObj = dayjs(date).tz('Asia/Ho_Chi_Minh');
    const formattedDate = dateObj.format('DD [tháng] M, YYYY');
    return `ngày ${formattedDate}`;
}