import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';
import { StudentService } from 'src/app/shared/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private service : StudentService,
    private firestore:AngularFirestore,
    private toastr : ToastrService) { }

  ngOnInit(){
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if(form!=null)
      form.resetForm();
    this.service.formData={
      id: null,
      fullName: '',
      enrollmentNumber: '',
      batch: '',
      mobile: ''
    }
  }

  onSubmit(form: NgForm){
    let data = Object.assign({}, form.value) ;
    delete data.id;
    if(form.value.id == null)
      this.firestore.collection('students').add(data);
    else
      this.firestore.doc('students/'+form.value.id).update(data);
      this.resetForm(form);
    this.toastr.success('Submitted successfully', 'Student Register');
  }

}
