import dayjs from "dayjs";
import 'dayjs/locale/ru'

const DateFormat = ({date, formatier}:{date: string, formatier: string}) => {
    return dayjs(date).locale('ru').format(formatier)
}

export default DateFormat