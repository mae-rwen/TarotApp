import React from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface DatePickerProps {
  value: Date;
  onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={value}
      mode="date"
      onChange={onChange}
    />
  );
};

export default DatePicker;
