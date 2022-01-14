import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { cargarUsuario } from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuarioSuccess, cargarUsuarioError } from '../actions/usuario.actions';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects{

    constructor(
        private actions$:Actions,
        private usuarioService:UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        ()=>this.actions$.pipe(
            ofType( cargarUsuario ), //escuchar la accion
            // tap( data=>console.log("effect Tap",data) ), //ver lo que pasa
            mergeMap( //llamar el srvicio segun una accion
                (action)=>this.usuarioService.getUserById(action.id) //argumento ena action --------------------
                .pipe(
                    // tap(data=>console.log('get uses del effect',data))
                    map( user=>cargarUsuarioSuccess({usuario:user}) ), //llamando la accion de success
                    catchError( err=> of( cargarUsuarioError({payload:err})) ) //captar llos errores y disparar la accion
                    )
             )    // disparar el observable
        )
    );

}