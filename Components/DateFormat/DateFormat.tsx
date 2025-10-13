import dayjs from "dayjs";
import 'dayjs/locale/ru'

const DateFormat = ({date, formatier}:{date: string, formatier: string}) => {
    const value = dayjs(date).locale('ru').format(formatier);
    return value
}

export default DateFormat