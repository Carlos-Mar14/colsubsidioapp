import { db, firebaseApp } from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { fileToBlob } from "./helpers";

const app = firebase.firestore(db, firebaseApp);

export const isUserLogged = () => {
  let isLogged = false;
  firebase.auth().onAuthStateChanged((user) => {
    user !== null && (isLogged = true);
  });
  return isLogged;
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const closeSession = () => {
  return firebase.auth().signOut();
};

export const registerUser = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Este correo ya existe.";
  }
  return result;
};

export const loginWithEmailAndPassword = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Usuario o contraseña no válidos.";
  }
  return result;
};

//Metodo Actualizar foto de perfil
export const uploadImage = async (image, path, name) => {
  const result = { statusResponse: false, error: null, url: null };
  const ref = firebase.storage().ref(path).child(name);
  const blob = await fileToBlob(image);
  try {
    await ref.put(blob);
    const url = await firebase
      .storage()
      .ref(`${path}/${name}`)
      .getDownloadURL();
    result.statusResponse = true;
    result.url = url;
  } catch (error) {
    result.error = error;
  }
  return result;
};

export const updateProfile = async (data) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updateProfile(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const reauthenticate = async (password) => {
  const result = { statusResponse: true, error: null };
  const user = getCurrentUser();
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );

  try {
    await user.reauthenticateWithCredential(credentials);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const updateEmail = async (email) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updateEmail(email);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const updatePassword = async (password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().currentUser.updatePassword(password);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const addDocumentWithoutId = async (collection, data) => {
  const result = { statusResponse: true, error: null };
  try {
    await app.collection(collection).add(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getProjects = async (limitProjects) => {
  const result = {
    statusResponse: true,
    error: null,
    projects: [],
    startProject: null,
  };
  try {
    const response = await app
      .collection("projects")
      .orderBy("name", "desc")
      .limit(limitProjects)
      .get();
    if (response.docs.length > 0) {
      result.startProject = response.docs[response.docs.length - 1];
    }
    response.forEach((doc) => {
      const project = doc.data();
      project.id = doc.id;
      result.projects.push(project);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getMoreProjects = async (limitProjects, startProject) => {
  const result = {
    statusResponse: true,
    error: null,
    projects: [],
    startProject: null,
  };
  try {
    const response = await app
      .collection("projects")
      .orderBy("name", "desc")
      .limit(limitProjects)
      .startAfter(startProject.data().createAt)
      .limit(limitProjects)
      .get();
    if (response.docs.length > 0) {
      result.startProject = response.docs[response.docs.length - 1];
    }
    response.forEach((doc) => {
      const project = doc.data();
      project.celog = doc.celog;
      result.projects.push(project);
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getDocumentById = async (collection, id) => {
  const result = { statusResponse: true, error: null, document: null };
  try {
    const response = await app.collection(collection).doc(id).get();
    result.document = response.data();
    result.document.id = response.id;
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const deleteProjectFromDatabase = async (projectId) => {
  try {
    await app.collection("projects").doc(projectId).delete();
    return { statusResponse: true };
  } catch (error) {
    return { statusResponse: false, error: error };
  }
};

export const addContractingDocument = async (
  projectId,
  documentName,
  startDate,
  endDate
) => {
  const result = { statusResponse: true, error: null };
  try {
    await app
      .collection("projects")
      .doc(projectId)
      .collection("contracting")
      .doc(documentName)
      .set({ startDate, endDate });
    console.log(
      `Documento ${documentName} agregado a la colección 'contracting' para el proyecto con ID ${projectId} con fecha de inicio ${startDate} y fecha de fin ${endDate}`
    );
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const addInfrastructureDocument = async (
  projectId,
  documentName,
  startDate,
  endDate
) => {
  const result = { statusResponse: true, error: null };
  try {
    await app
      .collection("projects")
      .doc(projectId)
      .collection("infrastructure")
      .doc(documentName)
      .set({ startDate, endDate });
    console.log(
      `Documento ${documentName} agregado a la colección 'infrastructure' para el proyecto con ID ${projectId} con fecha de inicio ${startDate} y fecha de fin ${endDate}`
    );
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const addTechnologyDocument = async (
  projectId,
  documentName,
  startDate,
  endDate
) => {
  const result = { statusResponse: true, error: null };
  try {
    await app
      .collection("projects")
      .doc(projectId)
      .collection("technology")
      .doc(documentName)
      .set({ startDate, endDate });
    console.log(
      `Documento ${documentName} agregado a la colección 'technology' para el proyecto con ID ${projectId} con fecha de inicio ${startDate} y fecha de fin ${endDate}`
    );
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const addHumanTalentDocument = async (
  projectId,
  documentName,
  startDate,
  endDate
) => {
  const result = { statusResponse: true, error: null };
  try {
    await app
      .collection("projects")
      .doc(projectId)
      .collection("humanTalent")
      .doc(documentName)
      .set({ startDate, endDate });
    console.log(
      `Documento ${documentName} agregado a la colección 'humanTalent' para el proyecto con ID ${projectId} con fecha de inicio ${startDate} y fecha de fin ${endDate}`
    );
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const addAdministrativeServicesDocument = async (
  projectId,
  documentName,
  startDate,
  endDate
) => {
  const result = { statusResponse: true, error: null };
  try {
    await app
      .collection("projects")
      .doc(projectId)
      .collection("AdministrativeServices")
      .doc(documentName)
      .set({ startDate, endDate });
    console.log(
      `Documento ${documentName} agregado a la colección 'AdministrativeServices' para el proyecto con ID ${projectId} con fecha de inicio ${startDate} y fecha de fin ${endDate}`
    );
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

// const projectsRef = firebase.firestore().collection('projects');

// export const addContractingDocuments = async (id, startDate, endDate) => {
//   console.log('addContractingDocuments called with:...', id, startDate, endDate);

//   // Obtener una lista de todos los IDs de los documentos de proyectos
//   const querySnapshot = await projectsRef.where('name', '==', 'Sf Castilla').get();
// if (!querySnapshot.empty) {
//   const projectDoc = querySnapshot.docs[0];
//   const id = projectDoc.id;
//   console.log('id:', id);
// };

//   // Obtener el documento del proyecto específico
//   const projectDoc = await projectsRef.doc(id).get();
//   if (projectDoc.exists) {
//       console.log('projectDoc exists');
//     // Creando "contracting" para el documento del proyecto específico
//     const contractingRef = projectsRef.doc(id).collection('contracting');
//     // Agregando documentos a la subcolección "contracting"
//     await contractingRef.add({ name: 'Signing of contract', startDate: startDate, endDate: endDate });
//       console.log('documents added to contracting subcollection');
//     await contractingRef.add({ name: 'Minutes of local receipt', startDate: startDate, endDate: endDate });
//       console.log('projectDoc does not exist');
//   }
// }

// export const handleAddContracting = async(id, startDate, endDate) => {
//   const result = { statusResponse: true, error: null }
//   try {
//     await app.collection("documents").doc(id).update({
//       contracting: {
//         startDate: startDate,
//         endDate: endDate
//       }
//     })
//   } catch (error) {
//     result.statusResponse = false
//     result.error = error
//   }
//   return result
// }

// // Actualiza las fechas de inicio y fin en una colección "contracting"
// export async function updateContractingDates(projectId, contractingId, startDate, endDate) {
//   const contractingRef = app
//     .collection('projects')
//     .doc(projectId)
//     .collection('contracting')
//     .doc(contractingId);
//   await contractingRef.update({
//     startDate,
//     endDate,
//   });
// }
