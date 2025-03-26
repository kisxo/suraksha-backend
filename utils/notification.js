export function sendWhatsapp(phone, message){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("token", process.env.ULTRA_MSG_TOKEN);
    urlencoded.append("to", `+91${phone}`);
    urlencoded.append("body", message);
    
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch(`https://api.ultramsg.com/${process.env.ULTRA_MSG_ID}/messages/chat`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}