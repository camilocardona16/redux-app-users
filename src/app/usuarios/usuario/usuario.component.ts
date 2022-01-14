import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: []
})
export class UsuarioComponent implements OnInit {

  usuario!:Usuario;
  loading:boolean=false;
  error:any;

  constructor(
    private router:ActivatedRoute,
    private store:Store<AppState>
    ) { }

  ngOnInit(): void {

    this.store.select('usuario').subscribe(({user,loading,error})=>{
      this.loading = loading;
      this.error = error;
      this.usuario =user;
    })

    this.router.params.subscribe(({id})=>{
      this.store.dispatch(cargarUsuario({id:id}))
    })

  }

  

}
