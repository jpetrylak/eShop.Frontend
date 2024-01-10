import moment from "moment";

export const defaultDateTimeFormat = "yyyy-MM-DD HH:mm";

export const format = (value: any, format: string = defaultDateTimeFormat) => {
  const date: moment.Moment = moment(value);

  return date.isValid() ? date.format(format) : value;
};

export default {
  defaultDateTimeFormat,
  format
};
