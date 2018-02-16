import moment from "moment";

export const getTimeRemaining = (due) => {

    const d = new Date();
    const time = d.getTime();

    if (due) {

        let timeLeft = due - time

        if (timeLeft > 0) {

            return moment.duration(timeLeft, "milliseconds").humanize() + ' remaining'

        } else {

            return 'Lapsed'
        }

    } else {

        return 'Not set'

    }


}