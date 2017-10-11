export const SETGUESTID = 'SETGUESTID';
export const SETHOSTID = 'SETHOSTID';

export function setGuestId(guest_id) {
    type: SETGUESTID,
    guest_id
}

export function setHostId(host_id) {
    type: SETHOSTID,
    host_id
}

