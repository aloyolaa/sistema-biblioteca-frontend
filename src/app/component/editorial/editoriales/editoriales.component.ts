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
  page = 1;

  constructor(private editorialService: EditorialService) {}

  ngOnInit(): void {
    this.editorialService
      .getAll()
      .subscribe((editoriales) => (this.editoriales = editoriales));
  }

  pagination(): void {
    this.editorialService.pagination(this.page - 1).subscribe((response) => {
      this.editoriales = response.content as Editorial[];
    });
  }
}
