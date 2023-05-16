import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Editorial } from 'src/app/core/model/editorial.model';
import { EditorialService } from 'src/app/service/editorial.service';

@Component({
  selector: 'app-editorial-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class EditorialDetailComponent implements OnInit {
  editorial: Editorial = new Editorial();

  constructor(
    private editorialService: EditorialService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.editorialService.getOne(id).subscribe((editorial) => {
        this.editorial = editorial;
      });
    });
  }
}
