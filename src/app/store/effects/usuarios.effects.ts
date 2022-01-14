import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { cargarUsuarios } from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuariosSuccess, cargarUsuariosError } from '../actions/usuarios.actions';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects{

    constructor(
        private actions$:Actions,
        private usuarioService:UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        ()=>this.actions$.pipe(
            ofType( cargarUsuarios ), //escuchar la accion
            // tap( data=>console.log("effect Tap",data) ), //ver lo que pasa
            mergeMap( //llamar el srvicio segun una accion
                ()=>this.usuarioService.getUsers()
                .pipe(
                    // tap(data=>console.log('get uses del effect',data))
                    map( users=>cargarUsuariosSuccess({usuarios:users}) ), //llamando la accion de success
                    catchError( err=> of( cargarUsuariosError({payload:err})) ) //captar llos errores y disparar la accion
                    )
             )    // disparar el observable
        )
    );

}