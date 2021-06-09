import vars from "../config";
import { memberList } from "./memberlist";

vars.initializeApp();
const firestore = vars.getFirestore();

const members = firestore.collection("members");

export const fillMembers = () => {
  for (const mem of memberList) {
    const docRef = members.doc(mem.email);
    docRef
      .set({
        name: mem.name,
        email: mem.email,
        bitsId: mem.bitsId,
        codechef: mem.codechef,
        codeforces: mem.codeforces,
        atcoder: mem.atcoder,
        hackerearth: mem.hackerearth,
        hackerrank: mem.hackerrank,
      })
      .then(() => {
        console.log(mem.name + " added to database");
      })
      .catch((err) => {
        console.log(`Error occured while adding ${mem.name}: ${err}`);
      });
  }
};

export const getMember = (email, success, error) => {
  members
    .doc(email)
    .get()
    .then(function (doc) {
      if (doc && doc.exists) {
        success(doc.data());
      }
      success("");
    })
    .catch(function (err) {
      error(err);
    });
};
