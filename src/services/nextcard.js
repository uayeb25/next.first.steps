export async function GetCard() {

    const response = await fetch(`http://localhost:8000/cards?cache-bust=${new Date().getTime()}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;

}


export async function GetCardItem(id) {

    const response = await fetch(`http://localhost:8000/cards/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok)
        return response;
    else
        return response.json();


};

export async function DeleteCardItem(id) {

    const response = await fetch(`http://localhost:8000/cards/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok)
        return response;
    else
        return response.json();


};


export async function UpdateCardItem(id, title, description) {

    const response = await fetch(`http://localhost:8000/cards/${id}`,{
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok)
        return response;
    else
        return response.json();


};


export async function CreateCardItem(title, description) {

    const response = await fetch(`http://localhost:8000/cards`,{
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
            'Content-Type': 'application/json'
            , 'Cache-Control': 'no-cache'
        }
    });

    if (!response.ok)
        return response;
    else
        return response.json();


};