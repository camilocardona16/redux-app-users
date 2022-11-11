import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http:HttpClient) { }

  getUsers(){
    return this._http.get(environment.url+'/users?per_page=6&dealy=12')
    .pipe(
      map( (resp:any)=> resp.data  )
    );
  }
  getUserById(id:string){
    return this._http.get(environment.url+'/users/'+id)
    .pipe(
      map( (resp:any)=> resp.data  )
    );
  }
}
