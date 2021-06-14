import vars from "./config";
vars.initializeApp();
const firestore = vars.getFirestore();

const members = firestore.collection("members");

export const getMember = (email) => {
  return new Promise(function (resolve, reject) {
    members
      .doc(email)
      .get()
      .then(function (doc) {
        if (doc && doc.exists) resolve(doc.data());
        else resolve(null);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};
