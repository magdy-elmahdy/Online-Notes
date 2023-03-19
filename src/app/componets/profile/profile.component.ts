import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 
  AllNotes:any;
  token:any;
  decoded:any;
  NoteId:any;
  isLoad:boolean = false;
  isDeleted:boolean=true;
  noNotes=false;

  constructor(private _NotesService:NotesService , private _Router:Router, private _AuthService:AuthService ) {


    try {
      this.token = localStorage.getItem('TOKEN');
      this.decoded =jwt_decode(JSON.stringify(this.token));
    } catch (error) {
      this._Router.navigate(['/signin']);
      localStorage.clear();
    }

  // if(this._AuthService.isLoggedIn()){
  //     this.token = localStorage.getItem('TOKEN');
  //     this.decoded =jwt_decode(JSON.stringify(this.token));
  // }else{
  //     this._Router.navigate(['/signin']);
  //     localStorage.clear();
  // }
  this.displayAllNotes()

   }
   
            // Display Notes

   displayAllNotes(){
    let data ={
      token:this.token,
      userID:this.decoded._id
    }
    this._NotesService.getAllNotes(data).subscribe(res=>{
      console.log(res);
      if(res.message=="success"||res.message=="no notes found"){
        this.isLoad =true;
        this.AllNotes=res.Notes;
      }
    })
   }

                    // Add Notes

   AddNote= new FormGroup({
    title:new FormControl("",Validators.required),
    desc:new FormControl("",Validators.required)
   })


   addData(){

    let data={
      title:this.AddNote.value.title,
      desc:this.AddNote.value.desc,
      token:this.token,
      citizenID:this.decoded._id

    }
    this._NotesService.addNote(data).subscribe(res=>{
      if(res.message=='success'){
          this.isLoad=true;
          $("#AddNote").modal("hide");
          this.displayAllNotes();
          this.AddNote.reset();

      }
      console.log(res);
    }) 
   }

                 //  Delete
  getID(id:any){
    this.NoteId =id;
    console.log(this.NoteId);
  }
  deleteNote(){
    let data ={
      token:this.token,
      NoteID:this.NoteId
    }
    this._NotesService.DeleteNote(data).subscribe(res=>{
      if(res.message =="deleted"){
        this.isDeleted=true;  
        $("#DeleteNote").modal("hide");
        this.displayAllNotes();
      }
      console.log(res);
      
    })
  }

                   /// Edit Note
   editNote= new FormGroup({
      title:new FormControl("",Validators.required),
      desc:new FormControl("",Validators.required)
   })

  setValue(){
    for(let i=0; i<this.AllNotes.length; i++){
      if(this.AllNotes[i]._id ==this.NoteId){
        
        this.editNote.controls.title.setValue(this.AllNotes[i].title);
        this.editNote.controls.desc.setValue(this.AllNotes[i].desc);
      }
    }
  }
  
  EditNote(){
    let data ={
      token:this.token,
      title:this.editNote.value.title,
      desc:this.editNote.value.desc,
      NoteID:this.NoteId
    }
    this._NotesService.updateNote(data).subscribe(res=>{
          if(res.message == "updated"){
            this.isLoad=false;
            $("#EditNote").modal("hide");
            this.displayAllNotes();
            this.editNote.reset();
          }      
    })
  }
      


  ngOnInit(): void {
  }

}
