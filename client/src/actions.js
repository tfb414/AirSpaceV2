export const SETGUESTID = 'SETGUESTID';
export const SETHOSTID = 'SETHOSTID';
export const SETCONNECTION = 'SETCONNECTION';

export function setGuestId(guest_id) {
    return {type: SETGUESTID,
    guest_id}
}

export function setHostId(host_id) {
    return {type: SETHOSTID,
    host_id}
}

export function setConnection(connection) {
    return {type: SETCONNECTION,
    connection}
}

