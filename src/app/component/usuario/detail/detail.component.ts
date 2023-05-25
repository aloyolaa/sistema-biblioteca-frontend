import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioDto } from 'src/app/core/dto/usuario.dto';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class UsuarioDetailComponent implements OnInit {
  usuario: UsuarioDto = new UsuarioDto();

  constructor(
    private usuarioService: UsuarioService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.usuarioService.getOne(id).subscribe((usuario) => {
          this.usuario = usuario;
        });
      }
    });
  }
}
