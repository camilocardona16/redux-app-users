import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: [
    
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios!:Usuario[];
  loading:boolean = false;
  error: any;
  subscription = new Subscription()

  constructor(
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.store.select('usuarios').subscribe(({users,loading,error})=>{
        this.loading = loading;
        this.error = error;
        this.usuarios = users;
      })
    )

    this.store.dispatch(cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
