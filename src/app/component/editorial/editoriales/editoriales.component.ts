import { Component, OnInit } from '@angular/core';
import { Editorial } from 'src/app/core/model/editorial.model';
import { EditorialService } from 'src/app/service/editorial.service';

@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.component.html',
  styleUrls: ['./editoriales.component.css'],
})
export class EditorialesComponent implements OnInit {
  title = 'Editoriales';
  editoriales: Editorial[] = [];

  constructor(private editorialService: EditorialService) {}

  ngOnInit(): void {
    this.editorialService
      .getAll()
      .subscribe((editoriales) => (this.editoriales = editoriales));
  }
}
