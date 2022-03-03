import React from "react"

export const Greetings = ({date}: {date: Date}) => {
  const time = date.getHours()

  let greeting = "Good Morning"

  if (time >= 12 && time < 18) {
    greeting = "Good Afternoon"
  } else if (time >= 18 && time < 22) {
    greeting = "Good Evening"
  } else if (time >= 22 && time < 23) {
      greeting = "Time to go to bed"
  } else if (time >= 23 && time < 5) {
    greeting = "You should be sleeping"
  }

  return (
    <>
      <h2>{greeting}</h2>
    </>
  )
}