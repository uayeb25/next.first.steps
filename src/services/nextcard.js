import settings from "./settings";
import { HTTPError } from "@/utils/HttpError";

export async function GetCard() {

    const response = await fetch(`${ settings.domain }/cards`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
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

export async function GetCardItemFiles(id) {

    const response = await fetch(`${ settings.domain }/cards/${id}/files`,{
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
            , 'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok)
        throw new HTTPError(response);
    else
        return response.json();


};

export async function CardUploadFile( id, files ){

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(`${ settings.domain }/cards/${id}/files`,{
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok)
        throw new HTTPError(response);
    else
        return response.json();

}
