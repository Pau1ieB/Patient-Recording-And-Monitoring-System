export async function FetchText(a){
    try{
        let response = await fetch(a.location,{method: 'post',body: JSON.stringify(a.params)});
        response = await CheckResponse(response);
        return await response.text();
    }catch(e){return {ok:0,message:e};}
}

export async function FetchJson(a){
    try{
        let response = await fetch(a.location,{method: 'post',body: JSON.stringify(a.params)});
        response = await CheckResponse(response);
        return await response.json();
    }catch(e){return {ok:0,message:e};}
}

async function CheckResponse(response){
    if (response.ok) return response;
    const error = new Error(response.status + ': ' + response.statusText);
    error.response = response;
    throw error;
}