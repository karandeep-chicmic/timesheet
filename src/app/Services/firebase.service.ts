import { inject, Injectable } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private fs: Firestore) {}

  get() {
    let x = collection(this.fs, 'notes/');
    return x;
  }

  add(des: string) {
    let data = { description: des };
    let n = collection(this.fs, 'notes');
    return addDoc(n, data);
  }

  delete(id: string) {
    let docRef = doc(this.fs, 'notes/' + id);

    return deleteDoc(docRef);
  }
}
