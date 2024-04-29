import { inject, Injectable } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private fs: Firestore) {}

  getC() {
    let db = this.fs;
    console.log(db);
    let x = collection(this.fs, 'notes/');
    return x;
  }

  add(des: string) {
    let data = { item: des };
    let n = collection(this.fs, 'notes');
    return addDoc(n, data);
  }

  delete(id: string) {
    let docRef = doc(this.fs, 'notes/' + id);

    return deleteDoc(docRef);
  }
}
