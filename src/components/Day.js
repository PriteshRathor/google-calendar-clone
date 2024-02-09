import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

const Day = ({
    day,
    rawIndex
}) => {

    const [dayEvents, setDayEvents] = useState([])

    const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } = useContext(GlobalContext)

    useEffect(() => {
        console.log("savedEvents ---",savedEvents);
        const events = savedEvents.filter((event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
        console.log("🚀 ~ useEffect ~ events:", events)
        setDayEvents(events)
    }, [savedEvents, day])

    const getCurrentDayClass = () => {

        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "bg-blue-600 text-white rounded-full w-8" : ""

    }

    return (
        <div className="border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">

                {
                    rawIndex === 0 &&
                    <strong className="text-md mt-1">
                        {day.format("ddd").toUpperCase()}
                    </strong>
                }


                <p
                    className={`text-md p-1 my-1 text-center ${getCurrentDayClass()}`}
                >
                    {day.format("DD")}
                </p>
            </header>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
            >
                {dayEvents.map((evt, idx) => {
                    console.log("🚀 ~ {dayEvents.map ~ evt:", evt)
                    return <div
                        key={idx}
                        onClick={() => setSelectedEvent(evt)}
                        className={`bg-${evt.label} p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`
                        }
                    >
                        {evt.title}
                    </div>
                })}
            </div>
        </div >
    )
}

export default Day