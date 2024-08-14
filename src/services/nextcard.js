import settings from "./settings";
import { HTTPError } from "@/utils/HttpError";

export async function GetCard() {

    const response = await fetch(`${ settings.domain }/cards?cache-bust=${new Date().getTime()}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new HTTPError(response);
    }

    const data = await response.json();
    return data;

}


export async function GetCardItem(id) {

    const response = await fetch(`${ settings.domain }/cards/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok)
        throw new HTTPError(response);
    else
        return response.json();


};

export async function DeleteCardItem(id) {

    const response = await fetch(`${ settings.domain }/cards/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok)
        throw new HTTPError(response);
    else
        return response.json();


};


export async function UpdateCardItem(id, title, description) {

    const response = await fetch(`${ settings.domain }/cards/${id}`,{
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok)
        throw new HTTPError(response);
    else
        return response.json();


};


export async function CreateCardItem(title, description) {

    const response = await fetch(`${ settings.domain }/cards`,{
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok)
        throw new HTTPError(response);
    else
        return response.json();


};