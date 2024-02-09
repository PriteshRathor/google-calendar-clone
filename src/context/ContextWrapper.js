import React, { useEffect, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

function savedEventsReducer(state, { type, payload }) {
    console.log("🚀 ~ savedEventsReducer ~ { type, payload }:", type, payload )
    switch (type) {
        case "push":
            return [...state, payload]

        case "update":
            return state.map((event) => event.id === payload.id ? payload : event)

        case "delete":
            return state.filter((event) => event.id !== payload.id)

        default:
            throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem("savedEvents")
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
    return parsedEvents
}

const ContextWrapper = ({ children }) => {

    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs())
    const [showEventModal, setShowEventModal] = useState(null)
    const [selectedEvent, setSelectedEvent] = useState(false)
    const [savedEvents, dispatchCalEvents] = useReducer(savedEventsReducer, [], initEvents)

    useEffect(() => {
        if (smallCalendarMonth != null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth])

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents))
    }, [savedEvents])

    return (
        <GlobalContext.Provider value={{
            monthIndex,
            setMonthIndex,
            smallCalendarMonth,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchCalEvents,
            savedEvents,
            selectedEvent,
            setSelectedEvent
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default ContextWrapper