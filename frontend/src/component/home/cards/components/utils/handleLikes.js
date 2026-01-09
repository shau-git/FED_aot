import {useState} from "react"

const endPoint = "api/likes/"

const getLikes = async (token) => {
    try {
        //const token = localStorage.getItem('token'); // Retrieve the 1000d token
        
        const response = await fetch(endPoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // The "Bearer " prefix is essential
        }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Failed to fetch');
        }
        return data;
    } catch (error) {
        console.error(error);
    }
};


const addLike = async (character_id, token) => {
    try {
        const response = await fetch(endPoint, {
            method: 'POST', //
            headers: {
                'Content-Type': 'application/json', //
                'Authorization': `Bearer ${token}` //
            },
            // The body must be stringified
            body: JSON.stringify({
                character_id
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // This will catch your custom "BadRequest" errors from the backend
            throw new Error(data.msg || 'Failed to add like');
        }

        return data;
    } catch (error) {
        console.error("Add Like Error:", error);
    }
};


const deleteLike = async (character_id, token) => {
    try {
        const response = await fetch(endPoint, {
            method: 'DELETE', //
            headers: {
                'Content-Type': 'application/json', //
                'Authorization': `Bearer ${token}` //
            },
            // The body must be stringified
            body: JSON.stringify({
                character_id
            })
        });

        const data = await response.json();

        if (!response.ok) {
            // This will catch your custom "BadRequest" errors from the backend
            throw new Error(data.msg || 'Failed to add like');
        }

        return data;
    } catch (error) {
        console.error("Add Like Error:", error);
    }
};

export {
    getLikes,
    addLike,
    deleteLike
}