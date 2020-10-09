import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/student.model';
import { StudentService } from 'src/app/shared/student.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  list: Student[];
  constructor(private service: StudentService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getStudents().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
            ...item.payload.doc.data() as {}
        } as Student;
      })
    });
  }

  onEdit(stud:Student){
    this.service.formData = Object.assign({},stud);
  }

  onDelete(id: string){
    if(confirm("Are you sure you want to delete this record?")){
      this.firestore.doc('students/' +id).delete();
      this.toastr.warning('Deleted Successfully');
    }
  }
}
