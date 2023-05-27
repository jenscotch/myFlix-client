import React from "react";

export function UserInfo ({ name, email, birthday }) {
    return (
        <>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Birthday: {birthday}</p>
        </>
    )
}