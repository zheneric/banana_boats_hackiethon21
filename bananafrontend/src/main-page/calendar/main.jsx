/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";

// startDate and endDate are 0 indexed for months
const recurrenceAppointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2021, 3, 5, 9, 15),
    endDate: new Date(2021, 3, 5, 11, 30),
    id: 100,
  },
];

const appointmentComponent = (props) => {
  return <Appointments.Appointment {...props} />;
};

export class DragDropCal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: recurrenceAppointments,
      currentDate: new Date("2021-04-05"),
    };

    this.onCommitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState defaultCurrentDate={currentDate} />
          <EditingState onCommitChanges={this.onCommitChanges} />
          <WeekView startDayHour={9} endDayHour={16} />
          <Appointments appointmentComponent={appointmentComponent} />
          <DragDropProvider />
          <CurrentTimeIndicator
            shadePreviousCells={true}
            shadePreviousAppointments={true}
          />
        </Scheduler>
      </Paper>
    );
  }
}
