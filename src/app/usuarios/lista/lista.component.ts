import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [
    
  ]
})
export class ListaComponent implements OnInit {

  usuarios!:Usuario[];
  loading:boolean = false;
  error:any;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('usuarios').subscribe(({users,loading,error})=>{
      this.loading = loading;
      this.error = error;
      this.usuarios = users;
    })

    this.store.dispatch(cargarUsuarios());
  }

}
