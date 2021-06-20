import { serverUrl } from "../../config/config";

const sendRequest = (method, path, body, onDataReceive) => {
  return new Promise((resolve, reject) => {
    fetch(`${serverUrl}${path}`, {
      method: method,
      mode: "cors",
      credentials: "include",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        } else return res.json();
      })
      .then((data) => {
        onDataReceive(data);
        return resolve(data);
      })
      .catch((err) => reject(err));
  });
};

export const get = (path, body = null, callback = data => {}) => sendRequest("GET", path, body, callback);
export const post = (path, body = null, callback = data => {}) => sendRequest("POST", path, body, callback);
