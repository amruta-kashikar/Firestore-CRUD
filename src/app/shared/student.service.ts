import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  formData: Student;
  
  constructor( private firestore:AngularFirestore) { }

  getStudents(){
    return this.firestore.collection('students').snapshotChanges();
  }
}
